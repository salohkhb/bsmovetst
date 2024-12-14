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

module.exports = function sendBusinessInquiryMail(jsonPayload) {
  const {
    prename,
    name,
    email,
    phone,
    address,
    distance,
    endInformations,
    heavyObjects,
    startInformations,
    needHelpInformations,
    time,
    totalPrice,
    volume,
  } = jsonPayload;

  // Mapping for elevator values
  const elevatorMappings = {
    one_to_two: "1 à 2 personnes",
    three_to_four: "3 à 4 personnes",
    five_to_six: "5 à 6 personnes",
    more: "6 et plus",
    no: "Non",
  };

  // Mapping for furnituresLift values
  const furnituresLiftMappings = {
    true: "Oui",
    false: "Non",
  };

  // Mapping for footDistance values
  const footDistanceMappings = {
    "11_20": "Jusqu'à 20 mètres",
    "21_30": "Entre 21 et 30 mètres",
    "31_40": "Entre 31 et 40 mètres",
    "41_50": "Entre 41 et 50 mètres",
    more: "Plus de 50 mètres",
  };

  // Mapping for parkingPermit values
  const parkingPermitMappings = {
    true: "Oui",
    false: "Non",
  };

  // Define the mapping of piano types
  const pianoTypeMapping = {
    straight_piano: "Piano droit",
    one_quarter_piano: "Piano 1/4",
    one_half_piano: "Piano 1/2",
    three_third_piano: "Piano 1/3",
  };

  // Define the mapping of fridge types
  const fridgeTypeMapping = {
    american_fridge: "Frigo américain",
  };

  // Define the mapping of safe types
  const safeTypeMapping = {
    safe: "Coffre fort",
  };

  // Define the mapping of poolTable types
  const poolTableTypeMapping = {
    pool_table: "Billard",
  };

  // Define the mapping of poolTable types
  const mountingTypeMapping = {
    disassemblingMounting: "Démontage / Remontage",
    disassembling: "Démontage",
    mounting: "Remontage",
  };

  // Format the departure and arrival dates
  const formattedDepartureDate = moment(jsonPayload.time.departureStartDate)
    .tz("Europe/Paris")
    .format("D MMMM YYYY");
  const formattedArrivalDate = moment(jsonPayload.time.departureEndDate)
    .tz("Europe/Paris")
    .format("D MMMM YYYY");

  // Get the mapped values
  const formattedElevatorStart =
    elevatorMappings[jsonPayload.startInformations.elevator];
  const formattedElevatorEnd =
    elevatorMappings[jsonPayload.endInformations.elevator];

  const formattedFurnituresLiftStart =
    furnituresLiftMappings[jsonPayload.startInformations.furnituresLift];
  const formattedFurnituresLiftEnd =
    furnituresLiftMappings[jsonPayload.endInformations.furnituresLift];

  const formattedFootDistanceStart =
    footDistanceMappings[jsonPayload.startInformations.footDistance];
  const formattedFootDistanceEnd =
    footDistanceMappings[jsonPayload.endInformations.footDistance];

  const formattedParkingPermitStart =
    parkingPermitMappings[jsonPayload.startInformations.parkingPermit];

  const formattedParkingPermitEnd =
    parkingPermitMappings[jsonPayload.endInformations.parkingPermit];

  const displayPianoType =
    pianoTypeMapping[jsonPayload.heavyObjects.items.piano.type] || "Inconnu";

  const displayFridgeType =
    fridgeTypeMapping[jsonPayload.heavyObjects.items.fridge.type] || "Inconnu";

  const displaySafeType =
    safeTypeMapping[jsonPayload.heavyObjects.items.safe.type] || "Inconnu";

  const displayPoolTableType =
    poolTableTypeMapping[jsonPayload.heavyObjects.items.poolTable.type] ||
    "Inconnu";

  const formattedMountingType =
    mountingTypeMapping[jsonPayload.needHelpInformations.mountingType];

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
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
      <h2>Informations client:</h2>
      <div>
        <div class="container">
          <div class="info-item">
            <p class="m">Prénom: </p>
            <p>${prename}</p>
          </div>
          <div class="info-item">
            <p class="m">Nom: </p>
            <p>${name}</p>
          </div>
          <div class="info-item">
            <p class="m">Email: </p>
            <p>${email}</p>
          </div>
          <div class="info-item">
            <p class="m">téléphone: </p>
            <p>${phone}</p>
          </div>
          <div class="info-item">
            <p class="m">Adress: </p>
            <p>${address}</p>
          </div>
      </div>
      <hr>        
      <h2>Départ</h2>
      <div>
        <div class="container">
          <div class="info-item">
            <p class="m">Date de départ: </p>
            <p>${formattedDepartureDate}</p>
          </div>
          ${
            time.departureEndDate
              ? `
            <div class="info-item">
              <p class="m">Date d'arrivée: </p>
              <p>${formattedArrivalDate}</p>
            </div>`
              : ""
          }
          <div class="info-item">
            <p class="m">Adresse de départ: </p>
            <p>${startInformations.address.placeName}</p>
          </div>
          <div class="info-item">
            <p class="m">Étages au départ: </p>
            <p>${startInformations.floor}</p>
          </div>
          <div class="info-item">
            <p class="m">Ascenseur au départ: </p>
            <p>${formattedElevatorStart}</p>
          </div>
          <div class="info-item">
            <p class="m">Monte-meuble au départ: </p>
            <p>${formattedFurnituresLiftStart}</p>
          </div>
          <div class="info-item">
            <p class="m">Distance à pied au départ: </p>
            <p>${formattedFootDistanceStart}</p>
          </div>
          <div class="info-item">
            <p class="m">Autorisation de stationnement au départ: </p>
            <p>${formattedParkingPermitStart}</p>
          </div>
        </div>
      </div>
      <h2>Arrivée</h2>
      <div>
        <div class="container">
          <div class="info-item">
            <p class="m">Adresse d'arrivée: </p>
            <p>${endInformations.address.placeName}</p>
          </div>
          <div class="info-item">
            <p class="m">Étages à l'arrivée: </p>
            <p>${endInformations.floor}</p>
          </div>
          <div class="info-item">
            <p class="m">Ascenseur à l'arrivée: </p>
            <p>${formattedElevatorEnd}</p>
          </div>
          <div class="info-item">
            <p class="m">Monte meuble à l'arrivée: </p>
            <p>${formattedFurnituresLiftEnd}</p>
          </div>
          <div class="info-item">
            <p class="m">Distance à pied à l'arrivée: </p>
            <p>${formattedFootDistanceEnd}</p>
          </div>
          <div class="info-item">
            <p class="m">Autorisation de stationnement à l'arrivée: </p>
            <p>${formattedParkingPermitEnd}</p>
          </div>
          <div class="info-item">
            <p class="m">Distance: </p>
            <p>${distance.toFixed(2)} Km</p>
          </div>
        </div>
      </div>
      <hr>
      ${
        volume.rooms
          ? volume.rooms
              .map(
                (room) => `
                <h2>Inventaire</h2>
        <li>
          <div class="info-item">
            <p class="m">pièce :</p>
            <p>${room.name}</p>
          </div>
          <div class="info-item">
            <p class="m">quantité :</p>
            <p>${room.quantity}</p>
          </div>
          <ul>
            ${room.items
              .map(
                (item) => `
              <li>
                <div class="info-item">
                  <p class="m">nom :</p>
                  <p>${item.name}</p>
                </div>
                <div class="info-item">
                  <p class="m">Volume :</p>
                  <p>${item.size} m3</p>
                </div>
              </li>
            `
              )
              .join("")}
          </ul>
        </li>
      `
              )
              .join("")
          : ""
      }
      <hr>
      <h2>Volumes</h2>
      <hr>
      <div class="container">
        <div class="info-item">
          <p class="m">Volume Total :</p>
          <p>${volume.volume.toFixed(2)} m3</p>
        </div>
      </div>
      
      ${
        heavyObjects.hasHeavyObjects !== false
          ? `
            <h2>Objets lourds</h2>
            <div class="container">
            ${
              heavyObjects.items.piano.present !== false
                ? `<div class="info-item">
                    <p class="m">Type de piano :</p>
                    <p>${displayPianoType}</p>
                  </div>
                  <div class="info-item">
                    <p class="m">Etages :</p>
                    <p>${heavyObjects.items.piano.floors}</p>
                  </div>`
                : ""
            }
            ${
              heavyObjects.items.fridge.present !== false
                ? `<div class="info-item">
                    <p class="m">Type de frigo :</p>
                    <p>${displayFridgeType}</p>
                  </div>
                  <div class="info-item">
                    <p class="m">Etages :</p>
                    <p>${heavyObjects.items.fridge.floors}</p>
                  </div>`
                : ""
            }
            ${
              heavyObjects.items.safe.present !== false
                ? `<div class="info-item">
                    <p class="m">Type de coffre fort :</p>
                    <p>${displaySafeType}</p>
                  </div>
                  <div class="info-item">
                    <p class="m">Etages :</p>
                    <p>${heavyObjects.items.safe.floors}</p>
                  </div>`
                : ""
            }
            ${
              heavyObjects.items.poolTable.present !== false
                ? `<div class="info-item">
                    <p class="m">Type de billard :</p>
                    <p>${displayPoolTableType}</p>
                  </div>
                  <div class="info-item">
                    <p class="m">Etages :</p>
                    <p>${heavyObjects.items.poolTable.floors}</p>
                  </div>`
                : ""
            }
            ${
              heavyObjects.items.other.present !== false
                ? `<div class="info-item">
                    <p class="m">Autres :</p>
                    <p>${heavyObjects.items.other.type}</p>
                  </div>
                  <div class="info-item">
                    <p class="m">Etages :</p>
                    <p>${heavyObjects.items.other.floors}</p>
                  </div>`
                : ""
            }
            </div>`
          : ""
      }
      <hr>
      ${
        needHelpInformations.mountingType !== "no"
          ? `<h2>${formattedMountingType}</h2>
            <div class="container">
              <div class="info-item">
                <p class="m">Simples :</p>
                <p>${needHelpInformations.items.simple.count}</p>
              </div>
              <div class="info-item">
                <p class="m">Moyens :</p>
                <p>${needHelpInformations.items.medium.count}</p>
              </div>
              <div class="info-item">
                <p class="m">Difficiles :</p>
                <p>${needHelpInformations.items.hard.count}</p>
              </div>
            </div>`
          : ""
      }
      <hr>
      ${
        needHelpInformations.extraFurnitures.needed !== false
          ? `<h2>Furnitures supplémentaires</h2>
            <h3>Non-Fragile :</h3>
            <h4>Besoin d'Emballer: ${needHelpInformations.extraFurnitures.standard.isHelpNeededToWrap ? 'Oui' : 'Non'}</h4>
            <div>
              ${needHelpInformations.extraFurnitures.standard.items
                .map(
                  (item) => `
                            <div>
                              <p>${item.name}<br>X ${item.count}</p>
                            </div>
                            `
                )
                .join("")}
            </div>
            <h3>Fragile</h3>
            <h4>Besoin d'Emballer: ${needHelpInformations.extraFurnitures.fragile.isHelpNeededToWrap ? 'Oui' : 'Non'}</h4>
            <div>
              ${needHelpInformations.extraFurnitures.fragile.items
                .map(
                  (item) => `
                            <div>
                              <p>${item.name}<br>X ${item.count}</p>
                            </div>
                            `
                )
                .join("")}
            </div>
            <h3>Autres</h3>
            <h4>Besoin d'Emballer: ${needHelpInformations.extraFurnitures.others.isHelpNeededToWrap ? 'Oui' : 'Non'}</h4>
            <div>
              ${needHelpInformations.extraFurnitures.others.items
                .map(
                  (item) => `
                            <div>
                              <p>${item.name}<br>X ${item.count}</p>
                            </div>
                            `
                )
                .join("")}
            </div>`
          : ""
      }
      <hr>
      <div>
        <h2>Total : ${totalPrice.toFixed(2)}€</h2>
      </div>
      <!-- Add more dynamic content here -->
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
