const express = require('express');

const router = express.Router();
const Project = require('../models/ProjectModel');

const imageFileController = require('../controllers/imageFileController');
const assetController = require('../controllers/assetController');
const sessionController = require('../controllers/sessionController');
const projectController = require('../controllers/projectController');


router.post(
  '/:projectId/addAsset',
  sessionController.validateLoginTest,
  imageFileController.upload.single('img'),
  imageFileController.loadImage,
  assetController.createAsset,
  projectController.addAsset,
  async (req, res) => {
    return res.status(200).json(res.locals.assetDoc);
  }
);

router.delete(
  '/:projectId/deleteAsset/:assetId',
  (req, res, next) => {
    console.log('Deleting asset: ', req.params);
    next();
  },
  sessionController.validateLoginTest,
  projectController.removeAsset,
  assetController.deleteAsset,
  async (req, res) => {
    return res.status(200).json(res.locals.assetDoc);
  }
);


router.patch(
  '/:projectId/editAsset/:assetId',
  (req, res, next) => {
    console.log('Patching asset: ', req.params);
    console.log('body: ', req.body);
    next();
  },
  sessionController.validateLoginTest,
  assetController.patchAsset,
  async (req, res) => {
    return res.status(200).json(res.locals.assetDoc);
  }
);



router.post(
  '/create',
  async function (req, res) {
    try {
      const title = req.body.title || '';
      const projectDoc = await Project.create({title});
      console.log('Creating project: ', projectDoc.toJSON())
      return res.status(200).send(projectDoc.toJSON());
    }
    catch(err) {
      console.log("Couldn't create project: ", err)
      return res.status(500).send("Couldn't create project: ", err)
    }
  }
);


router.patch(
  '/:id/notes',
  async function (req, res) { const {_id} = req.body; const projectDoc = await Project.findById(_id); }
)

router.patch(
  '/changeTitle/:projectId',
  sessionController.validateLoginTest,
  projectController.patchProject,
  async (req, res) => {
    console.log('Finished');
    return res.status(200).json(res.locals.editResult);
  }
);



// Get by ID
router.get('/sparkle', (req, res) => {
  return res.status(200).json({ code: '✨✨✨' });
});

router.get('/list', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  }
  catch (err) {
    console.log('List failed: ', err);
 }
})


router.get('/:id', async (req, res) => {
  // For now: Public link, no validation required.
  // Later: allow Users to toggle public/private.
  try {
    // let snakeProj = await Project.findOne({title: 'Make a Snake'}).populate('assets').exec();
    // snakeProj = snakeProj.toObject({flattenMaps:true});
    const project = await Project.findOne({ _id: req.params.id })
      .populate({
        path: 'assets',
        populate: {
          path: 'imageFiles'
        }
      }).exec();

    if (project) {
      const transformedAssets = project.assets.map(asset => {
        const urls = asset.imageFiles.map(image => image.filename);
        return {
          ...asset.toObject(),
          imageUrls: [...urls]
        };
      });

      const transformedProject = {
        ...project.toObject(),
        assets: transformedAssets
      };

      return res.status(200).json(transformedProject);
    } else {
      console.log("Unknown project: ", req.params.id);
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).send('Unknown server error.');
  }
});

// EXPORT THE ROUTER
module.exports = router;