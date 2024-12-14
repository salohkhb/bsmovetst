"use strict";

const path = require("path");
const passwGen = require("password-generator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const sendPasswordByMail = require("../../server/tools/mail-sending/send-new-password.js");
const createStripeCustomer = require("../../server/tools/stripe/create-customer.js");
const generateError = require("../../server/tools/error handling/create-error");
const getStripeCustomerById = require("../../server/tools/stripe/get-customer-by-id.js");
const createSetupIntent = require("../../server/tools/stripe/create-setup-intent.js");
const sendContactForm = require("../../server/tools/mail-sending/send-contact-form.js");

module.exports = function (Customer) {
  Customer.remoteMethod("generatenewpassword", {
    http: {
      path: "/generateNewPassword",
      verb: "post",
    },
    accepts: [
      // TODO: Put models instead of 'type: object', to do type checking well.
      { arg: "req", type: "object", http: { source: "req" } },
      { arg: "email", type: "string", required: true },
    ],
    returns: [{ type: "object", root: true }],
  });

  Customer.generatenewpassword = function CustomergenerateNewPassword(
    req,
    email,
    cb
  ) {
    if (email) {
      Customer.findOne({ where: { email: email } }, function (err, instance) {
        if (err) {
          console.log("Error in GenerateNewPassword.");
          cb(err, null);
        }
        if (instance) {
          // Generate a new password using password-generator package.
          const temporaryPassword = passwGen(25, true, null, "BSMOVE-");
          instance.updateAttributes(
            { password: temporaryPassword, passwordReset: true },
            function (err, result) {
              if (err) {
                console.log(err);
                cb(err, null);
              } else {
                sendPasswordByMail(instance, temporaryPassword);
                cb(null, result);
              }
            }
          );
        } else {
          var error = generateError(
            404,
            "USER_NOT_FOUND",
            "L'utilisateur n'est pas enregistré.",
            "generateNewPassword"
          );
          cb(error, null);
        }
      });
    }
  };

  Customer.remoteMethod("setupintent", {
    http: {
      path: "/:customerId/setupIntent",
      verb: "get",
    },
    accepts: [
      // TODO: Put models instead of 'type: object', to do type checking well.
      { arg: "req", type: "object", http: { source: "req" } },
      { arg: "customerId", type: "string", required: true },
    ],
    returns: [{ type: "object", root: true }],
  });

  Customer.setupintent = async function Customersetupintent(
    req,
    customerId,
    cb
  ) {
    try {
      if (customerId) {
        const stripeCustomer = await getStripeCustomerById(customerId);
        const newSetupIntent = await createSetupIntent(
          stripeCustomer.client.id
        );
        return newSetupIntent;
      } else {
        return;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  Customer.remoteMethod("removecard", {
    http: {
      path: "/:customerId/StripeAccount/removeCard",
      verb: "post",
    },
    accepts: [
      // TODO: Put models instead of 'type: object', to do type checking well.
      { arg: "req", type: "object", http: { source: "req" } },
      { arg: "customerId", type: "string", required: true },
      { arg: "paymentMethodId", type: "string", required: true },
    ],
    returns: [{ type: "object", root: true }],
  });

  Customer.removecard = async function Customerremovecard(
    req,
    customerId,
    paymentMethodId,
    cb
  ) {
    try {
      if (customerId && customerId == req.currentUserId) {
        const instance = await Customer.findById(customerId); // get concerned customer intern representation.
        const account = await instance.StripeAccount.get();
        if (
          account &&
          account.paymentMethods &&
          account.paymentMethods.length > 0
        ) {
          const response = await stripe.paymentMethods.detach(
            // dettach paymentMethod from stripe api.
            paymentMethodId
          );
          if (response && !response.customer) {
            // if dettach has been successfull, refresh customer and delete local paymentMethod.
            const refreshedCustomer = await stripe.customers.retrieve(
              account.client.id
            );
            const updated = await account.updateAttributes({
              paymentMethods: null,
              client: refreshedCustomer,
            });
            return updated;
          } else {
            throw generateError(
              500,
              "PAYMENT_METHOD_STRIPE_REMOVE",
              "Echec de la supression de la méthode de paiement.",
              "removeCard"
            );
          }
        } else {
          throw generateError(
            500,
            "NO_PAYMENT_METHOD",
            "Le client n'a pas de methode de paiement enregistré.",
            "removeCard"
          );
        }
      } else {
        return;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  Customer.remoteMethod("contact", {
    http: {
      path: "/contact-form",
      verb: "post",
    },
    accepts: [
      // TODO: Put models instead of 'type: object', to do type checking well.
      { arg: "req", type: "object", http: { source: "req" } },
    ],
    returns: [{ type: "object", root: true }],
  });

  Customer.contact = async function Customercontact(req, cb) {
    if (req.body) {
      sendContactForm(req.body);
      return;
    }
  };

  // Before save hook to check back passwordReset boolean on password change.
  Customer.observe("before save", function (ctx, next) {
    if (
      !ctx.isNewInstance &&
      ctx.data &&
      ctx.data.password &&
      ctx.currentInstance.passwordReset
    ) {
      ctx.currentInstance.updateAttribute(
        "passwordReset",
        false,
        function (err, updatedInstance) {
          if (err) next(err);
          console.log(updatedInstance);
          next();
        }
      );
    } else {
      next();
    }
  });

  // Before save hook to check back passwordReset boolean on password change.
  Customer.observe("after save", async function (ctx, next) {
    try {
      // WARNING: Need a check that user does not have a stripe account already.
      if (!ctx.isNewInstance) {
        // User has just verified his mail address, so we create his Stripe Account.
        const currentStripeAccount = await ctx.instance.StripeAccount.get();
        if (
          ctx.instance &&
          ctx.instance.emailVerified &&
          !ctx.instance.verificationToken &&
          !currentStripeAccount
        ) {
          try {
            const stripeCustomer = await createStripeCustomer(ctx.instance); // create the customer on Stripe
            await ctx.instance.StripeAccount.create({ client: stripeCustomer }); // create the relation with the stripeAccount
            return;
          } catch (err) {
            console.log(err);
            return Promise.reject(err);
          }
        }
      } else {
        return;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  });

  //send verification email after registration
  Customer.afterRemote("create", function (context, userInstance, next) {
    console.log("> user.afterRemote triggered");

    var isProduction = process.env.NODE_ENV === "production";
    var host = isProduction ? "bsmove-loopback.herokuapp.com" : "localhost";
    var protocol = isProduction ? "https" : "http";
    var port = isProduction ? undefined : 3000;

    // Construct the URL for production
    var verifyLink =
      "https://bsmove-loopback.herokuapp.com" +
      "/api/Customers/confirm" +
      "?uid=" +
      userInstance.id +
      "&redirect=%2Fverified";

    var verifyOptions = {
      type: "email",
      to: userInstance.email,
      from: "noreply@bsmove.com",
      subject: "Merci pour votre inscription !.",
      template: path.resolve(__dirname, "../../server/views/verify.ejs"),
      redirect: "/verified",
      user: userInstance,
      verifyHref: verifyLink,
    };

    userInstance.verify(verifyOptions, function (err, response) {
      console.log("> verification email sent:", response);
      if (err) {
        return next(err);
      } else {
        console.log("> verification everything ok");
        next();
      }
    });
  });
};
