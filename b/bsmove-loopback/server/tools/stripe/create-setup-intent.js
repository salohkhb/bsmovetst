'use-strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const generateError = require('../error handling/create-error');


const strErrorStripe = 'Erreur lors de la creation du setup Intent.';


// Create stripe setup intent with given stripeCustomerId and return it through a Promise.

module.exports = function createSetupIntent(stripeCustomerId) {
  return new Promise ( async function(resolve, reject) {
      try {
        if (stripeCustomerId) {
            const newSetupIntent = await stripe.setupIntents.create({
                customer: stripeCustomerId,
                usage: "off_session"
            });
            resolve(newSetupIntent);
        } else {
            generateError(500,
            'SETUP_INTENT_CREATION_FAILED',
            strErrorStripe,
            'createSetupIntent');
        }
    }
    catch (e){
        reject(e);
    }
  })
  
};
  