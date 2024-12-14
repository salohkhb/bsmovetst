'use strict';

module.exports = function(app, cb) {

  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

    User.create([
        {username: 'bsmoveAdmin', email: 'sif@bsmove.fr', password: 'CafeCorso19-'},
    ], function(err, users) {
        if (err) console.log('Un admin est deja set :\n %j \n\n\n', err);

        Role.create({
            name: 'admin',
            }, function(err, role) {
            if (err) return console.log('Un role admin est deja cree');
            console.log('ADMIN CREATED.' + role);
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id,
            }, function(err, principal) {
                if (err) return console.log(err);
                console.log(principal);
            });
        });
        process.nextTick(cb);
    });
};
