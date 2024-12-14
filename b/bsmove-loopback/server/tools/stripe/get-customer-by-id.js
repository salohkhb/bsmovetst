'use-strict';

const generateError = require('../error handling/create-error');
const app = require('../../server');


const strErrorStripe = 'Erreur lors de la creation de l\'utilisateur stripe.';


// get stripe customer id using internal customer's Id.

module.exports = function getStripeCustomerById(customerId) {
  return new Promise ( async function(resolve, reject) {
    if (customerId) {
        app.models.StripeAccount.findOne({where: {customerId: customerId}}, function(err,instance){
            if (err) {
                reject(err);
            }
            if (instance) {
                resolve(instance);
            } else {
                reject(
                    generateError(500,
                    'USER_INSTANCE_MISSING',
                    strErrorStripe,
                    'getStripeCustomerById')
                );
            }
        });
    } else {
        reject(
            generateError(500,
            'USER_INSTANCE_MISSING',
            strErrorStripe,
            'getStripeCustomerById')
        );
    }
  })
  
};
  