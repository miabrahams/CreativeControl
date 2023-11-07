
/* Mongoose setup*/
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/console_dev'

const User = require('./models/UserModel')
const Client = require('./models/ClientModel')
const Asset = require('./models/AssetModel')
const Project = require('./models/AssetModel')
const Session = require('./models/SessionModel')

app.get('/clear', (req, res) => {
  // Response format: { acknowledged: true, deletedCount: 1 }
  res.sendStatus(200);
});


mongoose.connect(mongoURI);

setTimeout( async () => {
  console.log("Inside Async Land");
  await User.deleteMany({}).then(console.log);
  await Client.deleteMany({}).then(console.log);
  await Asset.deleteMany({}).then(console.log);
  await Session.deleteMany({}).then(console.log);
  const newUser = await User.create({username: 'Test', password: 'Test', displayName: 'Creator', profilePic: '', projects: []});
  const newProject = await Project.create({title: 'Balloons', assets:  []}).then(console.log);
}, 0);





