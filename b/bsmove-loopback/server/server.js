"use strict";

var bodyParser = require("body-parser");
const loopback = require("loopback");
const boot = require("loopback-boot");
const dotenv = require("dotenv");
const path = require("path");

console.log("Server launch in:", process.env.NODE_ENV, "mode");

dotenv.config();

const app = (module.exports = loopback());

// configure view handhler
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("port", process.env.PORT || 3000);

// bodyParser params are handled in middleware.json by Loopback.
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(loopback.token());
app.use(function (req, res, next) {
  app.currentUserId = null;
  if (!req.accessToken) {
    return next();
  } else {
    req.currentUserId = req.accessToken.userId;
    next();
  }
});

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit("started");
    const baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Web server listening at: %s", baseUrl);
    if (app.get("loopback-component-explorer")) {
      const explorerPath = app.get("loopback-component-explorer").mountPath;
      console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
