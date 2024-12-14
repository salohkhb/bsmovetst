"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const generateError = require("../../server/tools/error handling/create-error");

module.exports = function (Stripeaccount) {
  Stripeaccount.observe("before save", async function (ctx, next) {
    if (!ctx.isNewInstance) {
      if (ctx.data && ctx.data.paymentMethods) {
        // is an attempt to add a paymentMethod
        if (!ctx.currentInstance.paymentMethods) {
          // a payment method don't exist already.
          try {
            // Store updated paymentMethods in DB to permit front end to display them.
            const stripePaymentMethods = await stripe.paymentMethods.list({
              customer: ctx.currentInstance.client.id,
              type: "card",
            });

            if (stripePaymentMethods && stripePaymentMethods.data.length > 0) {
              ctx.data.paymentMethods = stripePaymentMethods.data;
            } else {
              ctx.data.paymentMethods = null;
            }

            return;
          } catch (err) {
            console.error("Stripe retrieve customer error", err);
            return Promise.reject(error);
          }
        } else {
          var error = generateError(
            500,
            "PAYMENT_METHOD_ALREADY_EXIST",
            "Une methode de paiement existe deja pour ce client.",
            "stripeAccountBeforeSave"
          );
          console.error(
            "Paymentmethod already exists in stripeAccount before save."
          );
          return Promise.reject(error);
        }
      } else {
        return;
      }
    } else {
      return;
    }
  });
};
