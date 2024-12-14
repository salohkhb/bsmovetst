'use strict';
const moment = require('moment-timezone');
const nodemailer = require('nodemailer');


const baseApiUrl = "https://bsmove.herokuapp.com/api"; // TODO: Replace 


// Add mail addresses here to get notified when
// a new user has registered.

// Nodemailer transporter, reusable, do not
// consume itself when transporter.sendMail()
// is called.

const transporter = nodemailer.createTransport({
  type: "SMTP",
  host: "smtp.ionos.fr",
  secure: true,
  port: 465,
  auth: {
    user: "contact@bsmove.com",
    pass: "Jannah77100!"
  }});

module.exports = function sendContactForm(contactFormPayload) {
  const mailOptions = {
    from: '"BSMOVE" <contact@bsmove.com>', // sender address
    to: 'contact@bsmove.com', // list of receivers
    
    //  eslint-disable-next-line max-len
    subject: `BSMOVE - Nouvelle demande de contact - ${moment().tz('Europe/Paris').format('DD/MM')}`,
    text: `
      Nom: ${contactFormPayload.name}
      ------------------------------------
      Email: ${contactFormPayload.email}
      ------------------------------------
      Objet: ${contactFormPayload.subject}
      ------------------------------------
      Message: ${contactFormPayload.message}
    `,
    list: {
      unsubscribe: {
        url: baseApiUrl,
        comment: 'Désabonnez-vous de notre mailing.'
      }
    }
  };


  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      console.log(err);
    else
      console.log(info);
  });

};
