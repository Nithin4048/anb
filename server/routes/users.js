var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://nithin:nithin@ds111549.mlab.com:11549/userdetails', ['users']);

// Get All Users
router.get('/users', function(req, res, next) {
    db.users.find(function(err, users){
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});

//Save User
router.post('/user', function(req, res, next) {
    var user = req.body;
    if (!user.name || !user.email || !user.message) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.users.save(user, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }
});

//Delete User
router.delete('/user/:id', function(req, res) {
    var user = req.body;
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

module.exports = router;