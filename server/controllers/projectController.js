
const ProjectController = {};

const Project = require('../models/ProjectModel');

ProjectController.addAsset = async (req, res, next) => {
  // Hopefully we could query doc already?
  // Requires assetDoc to exist
  if (req.params.projectId && res.locals.assetDoc) {
    console.log(req.params.projectId);
    // console.log('All projects: ', await Project.find({}));
    const projectDoc = await Project.findOne({_id: req.params.projectId});
    // console.log('Found Project: ', projectDoc);
    projectDoc.assets = [...projectDoc.assets, res.locals.assetDoc];
    projectDoc.save();
    return next()
  }
  else {
    console.log('No project...');
    return next({err: 'No project!'});
  }
}


ProjectController.patchProject = async (req, res, next) => {

  console.log('Patching project: ', req.params.projectId);
  console.log('body: ', req.body);

  console.log('Updates: ', req.body);
  res.locals.editResult = await Project.updateOne({_id: req.params.projectId}, req.body).exec();
  if (!res.locals.editResult) {
    next({err: 'Could not edit project.'});
  }
  // console.log('Edit result: ', res.locals.editResult);
  console.log('Edit result finished')
  next();
};



ProjectController.removeAsset = async (req, res, next) => {
  // Hopefully we could query doc already?
  // Requires assetDoc to exist
  if (req.params.projectId) {
    console.log(req.params.projectId);
    console.log(req.params.assetId);
    const projectDoc = await Project.findOne({_id: req.params.projectId});
    console.log('Assets before: ', projectDoc.assets.length)
    projectDoc.assets = projectDoc.assets.filter(asset => asset._id.toString() !== req.params.assetId)
    console.log('Assets after: ', projectDoc.assets.length)
    projectDoc.save();
    return next()
  }
  else {
    console.log('No project...');
    return next({err: 'No project!'});
  }
}



module.exports = ProjectController