'use strict';

module.exports = function(app) {
  app.get('/verified', function(req, res) {
    res.render('verified');
  });
};
