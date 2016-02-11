var express = require('express');

var router = express.Router();

var user = require("../repository/users");

/* GET users listing. */
router.get('/', function(req, res) {

	user.connect(function(err){

		user.loadUser(function(err_query,data){

			res.json(data);
			

		});

	});


 // res.send("V. : "+user.version);
});

router.get('/register', function(req, res) {
    res.sendfile("./views/html/insertUsers.html");    
});
router.post('/register', function(req, res) {
   	var name =  req.body.txt_name;
 	var pass = req.body.txt_pass;
 	var data = "name :"+name +"<br/> content : "+pass;
 	 //res.send(data);
      console.log(data);
   user.connect(function(err){

		user.insertUser(name,pass,function(err_query,id){

			res.send("ID : "+id);
			

		});

	});
    
});


module.exports = router;
