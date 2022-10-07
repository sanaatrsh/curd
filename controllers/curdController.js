const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getAll = (req, res, next) => {

    User.findAll()
        .then(
            ([rows]) => {
                res.status(200).json(rows);
            })
        .catch(err => console.log(err));
}

//Create
exports.postAddUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed!',
            errors: errors.array(),
        })
    }
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    return User
        .create({
            name: name,
            email: email,
            mobile: mobile
        })
        .then(() => {
            console.log('User Created!')
            res.status(201).json({
                message: 'Record created successfully',
            })
        })
        .catch(err => {
            console.log(err);
        });
}

//Update"lesa ma sar :'("
exports.editUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed!',
            errors: errors.array(),
        })
    }
    const userId = req.params.id;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedMobile = req.body.mobile;
    User.findByPk(userId)
        .then(user => {
            user.name = updatedName;
            user.email = updatedEmail;
            user.mobile = updatedMobile;
            return user.save();
        })
        // User
        //     .update({
        //         name: updatedName,
        //         email: updatedEmail,
        //         mobile: updatedMobile
        //     }, {
        //         where: {
        //             Id: userId
        //         }
        //     })
        .then(result => {
            console.log('UPDATED USER!');
            res.redirect('index');
        })
        .catch(err => console.log(err));
};

//Delete
exports.postDeleteUser = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId)
        .then(user => {
            return user.destroy();
        })
        .then(result => {
            console.log('DESTROYED USER!');
            res.status(201).json({
                message: 'Record deleted successfully',
            })
        })
        .catch(err => console.log(err));
};
