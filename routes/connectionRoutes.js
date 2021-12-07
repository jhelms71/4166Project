const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isAuthor, isNotAuthor} = require('../middlewares/auth');
const{validateId, validateConnection, validateResult} = require('../middlewares/validator');

const router = express.Router();

// GET /connections: send all stories to the user
router.get('/', controller.connections);

// GET /connections/new: send html form for creating a new story
router.get('/newConnection', isLoggedIn, controller.newConnection);

// POST /connections: create a new story
router.post('/', isLoggedIn, validateConnection, validateResult, controller.create);

// GET /connections/:id: send details of story identify by id
router.get('/:id', validateId,  controller.show)

// GET /connections/:id/edit: send html form for editing exisiting story
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

// PUT /connections/:id: update the story identified by the id
router.put('/:id', validateId, isLoggedIn, isAuthor, validateConnection, validateResult, controller.update);

// DELETE /connections/:id: delete the story identified by id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

router.post('/:id/rsvp', validateId, isLoggedIn, isNotAuthor, controller.editRsvp);

module.exports = router;