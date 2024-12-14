"use strict";
const sendRentalInquiryMail = require("../../server/tools/mail-sending/send-rental-mail");
const sendNotificationToAdmin = require("../../server/tools/mail-sending/send-notification-to-admin");

module.exports = function (Rental) {
  // Endpoint to accept an Rental
  Rental.accept = function (id, cb) {
    Rental.findById(id, function (err, instance) {
      if (err) return cb(err);
      instance.updateAttributes({ status: "ACCEPTED" }, cb);
    });
  };

  Rental.remoteMethod("accept", {
    description: "Accept an Rental",
    accepts: {
      arg: "id",
      type: "string",
      required: true,
      http: { source: "path" },
    },
    http: { path: "/:id/accept", verb: "post" },
    returns: { arg: "Rental", type: "Rental", root: true },
  });

  // Endpoint to refuse an Rental
  Rental.refuse = function (id, cb) {
    Rental.findById(id, function (err, instance) {
      if (err) return cb(err);
      instance.updateAttributes({ status: "REFUSED" }, cb);
    });
  };

  Rental.remoteMethod("refuse", {
    description: "Refuse an Rental",
    accepts: {
      arg: "id",
      type: "string",
      required: true,
      http: { source: "path" },
    },
    http: { path: "/:id/refuse", verb: "post" },
    returns: { arg: "Rental", type: "Rental", root: true },
  });

  Rental.observe("after save", async function (ctx, next) {
    try {
      if (ctx.isNewInstance) {
        // New instance, not an update
        // sendNotificationToAdmin({ reason: "LOCATION" });
        console.log(ctx.instance);
        sendRentalInquiryMail(ctx.instance);
      } else {
        return;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  });
};
