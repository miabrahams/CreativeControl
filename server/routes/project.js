const express = require('express');

const router = express.Router();
const Project = require('../models/ProjectModel');

const imageFileController = require('../controllers/imageFileController');
const assetController = require('../controllers/assetController');
const sessionController = require('../controllers/sessionController');

router.post(
  '/:projectId',
  // Validation
  async function (req, res) {
    const {title} = req.body;
    const projectDoc = Project.create({title});
    return res.status(200).contentType('text/plain').end('Project created!');
  }
);


router.post(
  '/:projectId/addAsset',
  sessionController.validateLoginTest,
  imageFileController.upload.single('img'),
  imageFileController.loadImage,
  assetController.createAsset,
  assetController.addImage,
  async (req, res) => {
    return res.status(200).contentType('text/plain').end();
  }
);


router.patch(
  '/:id/notes',
  async function (req, res) { const {_id} = req.body; const projectDoc = await Project.findById(_id); }
)

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

      console.log('SENDING: ', transformedProject);

      return res.status(200).json(transformedProject);
    } else {
      console.log("Unknown project: ", _id);
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log("Error: ", err);
    return res.status(500).send('Unknown server error.');
  }
});

// EXPORT THE ROUTER
module.exports = router;