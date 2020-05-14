var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Mongo = require('../bin/mongo');
var uniqid = require('uniqid');
var crypto = require('crypto');
const ObjectId = require('mongodb').ObjectId;


router.get('/', function(req, res, next) {
  if(req.session.user) {
      return next();
  }
  return res.render('index', { title: "hello"} );

})

router.use(function(req, res, next) {
  if (!req.session) {
      return next(createError(403));
  }
      return next()
})

router.get('/', function(req, res, next) {
  Mongo.getInstance().collection('rooms').find({owner: req.session.user._id}).toArray((err, rooms) => {
    res.render('users/dashboard', { title: 'Vous etes connecté', rooms:rooms, req:req });
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
    .find({$or : [ {owner: req.session.user._id }, {private: false} ] })
    // .find({owner: req.session.user._id})
    .toArray((err, rooms) => {
      res.render('users/dashboard', { title: 'Vous etes connecté', rooms:rooms, req:req });
    })
  })
})

router.get('/:id', function(req, res, next) {
  let id = req.params.id;

  Mongo.getInstance()
    .collection('rooms')
    .findOne({_id:new ObjectId(id)}, function(err, result){
      if(err){
        return res.json({
          status: false,
          message: err
        });
      } else {
        Mongo.getInstance()
        .collection('users')
        .find()
        .toArray((err,resultUser) => {
          if(err){
            return res.json({
              status: false,
              message: err
            });
          }else {
            return res.json({
              status: true,
              result: result,
              resultUser: resultUser
            });
          }
        })

      }
    });
})

router.delete('/:id', function (req, res, next) {
  let id = req.params.id;
  Mongo.getInstance()
    .collection('rooms')
    .deleteOne({_id:new ObjectId(id)}, function(err, result){
      if(err){
        return res.json({
          status: false,
          message: err
        });
      } else {
        return res.json({
          status: true
        });
      }
    });
    
});


module.exports = router;
