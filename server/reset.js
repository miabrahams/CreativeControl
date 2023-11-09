
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

  try {

    console.log("Populating databases.");
    const newUser = await User.create({username: 'Test', password: 'Test', displayName: 'Creator', profilePic: '', projects: []});
    const newAsset = await Asset.create( {title: 'BalloonAsset'} );
    const balloonProject = await Project.create({title: 'Balloons', assets: [newAsset._id]});


    let snakeAsset1 = await Asset.create(
      {
        extraImageURLs: ['static/demo/00042-3158810176.jpeg'],
        comment: 'Many papercuts later...',
        title: 'Step 2',
        date: new Date('11/8/2023')
      });
    let snakeAsset2 = await Asset.create(
      {
        extraImageURLs: ['static/demo/S43254_0.jpg'],
        comment: 'Excited to start!',
        title: 'Step 1',
        date: new Date('10/10/2021')
      });

    let testProject = await Project.create({
      title: 'Make a Snake',
      assets: [snakeAsset1._id, snakeAsset2._id]
    });

    console.log('testProject: ', )

    // const assetDoc = await Asset.findById(newAsset._id.toString());
    // console.log('assetDoc: ', assetDoc)
    // console.log('ID: ', assetDoc._id.toString());

  }
  catch (err) {
    console.log('Err: ', err);
  }
  finally {
    await mongoose.disconnect();
  }
}, 0);





