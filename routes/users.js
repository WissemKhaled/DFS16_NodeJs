var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Mongo = require('../bin/mongo');
var uniqid = require('uniqid');
var crypto = require('crypto');

router.get('/', function(req, res, next) {
  if(req.session.user) {
      return next();
  }
  res.render('index', { title: "hello"} );

})

router.use(function(req, res, next) {
  if (!req.session) {
      return next(createError(403));
  }
      return next()
})

router.get('/', function(req, res, next) {
  Mongo.getInstance().collection('rooms').find().toArray((err, rooms) => {
    res.render('users/dashboard', { title: 'Vous etes connecté', rooms:rooms });
})
});

router.post('/', function(req, res, next) {
  let datas = {
    title : req.body.title,
    owner : req.session.user._id,
    private: false,
    users: []
  }
  Mongo.getInstance()
  .collection('rooms')
  .insertOne(datas, function (err,result) {
    if(err) {
      return res.json({
        status : false,
        message: err.message
      })
    }
    Mongo.getInstance().collection('rooms')
    .find({owner: req.session.user._id})
    .toArray((err, rooms) => {
      res.render('users/dashboard', { title: 'Vous etes connecté', rooms:rooms });
    })
  })
})

router.delete('/', function(req, res, next) {
  req.session.destroy(function(err) {
  })
  return res.json({
    status:true
  });
});
module.exports = router;
