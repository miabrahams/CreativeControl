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
  async function (req, res) {
    const {_id} = req.body;
    const projectDoc = await Project.findById(_id);
  }
)

// Get by ID
router.get('/:id', async (req, res, next) => {
  // For now: Public link, no validation required.
  // Later: allow Users to toggle public/private.
  const {_id} = req.body;
  const projectDoc = await Project.findById(_id);
  if (projectDoc) {
    res.status(200).json(projectDoc);
  }
  else {
    res.sendStatus(404);
  }
});

// EXPORT THE ROUTER
module.exports = router;