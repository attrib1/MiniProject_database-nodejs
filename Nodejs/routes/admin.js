var express = require('express');
var session = require('express-session');

var router = express.Router();
var user = require("../repository/users");
var fileType = require('file-type');
var dateFormat = require('dateformat');
var readChunk = require('read-chunk');


/* GET home page. */
router.get('/', function (req, res, next) {
    sess = req.session;
    if (sess.user_name) {
        /*  	user.connect(function (err) {
          	            user.loadUser(function (err_query, data) {
          	                if (err) return res.send(500, "DB QUERY ERROR");
          	                res.render('admin', {
          	                    customers: data,
          	                   title: 'Express index Welcome ' + sess.user_name
          	                });
          	            });                      
                  });/// end connect*/
        user.connect(function (err) {

            user.selectTopic(function (err_query, data) {
                if (err) return res.send(500, "Db query error");
                //console.log(data);
                res.render('admin', {
                    topic: data,
                    title: 'Express index Welcome ' + sess.user_name
                });

            }); //end selectTopic
        }); //end connect toopic
    } else {
        res.redirect('/');
        //res.render('index', { title: 'Express index ' });
    }

}); //end 

router.get('/topic', function (req, res, next) {

    user.connect(function (err) {

        user.selectTopic(function (err_query, data) {


            res.json(data);
            //console.log(data);

        });


    });

}); //end 

router.post('/insert', function (req, res, next) {
    sess = req.session;

    var title = "underfined";
    var desc = "underfined";
    var category = "underfined";
    var nameimg = "nimg";
    var multiparty = require("multiparty");
    var form = new multiparty.Form();



    if (sess.user_name) {



        form.parse(req, function (err, fields, files) {
            var img = files.nimg1[0];
            var fs = require("fs");
            title = "" + fields.title;
            desc = "" + fields.desc;
            category = "" + fields.category;
            console.log("category5555 = " + category);
            
            switch(category){
                case "Technology" :  category = 1;  break;
                case "Education" :  category = 2;  break;
                case "World" :  category = 3;  break;
                    default : category = "underfined";
                    
            }
            

            /* if(img.originalFilename==""){ console.log("file's : null");}// ถ้าไม่ใส่ไฟ์แสดง log's : file's : null ถ้าไม่ send("file's OK");
             else{ res.send("file's OK");}*/
            //console.log(img);
            fs.readFile(img.path, function (err, data) { // อ่านfile จาก img.path
                var path = "./public/images/" + img.originalFilename;


                if (err) console.log(err);

                fs.writeFile(path, data, function (err) { // save file ลง ตำแหน่ง path
                    var now = new Date();
                    var buffer = readChunk.sync(path, 0, 262);
                    var strType = fileType(buffer);
                    //  console.log(img);

                    var strDate = dateFormat(now, "dmyyhMMssmsl");
                    nameimg = "" + strDate + "." + strType.ext;
                    console.log(" img name : " + nameimg);
                    var newPath = "./public/images/" + nameimg;
                    if (err) throw err;
                    fs.renameSync(path, newPath);
                    //res.send('It\'s saved!');
                });

                user.connect(function (err) {
                    user.insertTopic(mysql_string(title), mysql_string(desc), category, mysql_string(nameimg), function (err_query, data) {
                        if (err) return res.send(500, "Db query insert topic error");
                        //res.send("ID : "+data);
                        res.redirect('/admin');

                    }); //end inserTopic

                }); //end connect insertTopic
            }); // end read file
        }); //end form parse



    } else {
        res.redirect('/');
    }


}); //end 


router.get('/del/:id', function (req, res, next) {
    sess = req.session;

    if (sess.user_name) {
        var qid = req.params.id;
        var picname;
        console.log("id q= " + qid);
        user.connect(function (err) {
            user.selectPictopic(qid, function (err_query, data) { //หาชื่อไฟล์แล้วลบรุป


                // console.log(data[0].pic_topic); แสดงชื่อ รุป


                var fs = require('fs'); // ลบรูป
                fs.unlink('./public/images/' + data[0].pic_topic, function (err) {
                    if (err) console.log(err);
                    console.log('successfully deleted');

                }); //end fs unlink
            }); //end selec Pic topic 

            user.delTopic(qid, function (err_query, data, pic_name) { //ลบหััวข้อ
                if (err_query) return res.send(500, "Db query del topic's error");

                res.redirect('/admin');

            }); //end delTopic

        }); //end connect deltopic


    } else {
        res.redirect('/');
    }

}); //end get del

router.get('/edit/:id', function (req, res, next) {
    sess = req.session;

    if (sess.user_name) {
        var qid = req.params.id;
        // console.log("qid edit = "+qid);
        user.connect(function () {

            user.selectEditTopic(qid, function (err_query, data) {
                if (err_query) return res.send(500, "Db query del topic's error");

                res.render('edit', {
                    data: data,
                    title: 'Express index Welcome ' + sess.user_name
                });


            });

        }); //end connect edit topic

    } else {
        res.redirect('/');
    }


}); //end get fedit topic

