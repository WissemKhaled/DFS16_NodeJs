var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var Mongo = require('../bin/mongo');
var uniqid = require('uniqid');
var crypto = require('crypto');
const ObjectId = require('mongodb').ObjectId;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/', function(req, res, next) {
  Mongo.getInstance()
  .collection('users')
  .findOne( {email: req.body.email }, function(err,result) {
    if(err) {
      return res.json({
        status : false,
        message: res.message
      })
    }
    if(!result || !result._id || crypto.createHash('sha256').update(req.body.password+result.salt).digest('hex') !== result.password ) {
      return res.json({
        status : false,
        message : 'Merci de vérifier vos identifiants'
      }) 
    }
    req.session.user = result ;
    return res.json({
      status:true
    });
  })

});

router.post('/', function(req, res, next) {
  let datas = {};
  let password = '';
  let salt = uniqid();
  password = crypto.createHash('sha256').update(req.body.password+salt).digest('hex');
  datas = {
    username : req.body.name,
    email: req.body.email,
    password : password,
    salt: salt
  };
  Mongo.getInstance()
  .collection('users')
  .insertOne(datas, function (err, result) {
    if(err) {
      if(err.message.indexOf('duplicate key') !== -1) {
        return res.json({
          status : false,
          message: 'Votre adresse email existe déjà'
        })
      }
      return res.json({
        status : false,
        message: err.message
      })
    }
    req.session.user = datas ;
    return res.json({
      status:true
    })
  })
});


router.delete('/', function(req, res, next) {
  req.session.destroy(function(err) {
  })
  return res.json({
    status:true
  });
});
module.exports = router;
