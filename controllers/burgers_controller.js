var express = require('express');
var router = express.Router();
var models = require('../models'); // Pulls out the Burger Models

var sequelizeConnection = models.sequelize;
sequelizeConnection.sync();


router.get('/', function (req, res) {
  res.redirect('/index');
});

router.get('/index', function (req, res) {
  models.burger.findAll({
   include: [{model: models.devourers}]
  }).then(function(data){
    var hbsObject = { burger: data };
    // console.log(data);
    res.render('index', hbsObject);
  })
});

router.post('/burger/create', function (req, res) {
  models.burger.create(
    {
      burger_name: req.body.burger_name,
      devoured: false
    }
  ).then(function(){
    res.redirect('/index');
  });
});

// Devour a Burger
router.post('/burger/eat/:id', function (req, res) {
  if(req.body.burgerEater == "" || req.body.burgerEater == null){
    req.body.burgerEater = "Anonymous";
  }
  models.devourers.create({
    devourer_name: req.body.burgerEater,
    burgerId: req.params.id
  })
  .then(function(newDevourer){
    models.burger.findOne( {where: {id: req.params.id} } )
    .then(function(eatenBurger){
      eatenBurger.update({
        devoured: true,
      })
      .then(function(){
        res.redirect('/index');
      });
    });
  });
});

module.exports = router;