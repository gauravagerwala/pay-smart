var express = require('express');
var _ = require('underscore');
var db = require('./../db.js');
var middleware = require('./../middleware.js')(db);

var router = express.Router();

router.get('/', middleware.requireAuthentication, function(req, res){
  var body = _.pick(req.body, 'item', 'bar_code_format');

  db.item.findOne({
    where: {
    	id: req.params.bar_code
    }
  }).then( function(item){
    console.log(item);
    // res.json(item.toJSON());
  });

})

router.post('/', middleware.requireAuthentication, function(req, res){
	var body = _.pick(req.body, 'name', 'company', 'available', 'bar_code', 'bar_code_format', 'price');
	if(!req.user.user_type == 'manager'){
		res.status(400).send();
	}else{
		db.item.create(body).then( function(item){
		res.json(item.toJSON());
		}).catch( function(e){
			res.status(400).json(e);
		});	
	}
	
})

router.post('/pay:id', middleware.requireAuthentication, function(req, res){
  var body = _.pick(req.body, 'item', 'bar_code_format');

  db.item.findOne({
    where: {
    	id: item
    }
  }).then( function(item){
  	item.update({
  		available: false
  	}).then( function(){
  		res.json(item.toJSON());
  	})
  });

})

module.exports = router;
