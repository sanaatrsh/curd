const express = require('express');

const curdController = require('../controllers/curdController');

const { body } = require('express-validator');

const router = express.Router();

// router.get('/', curdController.getIndex);

// router.get('/create', curdController.getAddUser)

router.post('/create', [
    body('name').trim().isLength({ min: 3 }),
    body('email').isEmail(),
    body('mobile').isLength({ min: 7, max: 15 })
], curdController.postAddUser)

router.post('/delete/:id', curdController.postDeleteUser);

router.post('/edit/:id', curdController.postEditUser);

module.exports = router;