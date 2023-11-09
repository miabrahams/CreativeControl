
/* Mongoose setup*/
const mongoose = require('mongoose');

const User    = require('./models/UserModel')
// const Client  = require('./models/ClientModel')
const Asset   = require('./models/AssetModel')
const ImageFile   = require('./models/ImageFileModel')
const Project = require('./models/ProjectModel')
const Session = require('./models/SessionModel')

const CONFIG = require('./config');
mongoose.connect(CONFIG.mongo_dev);

setTimeout( async () => {
  console.log("Clearing databases.");
  await User.deleteMany({}).then(console.log);
  await Asset.deleteMany({}).then(console.log);
  await ImageFile.deleteMany({}).then(console.log);
  await Project.deleteMany({}).then(console.log);
  await Session.deleteMany({}).then(console.log);

  try {

    console.log("Populating databases.");
    const newUser = await User.create({username: 'Test', password: 'Test', displayName: 'Creator', profilePic: '', projects: []});

    const imagePaths = [
      'static/demo/balloons.png',
      'static/demo/S43254_0.jpg',
      'static/demo/00042-3158810176.jpeg',
    ];

    const imageFiles = []

    for (const imagePath of imagePaths) {
      imageFiles.push(await ImageFile.create({filename: imagePath}));
    }


    const balloonAsset = await Asset.create( {
      title: 'BalloonAsset',
      notes: 'Ahh~',
      date: new Date('8/8/2008'),
      imageFiles: [imageFiles[0]]
    } );
    const balloonProject = await Project.create({title: 'Balloons', assets: [balloonAsset._id]});


    let snakeAsset1 = await Asset.create(
      {
        imageFiles: [imageFiles[1]],
        notes: 'Excited to start!',
        title: 'Step 1',
        date: new Date('10/10/2021')
      });
    let snakeAsset2 = await Asset.create(
      {
        imageFiles: [imageFiles[2]],
        notes: 'Many papercuts later...',
        title: 'Step 2',
        date: new Date('11/8/2023')
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





