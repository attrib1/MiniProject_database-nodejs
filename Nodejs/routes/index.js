var express = require('express');
var app = express();
var router = express.Router();
var user = require("../repository/users");





var sess;

/* GET home page. */


router.get('/', function(req, res, next) {   
     sess  = req.session;
    
    if(sess.user_name){
        	res.redirect('/admin');
    }else{
        
       res.render('index', { title: 'Express index ' });
        console.log("redrirect's  OK.");
    }
     // res.render('index', { title: 'Express index ' });
  
/*user.connect(function(err){

     user.loadUser(function(err_query,data){
        if (err) return res.send(500, "DB QUERY ERROR");
        res.render('index', { customers: data,title: 'Express index' });
    });
  });
    */
});

router.post('/',function(req,res,next){
    sess = req.session;
  
     var loginSuccess=0;
    user.connect(function(){      
        user.loadUser(function(err_query,row){
           
            
            if (err_query) return res.send(500, "DB QUERY ERROR");
             for(var i in row){
                //console.log(row[i]);
                // console.log("id : "+row[i].user_name+"  pass: "+row[i].user_pass);
            console.log("id re : "+req.body.user_name+" pass re: "+req.body.user_pass);
                if((row[i].user_name == req.body.user_name)&&
                   (row[i].user_pass == req.body.user_pass)){  
                      sess.user_name = req.body.user_name;
                     // loginSuccess =1;                     
                      return  res.redirect('/admin');   
                                    
                    }else{ 
                       loginSuccess = 1;                           
                    }
             }//end for loop
     
       /* if (loginSuccess == 1){ 
               //sess.user_name = req.body.user_name;
              // sess.user_pass = req.body.user_pass;
             res.redirect('/admin');
            loginSuccess = 0;
            req.session.cookie.maxAge = 21600000; //limit cookoe
           */
         if (loginSuccess == 1){
               
          res.render('index', { title:'Login Fail ' });
             
        }
       
    
        });//end loadUser
        
    });//end end connect
    

    

});//end post '/login'

router.get('/public', function (req, res, next) {

    user.connect(function (err) {

        user.Topicpublic(function (err_query, data) {

          
            res.json(data);
  //console.log(data);

        });


    });

}); //end 
router.get('/public/:id', function (req, res, next) {
var qid = req.params.id;
      user.connect(function () {

                        user.selectEditTopic(qid,function(err_query,data){
                             if (err_query) return res.send(500, "Db query del topic's error");
                            
                                  res.json(data);
          	                });
                            
                        
                      

                    }); //end connect edit topic
}); //end 

module.exports = router;
