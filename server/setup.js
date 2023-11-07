
/* Mongoose setup*/
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/console_dev'
mongoose.connect(mongoURI);



const User = require('./models/UserModel')
// const Client = require('./models/ClientModel')
const Asset = require('./models/AssetModel')
const Project = require('./models/AssetModel')


const testUser = User.create({username: 'Test', password: 'Test', displayName: 'TestArtist', profilePic: '', projects: []});
const testProject = Project.create({name: 'Balloons', assets:  [{ type: mongoose.Schema.Types.ObjectID, ref:'Asset'}]})



