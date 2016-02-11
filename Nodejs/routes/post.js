var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.sendfile("./views/html/post.html");
});

router.post('/', function(req, res, next) {
 	var name = req.body.txt_name;
 	var content = req.body.txt_content;
 	var data = "name :"+name +"<br/> content : "+content;
 	 res.send(data);
});
router.post('/img', function(req, res, next) {
 res.sendfile("./public/images");
});


module.exports = router;
