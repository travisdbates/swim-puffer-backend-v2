const monk = require('monk');
const {
  sessions: sessionsImport,
  sessionTimes,
  parents: parentsSeed,
  students: studentsSeed
} = require('./seedData');
const config = require('../config');
// Connection URL
const url = config.mongo_uri;
console.log(url);
const db = monk(
  'mongodb://heroku_bspfq7g5:f6fd65qbl4n2ta485da82f9s6l@ds261302.mlab.com:61302/heroku_bspfq7g5'
);

db.then(() => {
  console.log('Beginning seed');
});
cleanDB = () => {
  const sessions = db.get('sessions');
  sessions.drop();
  const timeSlots = db.get('timeSlots');
  timeSlots.drop();
  const parents = db.get('parents');
  parents.drop();
  const students = db.get('students');
  students.drop();
};

createCollections = async () => {
  const sessions = await db.get('sessions');
  sessionsImport.map(async session => {
    await sessions.insert(session);
  });
  const timeSlots = await db.get('timeSlots');
  sessionTimes.session1.map(async slots => {
    await timeSlots.insert(slots);
  });
  const parents = await db.get('parents');
  parentsSeed.map(async parent => {
    parents.insert({ ...parent });
  });
  const students = await db.get('students');
  studentsSeed.map(async student => {
    students.insert({ ...student });
  });
};

cleanDB();
createCollections();
