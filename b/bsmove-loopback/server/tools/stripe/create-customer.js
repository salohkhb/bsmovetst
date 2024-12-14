'use-strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const generateError = require('../error handling/create-error');

const strErrorStripe = 'Erreur lors de la creation de l\'utilisateur stripe.';


// Create stripe customer and return it through a Promise.

module.exports = function stripeCustomerCreation(user) {
  return new Promise ( async function(reslove, reject) {
    if (user) {
        try {
            const customerToSend = {
              email: user.email,
              phone: user.phone,
              description: "Customer for BSMove created by Loopback Backend.",
              address: {
                postal_code: user.zipCode,
                city: user.city,
                line1: user.street,
                country: 'FR'
              },
              metadata: {
                customerId: user.id.toString()
              },
              name: `${user.lastName} ${user.firstName}`,
              shipping: {
                name: 'Customer default  address.',
                address: {
                  postal_code: user.address.zipCode,
                  city: user.address.city,
                  line1: user.address.street,
                  country: 'FR'
                }
              }
            };

            const paymentCustomer = await stripe.customers.create(customerToSend);
    
            if (paymentCustomer && paymentCustomer.id) {
                reslove(paymentCustomer);
            } else {
                reject(
                    generateError(500,
                    'STRIPE_CREATION_FAILED',
                    strErrorStripe,
                    'stripeCustomerCreation')
                );
            }
          } catch (err) {
            reject(err);
        }
    } else {
        reject(
            generateError(500,
            'USER_INSTANCE_MISSING',
            strErrorStripe,
            'stripeCustomerCreation')
        );
    }
  })
  
};
  