
var User = require('../models/user.js');

module.exports = {

  authenticate : function(req, res) {
    console.log('Authenticating...' + JSON.stringify(req.body));
    var credentials = req.body;
    if(credentials.email && credentials.password){
    credentials.email = credentials.email.trim().toLowerCase();
    User.find({"email": credentials.email}, function(err, usersResults) {
      if( err || !usersResults) 
      {
        console.log("Could not load user result:" + err);
        res.send(500);
      }
        else if(usersResults.length ==0)
      {
          console.log("Email not found.");
        if (req.session.user) {
          console.log('Destroying the session.');
          req.session.destroy();
        }
        res.send(401);
      }
      else
      {
        currentUser = usersResults[0];
        if(currentUser 
          && credentials.email == currentUser.email 
          && credentials.password == currentUser.password
          && ((!currentUser.active) || currentUser.active != 'true'))
        {
          var userId = ObjectId();
          req.session.user = {};
          req.session.user.id = currentUser._id.toString();
          req.session.user.email = currentUser.email;
          req.session.user.displayName = currentUser.displayName;
          req.session.user.firstName = currentUser.firstName;
          req.session.user.lastName = currentUser.lastName;
          req.session.user.role = currentUser.role;
          req.session.user.location = currentUser.location;
          req.session.user.creationDate = currentUser.creationDate;
          console.log('Authenticated, session created.');
          res.send(200);
        }
        else
        {
          console.log('Invalid credentials.');
          if (!req.session) {
            console.log('Destroying the session');
            req.session.destroy();
          }
          res.send(401);
        }
      }
      });
    }
    else
    {
      res.send(401);
    }
  },

  sessionActive : function(req, res)
  {
    if(req.session.user) { 
      console.log('User is active:' + JSON.stringify(req.session.user));
      return true;
    }
    else {
      return false;
    }
  },

  check : function(req, res)
  {
    if(exports.sessionActive(req, res))
      res.json({"result":"true"}, 200);
    else {
      console.log('Authorization check failed')
      res.json({"result":"false"}, 200);
    }
  }
}