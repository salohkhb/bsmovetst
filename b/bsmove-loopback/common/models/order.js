"use strict";

const _ = require("lodash");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const orderid = require("order-id")("bsmove");
const totalProductSum = require("../../server/tools/misc/product-total");
const generateError = require("../../server/tools/error handling/create-error");
const getStripeCustomerById = require("../../server/tools/stripe/get-customer-by-id.js");
const sendFornituresInquiryMail = require("../../server/tools/mail-sending/send-fornitures-mail.js");

module.exports = function (Order) {
  Order.remoteMethod("webhook", {
    http: {
      path: "/webhook",
      verb: "post",
    },
    accepts: [
      // TODO: Put models instead of 'type: object', to do type checking well.
      { arg: "req", type: "object", http: { source: "req" } },
      { arg: "data", type: "object", http: { source: "body" } },
    ],
    returns: [{ type: "object", root: true }],
  });

  Order.webhook = async function Stripeintentwebhook(req, data, cb) {
    try {
      if (data && data.object && data.object.object === "payment_intent") {
        const updatedPaymentIntent = data.object;
        const instance = await Order.findOne({
          where: { paymentIntentId: updatedPaymentIntent.id },
        });
        switch (data.type) {
          case "payment_intent.succeeded":
            await instance.updateAttributes({
              paymentIntent: updatedPaymentIntent,
            });
            // function to prevent owner that a new order has been made.
            break;
          case "payment_intent.payment_failed":
            // TODO : create error handling/ticket there and check differences
            // between payment_failed and canceled.
            break;
          default:
            break;
        }
        return;
      } else {
        return;
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  Order.observe("before save", async function (ctx, next) {
    // Check total here.
    try {
      if (ctx.isNewInstance) {
        // If it's a new order
        if (
          ctx.instance.items &&
          ctx.instance.items.length > 0 &&
          ctx.instance.paymentMethodId
        ) {
          // check if order contains items
          ctx.instance.uniqueId = orderid.generate(); // generate uniqueId for the Order
          let clonedItems = JSON.parse(JSON.stringify(ctx.instance.items));
          const productIds = await _.map(clonedItems, "id"); // extract productIds from items
          ctx.instance.productIds = productIds; // assign productIds as referencesMany relation
          const productsList = await ctx.instance.product.find(); // retrieve product data from db
          const mergedList = await _.map(clonedItems, function (item) {
            console.log("inside before save 4");
            return _.extend(item, _.find(productsList, { id: item.id }));
          });
          ctx.instance.summedTotal = await totalProductSum(mergedList); // sum db product total price * quantity
          const stripeAccount = await getStripeCustomerById(
            ctx.instance.customerId
          );
          const response = await stripe.paymentIntents.create({
            amount: ctx.instance.summedTotal * 100,
            currency: "eur",
            customer: stripeAccount.client.id,
            payment_method: ctx.instance.paymentMethodId,
            metadata: {
              uniqueId: ctx.instance.uniqueId,
              customerId: ctx.instance.customerId.toString(),
            },
            confirm: true, // finalize the payment on creation since we have paymentMethodId
            ...(ctx.instance.savePaymentMethod && {
              setup_future_usage: "off_session",
            }),
          });
          ctx.instance.paymentIntent = response;
          ctx.instance.paymentIntentId = response.id;
          if (response && response.status == "succeeded") {
            ctx.instance.status = "PAID";
            sendFornituresInquiryMail(ctx.instance);
          }
          ctx.instance.total = ctx.instance.summedTotal;
          return;
        } else {
          throw generateError(
            500,
            "NO_ITEMS_ORDER",
            "Order has no items in it or empty array.",
            "Order before save"
          );
        }
      } else {
        // Not a new order so handle UPDATES and UPSERT here.
        if (ctx.data) {
          // data has been sent for an update.
          if (ctx.data.paymentIntent) {
            if (ctx.data.paymentIntent.status === "succeeded") {
              ctx.data.status = "PAID"; // TODO: Notify the owner that an Order has been made.
              if (
                ctx.instance.paymentIntent &&
                ctx.instance.savePaymentMethod
              ) {
                const stripeAccount = await getStripeCustomerById(customerId);
                if (stripeAccount && !stripeAccount.paymentMethods)
                  await stripeAccount.updateAttributes({
                    paymentMethods: ctx.instance.paymentIntent.payment_method,
                  });
                return;
              } else {
                return;
              }
            } else {
              ctx.instance.status = "ERROR";
              return;
            }
          } else {
            return;
          }
        } else {
          return;
        }
      }
    } catch (err) {
      return Promise.reject(err);
    }
  });
};
