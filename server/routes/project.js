const express = require('express');

const router = express.Router();
const Project = require('../models/ProjectModel');

router.post(
  '/:id',
  // Validation
  async function (req, res) {
    const {title} = req.body;
    const projectDoc = Project.create({title});
    return res.status(200).contentType('text/plain').end('Project created!');
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




const testProject = {
  _id: 'projectID',
  title: 'Make a Snake',
  assets: [
    {
      _id: '50235',
      imageUrl: 'static/demo/00042-3158810176.jpeg',
      comment: 'Many papercuts later...',
      title: 'Step 2',
      date: '11/8/2023'
    },
    {
      _id: 'vkwffa',
      imageUrl: 'static/demo/S43254_0.jpg',
      comment: 'Excited to start!',
      title: 'Step 1',
      date: '10/10/2021'
    }
  ]
}

router.get('/:id', async (req, res, next) => {
  // For now: Public link, no validation required.
  // Later: allow Users to toggle public/private.
  res.status(200).json(testProject);

  /*
  const {_id} = req.body;
  const projectDoc = await Project.findById(_id);
  if (projectDoc) {
    res.status(200).json(projectDoc);
  }
  else {
    res.sendStatus(404);
  }
*/


});

// EXPORT THE ROUTER
module.exports = router;