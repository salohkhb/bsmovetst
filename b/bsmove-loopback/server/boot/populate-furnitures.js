'use strict';
const data = require('../populate/sif-furnitures-fr.json');

const ALREADY_EXIST_CODE = 11000;

module.exports = function(app, cb) {
  const Model = app.models.Furniture;

  Model.create(data, function(err, response) {
    if (err) {
      let alreadyCreated = 0;
      Object.keys(err).forEach(index => {
        const error = err[index];
        if (error.code !== ALREADY_EXIST_CODE) {
          console.error('Furnitures populate', error);
        } else {
          alreadyCreated++;
        }
      });
      console.log('Already created furnitures:', alreadyCreated);
    } else {
      console.log('Created furnitures:', response.length);
    }
    process.nextTick(cb); // Remove if you pass `cb` to an async function yourself
  });
};
