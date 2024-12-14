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

module.exports = function sendMailNewPassword(user, password) {
  const mailOptions = {
    from: '"BSMOVE" <contact@bsmove.com>', // sender address
    to: user.email, // list of receivers
    //  eslint-disable-next-line max-len
    subject: `BSMOVE : Mot de passe Oublié - ${moment().tz('Europe/Paris').format('DD/MM')}`,
    text: `Vous avez fait une demande pour recevoir un nouveau mot de passe. 
    Si vous n'êtes pas a l'origine de cette demande, une fois connectée, choisissez un mot de passe
    différent de ceux que vous utilisez d'habitude.
    
    Votre nouveau mot de passe est: ${password}
    
    Pour choisir un nouveau mot de passe, connectez-vous sur BSMOVE grace au mot de passe ci-dessus,
    consultez votre profil, et choisissez 'Changer de mot de passe'.
    `,
    html: `<div className='normalText'>Vous avez fait une demande pour recevoir un nouveau mot de passe. <br>
    Si vous n'êtes pas a l'origine de cette demande, une fois connectée, choisissez un mot de passe
    différent de ceux que vous utilisez d'habitude.<br><br><br>
    
    Votre nouveau mot de passe est: <strong>${password}</strong>

    <br>
    Pour choisir un nouveau mot de passe, connectez-vous sur l'Application BSMOVE grace au mot de passe ci-dessus,
    consultez votre profil, et choisissez 'Changer de mot de passe'. <br><br>

    </div>`,
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
