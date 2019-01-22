require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
var logout = require('express-passport-logout');

const SignUpCtrl = require('./controllers/SignUpController');
const UserCtrl = require('./controllers/userController');
const AdminCtrl = require('./controllers/AdminController');
const MailSignUpCtrl = require('./mailControllers/SignupCtrl');
const MailAssignedCtrl = require('./mailControllers/AssignedCtrl');
const SwimTeamCtrl = require('./controllers/SwimTeamController');
const SwimTeamMailCtrl = require('./mailControllers/SwimTeamMailCtrl');
//for stripe
const SERVER_CONFIGS = require('./constants/server');
const configureServer = require('./stripeServer');
const configureRoutes = require('./routes');

const app = express();

//for stripe
configureServer(app);
configureRoutes(app);

// Uncomment this when buidling
app.use(express.static(`${__dirname}/../build`));

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
  console.log('Connected to DB');
  app.set('db', db);

  //console.log(db)

  // {db: dbObject}
});

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      //db calls will be used here, and create users in our database

      const db = app.get('db');
      // console.log(db)
      // console.log(profile);
      console.log(profile);
      db.users_find_user([profile.identities[0].user_id]).then(user => {
        if (user[0]) {
          return done(null, user[0].id);
        } else {
          // console.log("got to the else");
          if (profile.provider === 'auth0') {
            console.log('Logged in with email');
            db
              .users_create_user([
                profile._json.user_metadata.first_name,
                profile._json.user_metadata.last_name,
                profile._json.email,
                profile._json.picture,
                profile._json.identities[0].user_id,
              ])
              .then(user => {
                return done(null, user[0].id);
              });
          } else {
            db
              .users_create_user([
                profile._json.given_name,
                profile._json.family_name,
                profile._json.email,
                profile._json.picture,
                profile._json.identities[0].user_id,
              ])
              .then(user => {
                return done(null, user[0].id);
              });
          }
        }
        // console.log(user);
      });
    }
  )
);

app.get('/auth', passport.authenticate('auth0'));
app.get(
  '/auth/callback',
  passport.authenticate('auth0', {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.FAILURE_REDIRECT,
  })
);

app.get('/auth/me', (req, res) => {
  if (!req.user) {
    return res.status(200).send(false);
  }

  return res.status(200).send(req.user);
});

app.get('/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(302, 'https://tbates.auth0.com/v2/logout?returnTo=http%3A%2F%2Fswimpufferfish.com');
});

passport.serializeUser(function(id, done) {
  done(null, id);
});

//user represents whoever is logged in from the session

passport.deserializeUser(function(id, done) {
  app
    .get('db')
    .users_find_current_user([id])
    .then(user => {
      done(null, user[0]);
    });
});

//ENDPOINTS ************************************************
app.get('/api/child/getall', SignUpCtrl.getAllChildren);
app.post('/api/child/create/:paid', SignUpCtrl.addChild);
app.post('/api/child/signup', SignUpCtrl.addSession);
app.get('/api/user/getchildren/:parent_email', UserCtrl.getUserChildren);
app.put('/api/user/newnotice/:parent_email', UserCtrl.updateNewNotice);
app.get('/api/admin/getall', AdminCtrl.adminGetAll);
app.get('/api/admin/gettimes', AdminCtrl.adminGetTimes);
app.post('/api/admin/assigntime/:session_id/:time_id', AdminCtrl.adminAssignTime);
app.post('/api/admin/timeslot/:session_id/:age', AdminCtrl.timeSlot);
app.put('/api/admin/email', AdminCtrl.emailSent);
app.get('/api/admin/swimteam', AdminCtrl.adminSwimTeamTimes);
app.get('/api/swimteamtimes', SwimTeamCtrl.getSwimTeamTimes);
app.post('/api/swimteam/signup/:parent_email/:paid', SwimTeamCtrl.swimTeamSignUp);
app.get('/api/swimteamsignups/:parent_email', SwimTeamCtrl.swimTeamGetByUser);
app.post('/api/email/signup', MailSignUpCtrl.sendEmail);
app.post('/api/email/swimteam', SwimTeamMailCtrl.sendEmail);
app.post('/api/email/assigned', MailAssignedCtrl.sendEmail);
app.put('/api/update/paid', UserCtrl.updatePaid )

const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_CONFIGS.PORT, error => {
  if (error) throw error;
  console.log('Server running on port: ' + SERVER_CONFIGS.PORT);
});
