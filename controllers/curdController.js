const User = require('../models/user');

exports.getAll = (req, res, next) => {

    User.fetchAll()
        .then(([rows]) => {
            res.status(200).json(rows);
        })
        .catch(err => console.log(err));
};

exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    req.user
        .createUser({
            name: name,
            email: email,
            mobile: mobile
        })
        .then(() => {
            console.log('User Created!')
            // res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}


exports.postEditUser = (req, res, next) => {
    const userId = req.params.userId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedMobile = req.body.mobile;
    Product.findByPk(userId)
        .then(user => {
            user.name = updatedName;
            user.email = updatedEmail;
            user.mobile = updatedMobile;
            return user.save();
        })
        .then(result => {
            console.log('UPDATED USER!');
            // res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postDeleteUser = (req, res, next) => {
    const userId = req.params.userId;
    Product.findByPk(userId)
        .then(user => {
            return user.destroy();
        })
        .then(result => {
            console.log('DESTROYED USER!');
            // res.redirect('/');
        })
        .catch(err => console.log(err));
};
