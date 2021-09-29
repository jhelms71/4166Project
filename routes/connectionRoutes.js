const express = require('express');
const controller = require('../controllers/connectionController');

const router = express.Router();

// GET /connections: send all stories to the user
router.get('/', controller.connections);

// GET /connections/new: send html form for creating a new story
router.get('/newConnection', controller.newConnection);

// POST /connections: create a new story
router.post('/', controller.create);

// GET /connections/:id: send details of story identify by id
router.get('/:id', controller.show)

// GET /connections/:id/edit: send html form for editing exisiting story
router.get('/:id/edit', controller.edit);

// PUT /connections/:id: update the story identified by the id
router.put('/:id', controller.update);

// DELETE /connections/:id: delete the story identified by id
router.delete('/:id', controller.delete);

module.exports = router;