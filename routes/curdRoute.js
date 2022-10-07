const express = require('express');

const curdController = require('../controllers/curdController');

const { body } = require('express-validator');

const router = express.Router();

router.get('/', curdController.getAll);

router.post('/create', [
    body('name').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('mobile').isLength({ min: 7, max: 15 })
], curdController.postAddUser)

router.post('/delete/:id', curdController.postDeleteUser);

router.post('/edit/:id', curdController.editUser)

module.exports = router;