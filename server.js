require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const monk = require('monk');
const express = require('express');
const { winston } = require('./utils');
const { typeDefs } = require('./api/parents/parents.schema');
const { resolvers } = require('./api/parents/parents.resolvers');
const config = require('./config');
const app = express();

// const typeDefs = gql`
//   type Query {
//     launches: String!
//   }
// `;

// A map of functions which return data for the schema.
// const resolvers = {
//   Query: {
//     launches: () => 'world'
//   }
// };

server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use(cors());
app.use(bodyParser.json());

// Connection URL

const url = config.mongo_uri;
const db = monk(url);

let port = process.env.PORT || 4000;

app.get('/helloworld', (req, res, next) => {
  res.status(200).send('Hello world!');
});

db.then(() => {
  winston.log('info', 'Connected to mongo server');
  app.listen({ port }, () => winston.info(`🚀 Server ready at ${port}`));
}).catch(err => {
  winston.error(err);
});

// const session = require('express-session');
// const bodyParser = require('body-parser');
// const massive = require('massive');
// const passport = require('passport');
// const Auth0Strategy = require('passport-auth0');
// var logout = require('express-passport-logout');

// const SignUpCtrl = require('./controllers/SignUpController');
// const UserCtrl = require('./controllers/userController');
// const AdminCtrl = require('./controllers/AdminController');
// const MailSignUpCtrl = require('./mailControllers/SignupCtrl');
// const MailAssignedCtrl = require('./mailControllers/AssignedCtrl');
// const SwimTeamCtrl = require('./controllers/SwimTeamController');
// const SwimTeamMailCtrl = require('./mailControllers/SwimTeamMailCtrl');

// //ENDPOINTS ************************************************
// app.get('/api/child/getall', SignUpCtrl.getAllChildren);
// app.post('/api/child/create/:paid', SignUpCtrl.addChild);
// app.post('/api/child/signup', SignUpCtrl.addSession);
// app.get('/api/user/getchildren/:parent_email', UserCtrl.getUserChildren);
// app.put('/api/user/newnotice/:parent_email', UserCtrl.updateNewNotice);
// app.get('/api/admin/getall', AdminCtrl.adminGetAll);
// app.get('/api/admin/gettimes', AdminCtrl.adminGetTimes);
// app.post(
//   '/api/admin/assigntime/:session_id/:time_id',
//   AdminCtrl.adminAssignTime
// );
// app.post('/api/admin/timeslot/:session_id/:age', AdminCtrl.timeSlot);
// app.put('/api/admin/email', AdminCtrl.emailSent);
// app.get('/api/admin/swimteam', AdminCtrl.adminSwimTeamTimes);
// app.get('/api/swimteamtimes', SwimTeamCtrl.getSwimTeamTimes);
// app.post(
//   '/api/swimteam/signup/:parent_email/:paid',
//   SwimTeamCtrl.swimTeamSignUp
// );
// app.get('/api/swimteamsignups/:parent_email', SwimTeamCtrl.swimTeamGetByUser);
// app.post('/api/email/signup', MailSignUpCtrl.sendEmail);
// app.post('/api/email/swimteam', SwimTeamMailCtrl.sendEmail);
// app.post('/api/email/assigned', MailAssignedCtrl.sendEmail);
// app.put('/api/update/paid', UserCtrl.updatePaid);
