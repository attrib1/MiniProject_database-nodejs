
function Users(){

//	this.version = "10111111";
var mysql   = require('mysql');
      var config = {

            host : "localhost", //localhost
            user : "root",
            password : "",//""
            database : "lab_nodejs01",//lab_nodejs01
            

    }//end config

	var db = null;
    var query = null;
	this.connect =function(callback){
        

		db = mysql.createConnection(config);

		db.connect(function(err){
			if(err) {console.log(err);}

			callback(err);
		});


	}

	this.loadUser = function(callback){

		var sql = "select * from user";
		db.query(sql,function(err_query,data){

			if(err_query) console.log(err_query);
			
			callback(err_query,data);

		});

	}
    
    this.insertUser = function(username,pass,callback){
     
        var sql = "insert into user(user_name,email) VALUES ('"+username+"','"+pass+"')";
        
        db.query(sql,function(err,data){
            if(err) console.log(err);
            
            callback(err,data.insertId);
            
        });
    }

    
 this.Topicpublic = function(callback){
    
    var sql = "select * from topic ORDER BY id_topic DESC";
     
  	db.query(sql,function(err_query,data){

			if(err_query) console.log(err_query);
			
			callback(err_query,data);

		});
    

}//end selectTopic androdi
this.selectTopic = function(callback){
    
    var sql = "select id_topic,title_topic,category_name from topic,category WHERE topic.category_id = category.category_id ORDER BY id_topic DESC";
     
  	db.query(sql,function(err_query,data){

			if(err_query) console.log(err_query);
			
			callback(err_query,data);

		});
    

}//end selectTopic

this.insertTopic = function(title,desc,category,nimg,callback){

 var sql = "insert into topic(title_topic,des_topic,category_id,pic_topic) values ('"+title+"','"+desc+"','"+category+"','"+nimg+"')";
    db.query(sql,function(err,data){
            if(err) console.log(err);
            
            callback(err,data.insertId);
            
        });


}//end insertTopic 

this.delTopic = function(id,callback){
    var sql = "delete from topic where id_topic = '"+id+"'";
 
    db.query(sql,function(err){
        
        if(err) console.log(err);
      
        callback(err);    
    
    });

}//end del Topic

this.editTopic = function(id,title,desc,category,nimg,callback){
    var sql = "";
    console.log("cataegory 5555 = " +category);

    if(nimg == "underfined"){
    
sql = "update topic set title_topic = '"+title+"',des_topic = '"+desc+"',category_id='"+category+"' where id_topic = '"+id+"' ";
    }
    else{
    	
sql = "update topic set title_topic ='"+title+"',des_topic = '"+desc+"',category_id='"+category+"',pic_topic ='"+nimg+"' where id_topic = '"+id+"'";
    }
    db.query(sql,function(err){
        if(err) console.log(err);
        
       callback(err);
    
    });
}//class edit topic

this.selectPictopic = function(id,callback){
    
    var sql = "select pic_topic from topic where id_topic = '"+id+"'";
     
  	db.query(sql,function(err_query,data){

			if(err_query) console.log(err_query);
			
       // console.log("[] "+data[0].pic_topic);
			callback(err_query,data);

		});
    

}//end selectTopic
    

this.selectEditTopic = function(id,callback){
    
    var sql = "select topic.*,category.category_name from topic,category where topic.category_id = category.category_id AND id_topic = '"+id+"'";
     
  	db.query(sql,function(err_query,data){

			if(err_query) console.log(err_query);
			
			callback(err_query,data);

		});
    

}//end selectTopic

}//end Users


module.exports = new Users();
