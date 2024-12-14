'use strict'


module.exports = function productTotalSum(products) {
    return new Promise ( async function(resolve, reject) {
        try {
            if (products) {
                let productTotal = 0;
                for (let i = 0, len = products.length; i < len; i++) {
                    if (products[i].price){
                        productTotal += products[i].price * products[i].quantity;
                    }
                }
                resolve(productTotal);
            } else {
                reject();
            }

        }
        catch (e){
          reject(e);
        }
    })
  };
