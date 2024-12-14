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

module.exports = function sendRentalInquiryMail(jsonPayload) {
  const {
    customerInfos,
    lift,
    startAddress,
    vehicle,
    movers,
    totalPrice,
    duration,
  } = jsonPayload;

  // Format the departure and arrival dates
  const formattedDepartureDate = moment(jsonPayload.startDate)
    .tz("Europe/Paris")
    .format("D MMMM YYYY");

  const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BSMOVE - Nouvelle demande de contact</title>
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
    <h1>Nouvelle demande de location</h1>
    <h2>Informations Client:</h2>
    <hr>
    <div class="container">
      <div class="info-item">
        <p class="m">Nom :</p>
        <p>${customerInfos.lastName}</p>
      </div>
      <div class="info-item">
        <p class="m">Prénom :</p>
        <p>${customerInfos.firstName}</p>
      </div>
      <div class="info-item">
        <p class="m">Adresse :</p>
        <p>${customerInfos.street}</p>
      </div>
      <div class="info-item">
        <p class="m">Code Postal :</p>
        <p>${customerInfos.zipCode}</p>
      </div>
      <div class="info-item">
        <p class="m">Pays :</p>
        <p>${customerInfos.country}</p>
      </div>
      <div class="info-item">
        <p class="m">Email :</p>
        <p>${customerInfos.email}</p>
      </div>
      <div class="info-item">
        <p class="m">Téléphone :</p>
        <p>${customerInfos.phoneNumber}</p>
      </div>
    </div>
    <hr>
    <h2>Details</h2>
    <div class="container">
      <div class="info-item">
        <p class="m">Adresse de départ :</p>
        <p>${startAddress.placeName}</p>
      </div>
      <div class="info-item">
        <p class="m">Date de départ :</p>
        <p>${formattedDepartureDate}</p>
      </div>
      <div class="info-item">
        <p class="m">Dureée de la manutention :</p>
        <p>${duration} heures</p>
      </div>
      <div class="info-item">
        <p class="m">Nombre de déménageurs :</p>
        <p>${movers.nbMovingMen}</p>
      </div>
    </div>
    ${
      lift.items.length > 0
        ? `
          <div class="container">
            <div class="info-item">
              <p class="m">Véhicule :</p>
              <p>${lift.items[0].name}</p>
            </div>
            <div class="info-item">
              <p class="m">Etage :</p>
              <p>${lift.floors}</p>
            </div>
          </div>`
        : ""
    }
    ${
      vehicle.items.length > 0
        ? `
                <div class="info-item">
                  <p class="m">Adresse d'arrivée :</p>
                  <p>${vehicle.endAddress.placeName} Km</p>
                </div>
                <div class="info-item">
                  <p class="m">Kilométrage :</p>
                  <p>${vehicle.km} Km</p>
                </div>
                ${vehicle.items
                  .map(
                    (item) => `
                            <div>
                              <p>${item.name}<br>X ${item.quantity}</p>
                            </div>
                            `
                  )
                  .join("")}
                <div class="info-item">
                  <p class="m">Kilométrage :</p>
                  <p>${vehicle.km} Km</p>
                </div>
                <div class="info-item">
                  <p class="m">Nombre de déménageurs (chauffeurs + déménageurs supplémentaires):</p>
                  <p>${movers.nbMovingMen}</p>
                </div>
                `
        : ""
    }
    <h2>Total : ${totalPrice} €</h2>
    <!-- Add more information here as needed -->
  </body>
  </html>
`;

  const mailOptions = {
    from: '"BSMOVE" <contact@bsmove.com>', // sender address
    to: "contact@bsmove.com",
    // list of receivers
    subject: `BSMOVE - Nouvelle demande de contact - ${moment()
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
