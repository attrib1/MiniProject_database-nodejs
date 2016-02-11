var express = require('express');
var express = require('express');
var dateFormat = require('dateformat');
var readChunk = require('read-chunk'); 
var fileType = require('file-type'); 
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 	res.sendfile("./views/html/upload.html");
});

router.post('/images',function(req,res,next){   
    
    var multiparty = require("multiparty");
    var form = new multiparty.Form();
    
    form.parse(req,function(err, fields, files){
        var img = files.images1[0];
        var fs = require("fs");
        
        fs.readFile(img.path, function (err, data) { // อ่านfile จาก img.path
            var path = "./public/images/"+img.originalFilename;
            
            
            if (err) console.log(err);
             
                    fs.writeFile(path, data, function (err) {// save file ลง แหน่ง path
                       var now = new Date();
                        var buffer = readChunk.sync(path, 0, 262);
                        var strType = fileType(buffer);
                        console.log(img);
                        
                        var strDate =   dateFormat(now, "dmyyhMMssmsl");
                        var newPath = "./public/images/"+strDate+"."+strType.ext;
                        if (err) throw err;                        
                        fs.renameSync(path,newPath);                  
                            res.send('It\'s saved!');
                    });
        });
      
        
      /*  console.log(files.images[0]); //log ลายละเอียด file ออกมา
         console.log(files.images[0].originalFilename); //log ชื่อfile ออกมา  */ 
    
    });
    
      console.log("img ok");
});



module.exports = router;