router.post('/edit', function (req, res, next) {
    sess = req.session;
    var title = "underfined";
    var desc = "underfined";
    var nameimg = "underfined";
    var qid = "underfined";
    var category = "underfined";
    var multiparty = require("multiparty");
    var form = new multiparty.Form();


    if (sess.user_name) {

        form.parse(req, function (err, fields, files) {
            var img = files.nimg1[0];
            var fs = require("fs");
            qid = fields.hidden_id;
            title = "" + fields.title;
            desc = "" + fields.desc;
            category = "" + fields.category;
             switch(category){
                case "Technology" :  category = 1;  break;
                case "Education" :  category = 2;  break;
                case "World" :  category = 3;  break;
                    default : category = "underfined";
                    
            }


            console.log(img);
            if (img.originalFilename == '') {
                console.log("not pic");
            } else {
                console.log("have pic'");
            }

            if (!img.originalFilename == '') { //ถ้า เจอไฟล์ใหม่ ให้ทำการลบและเขียนทับ
                fs.readFile(img.path, function (err, data) { // อ่านfile จาก img.path
                    var path = "./public/images/" + img.originalFilename;


                    if (err) console.log(err);

                    fs.writeFile(path, data, function (err) { // save file ลง ตำแหน่ง path
                        var now = new Date();
                        var buffer = readChunk.sync(path, 0, 262);
                        var strType = fileType(buffer);
                        console.log(img);

                        var strDate = dateFormat(now, "dmyyhMMssmsl");
                        nameimg = "" + strDate + "." + strType.ext;
                        console.log(" img name : " + nameimg);
                        var newPath = "./public/images/" + nameimg;
                        if (err) throw err;
                        fs.renameSync(path, newPath);
                        //res.send('It\'s saved!');
                    });

                    user.connect(function (err) {
                        user.selectPictopic(qid, function (err_query, data) { //หาชื่อรุปแล้วลบจากชื่อ                           
                            // console.log(data[0].pic_topic); แสดงชื่อ รุป
                            var fs = require('fs');
                            fs.unlink('./public/images/' + data[0].pic_topic, function (err) {
                                if (err) console.log(err);
                                console.log('successfully deleted');
                            }); //end fs unlink
                        }); //end selec Pic topic 
                        user.editTopic(qid, mysql_string(title), mysql_string(desc), category, mysql_string(nameimg), function (err_query, data) {
                            if (err) return res.send(500, "Db query insert topic error");
                            //res.send("ID : "+data);
                            res.redirect('/admin');

                        }); //end inserTopic

                    }); //end connect insertTopic

                }); // end read file
            } else { //แต่ถ้าไม่เจอไห้บันทึกไปเลย
                user.connect(function (err) {

                    user.editTopic(qid, mysql_string(title), mysql_string(desc), category, mysql_string("underfined"), function (err_query, data) {
                        if (err) return res.send(500, "Db query insert topic error");
                        //res.send("ID : "+data);
                        res.redirect('/admin');

                    }); //end inserTopic

                }); //end connect insertTopic

            }
        }); //end form parse



    } else {
        res.redirect('/');
    }


}); //end get fedit topic

router.get('/logout', function (req, res, next) {
    sess = req.session;
    // sess.user_name = null;
    sess.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}); //end 

router.get('/report/:id', function (req, res, next) {
    var PDFDocument = require('pdfkit');
    var fs = require('fs');
    var doc = new PDFDocument();
   
    sess = req.session;
    var qid = req.params.id;
    if (sess.user_name) {
        // res.send("ddddd"+qid);
  
        user.connect(function (err) {
            user.selectEditTopic(qid,function (err_query, data) {
              
                title = data[0].des_topic;
       
                doc.pipe(fs.createWriteStream('./public/reports/output.pdf'));

                 doc.fontSize(16).text(data[0].title_topic, 100, 100,{underline: true}).moveDown(0.5)
                    .image('./public/images/'+data[0].pic_topic,{width: 400,height:200}).moveDown(1)
                    .fontSize(10).text(data[0].des_topic);
                
                    doc.end();
                  }); //end Topicpublic
            }); // end connect
                doc.pipe(res);
 
    } else {
        res.redirect('/');
    }

}); //end 


function mysql_string(str) { ///ถ้าไม่ไช้จะerror เรื่องอักขระ mysql_real_escape_string
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
        case "\0":
            return "\\0";
        case "\x08":
            return "\\b";
        case "\x09":
            return "\\t";
        case "\x1a":
            return "\\z";
        case "\n":
            return "\\n";
        case "\r":
            return "\\r";
        case "\"":
        case "'":
        case "\\":
        case "%":
            return "\\" + char; // prepends a backslash to backslash, percent,
            // and double/single quotes
        }
    });
}


module.exports = router;