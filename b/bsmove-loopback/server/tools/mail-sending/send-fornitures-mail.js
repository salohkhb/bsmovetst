"use strict";
const moment = require("moment-timezone");
// Load the French locale
require("moment/locale/fr");
const nodemailer = require("nodemailer");

const baseApiUrl = "https://bsmove.herokuapp.com/api"; // TODO: Replace

const transporter = nodemailer.createTransport({
  type: "SMTP",
  host: "smtp.ionos.fr",
  secure: true,
  port: 465,
  auth: {
    user: "contact@bsmove.com",
    pass: "Jannah77100!", // Be cautious with credentials in code!
  },
});

module.exports = function sendFornituresInquiryMail(jsonPayload) {
  const { deliveryAddress, facturationAddress, items, total } = jsonPayload;

  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BSMOVE - Nouvelle demande d'achat matériel</title>
    <style>
      .container {
        width: 70%;
      }
      .m {
        margin-right: 30px;
        font-weight: bold;
      }
      .info-item {
        display: flex;
        justify-content: space-between;
      }
    </style>
  </head>
  <body>
    <h1>Nouvelle demande d'achat matériel</h1>
    <h2>Informations Client:</h2>
    <hr>
    <div class="container">
      <div class="info-item">
        <p class="m">Nom :</p>
        <p>${deliveryAddress.lastName}</p>
      </div>
      <div class="info-item">
        <p class="m">Prénom :</p>
        <p>${deliveryAddress.firstName}</p>
      </div>
      <div class="info-item">
        <p class="m">Adresse :</p>
        <p>${deliveryAddress.street}</p>
      </div>
      <div class="info-item">
        <p class="m">Code Postal :</p>
        <p>${deliveryAddress.zipCode}</p>
      </div>
      <div class="info-item">
        <p class="m">Pays :</p>
        <p>${deliveryAddress.country}</p>
      </div>
      <div class="info-item">
        <p class="m">adresse de livraison :</p>
        <p>${facturationAddress.firstName} ${facturationAddress.lastName}, ${
    facturationAddress.street
  }, ${facturationAddress.zipCode} ${facturationAddress.country}</p>
      </div>
    </div>
    <hr>
    <hr>
    <h2>Tout les fournitures :</h2>
    
      ${items
        .map(
          (item) => `
      <div class="container">
        <div className="info-item">
          <p class="m">${item.name}</p>
        </div>
        <div className="info-item">
          <p>X${item.quantity}</p>
        </div>
        <div className="info-item">
          <p class="m">Prix: €${item.price}</p>
        </div>
        <hr>
      </div>
        `
        )
        .join("")}
    
    <hr>
    <div class="container">
      <div class="info-item">
        <p class="m">Total :</p>
        <p>€${total}</p>
      </div>
    </div>
  </body>
  </html>
`;

  const mailOptions = {
    from: '"BSMOVE" <contact@bsmove.com>', // sender address
    to: "contact@bsmove.com",
     // list of receivers
    subject: `BSMOVE - Nouvelle demande d'achat matériel - ${moment()
      .tz("Europe/Paris")
      .format("DD/MM")}`,
    html: htmlTemplate,
    text: "sdtgyviuadf",
    list: {
      unsubscribe: {
        url: baseApiUrl,
        comment: "Désabonnez-vous de notre mailing.",
      },
    },
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else {
      console.log(info);
    }
  });
};
