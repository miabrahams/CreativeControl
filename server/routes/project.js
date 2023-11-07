const express = require('express');

const router = express.Router();
const Project = require('../models/ProjectModel');

router.post(
  '/:id',
  async function (req, res) {
    const {title} = req.body;
    const projectDoc = Project.create({title});
    return res.status(200).contentType('text/plain').end('Project created!');
  }
);


// Get by ID
router.get('/:id', async (req, res, next) => {
  const {_id} = req.body;
  const projectDoc = await Project.findById(_id);
  if (projectDoc) {
    res.status(200).json(projectDoc);
  }
  else {
    res.sendStatus(404);
  }
  }
);

// EXPORT THE ROUTER
module.exports = router;