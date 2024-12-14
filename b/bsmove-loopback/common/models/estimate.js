"use strict";
const sendBusinessInquiryMail = require("../../server/tools/mail-sending/send-business-inquiry");
const sendNotificationToAdmin = require("../../server/tools/mail-sending/send-notification-to-admin");

module.exports = function (Estimate) {
  // Endpoint to accept an estimate
  Estimate.accept = function (id, cb) {
    Estimate.findById(id, function (err, instance) {
      if (err) return cb(err);
      instance.updateAttributes({ status: "ACCEPTED" }, cb);
    });
  };

  Estimate.remoteMethod("accept", {
    description: "Accept an estimate",
    accepts: {
      arg: "id",
      type: "string",
      required: true,
      http: { source: "path" },
    },
    http: { path: "/:id/accept", verb: "post" },
    returns: { arg: "estimate", type: "Estimate", root: true },
  });

  // Endpoint to refuse an estimate
  Estimate.refuse = function (id, cb) {
    Estimate.findById(id, function (err, instance) {
      if (err) return cb(err);
      instance.updateAttributes({ status: "REFUSED" }, cb);
    });
  };

  Estimate.remoteMethod("refuse", {
    description: "Refuse an estimate",
    accepts: {
      arg: "id",
      type: "string",
      required: true,
      http: { source: "path" },
    },
    http: { path: "/:id/refuse", verb: "post" },
    returns: { arg: "estimate", type: "Estimate", root: true },
  });

  // New endpoint to create an estimate without authentication
  Estimate.createWithoutAuth = function (userInfo, cb) {
    // Create a new estimate instance with the provided user info
    Estimate.create(userInfo, function (err, instance) {
      if (err) return cb(err);
      sendBusinessInquiryMail(instance); // Send inquiry email
      cb(null, instance);
    });
  };

  Estimate.remoteMethod("createWithoutAuth", {
    description: "Create an estimate without authentication",
    accepts: {
      arg: "userInfo",
      type: "object",
      http: { source: "body" },
      description: "User information for the estimate",
    },
    http: { path: "/no-auth", verb: "post" },
    returns: { arg: "estimate", type: "Estimate", root: true },
  });

  Estimate.observe("after save", async function (ctx, next) {
    try {
      if (ctx.isNewInstance) {
        // New instance, not an update
        // sendNotificationToAdmin({ reason: "DEVIS" });
        console.log(ctx.instance);
        sendBusinessInquiryMail(ctx.instance);
      } else {
        return;
      }
    } catch (err) {
      return Promise.reject(err);
    }
  });
};
