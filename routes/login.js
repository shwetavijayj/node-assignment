var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const _ = require("lodash");
var saveData = require('../controller/saveData.js');
const { Users } = require('../controller/users');
var userId;

router.post('/login', function (req, res) {
    var body = _.pick(req.body, ["username", "password"]);
    console.log('Body Content:', body.username);
    Users.findByCredentials(body.username, body.password).then((user) => {

        userId = user.id;
        return user.generateAuthToken().then((token) => {
            console.log(user);
            req.session.email = user.email;
            res.render("homePage",
                { data: user });
        });
    }).catch((err) => {
        console.log('Error:', err);
        res.render("login");
    });

});



router.get('/login', function (req, res) {
    res.render("login");
})



router.get('/logout', function (req, res) {
    Users.findById(userId).then((user) => {
        user.removeToken(req.token).then(() => {
            res.render('login');
        }).catch();
    }).catch(() => {
        res.status(400).send();
    });
});

router.get('/update', function (req, res) {
    Users.findByEmail(req.session.email).then((user) => {
        console.log(user);
        res.render("editPage",
            { data: user });

    }).catch((err) => {
        console.log('Error:', err);
        res.render("homePage");
    });
})

router.get('/delete', function (req, res) {
    Users.findOneAndDelete({
        email: req.session.email
    }).then((user) => {
        if (!user) {
            return res.status(404).send("User not found!");
        }
        else {
            res.render('login');
        }

    }).catch((err) => {
        return res.status(400).send("Invalid Request!");

    });





})

router.post('/updatePage', function (req, res) {
    saveData.updateData(req, function (err, res) {
        if (err) {
            console.log('Error:', err);
        }
        else {
            res.render("homePage", {
                data: user
            });
        }
    })

});


module.exports = router;