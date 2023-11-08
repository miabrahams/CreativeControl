
/* Mongoose setup*/
const mongoose = require('mongoose');

const User    = require('./models/UserModel')
// const Client  = require('./models/ClientModel')
const Asset   = require('./models/AssetModel')
const Project = require('./models/ProjectModel')
const Session = require('./models/SessionModel')

const CONFIG = require('./config');
mongoose.connect(CONFIG.mongo_dev);

setTimeout( async () => {
  console.log("Clearing databases.");
  await User.deleteMany({}).then(console.log);
  // await Client.deleteMany({}).then(console.log);
  await Asset.deleteMany({}).then(console.log);
  await Project.deleteMany({}).then(console.log);
  await Session.deleteMany({}).then(console.log);

  console.log("Populating databases.");
  const newUser = await User.create({username: 'Test', password: 'Test', displayName: 'Creator', profilePic: '', projects: []});
  const newAsset = await Asset.create( {title: 'BalloonAsset'} );
  const newProject = await Project.create({title: 'Balloons', assets: [newAsset._id]});


  const assetDoc = await Asset.findById(newAsset._id.toString());
  console.log('assetDoc: ', assetDoc)
  console.log('ID: ', assetDoc._id.toString());

  await mongoose.disconnect();


}, 0);





