const fs = require('fs');
const multer = require('multer');
const express = require('express');
const excelModel = require('./model/model');
const mongoose = require('mongoose');
let url = "mongodb://localhost:27017/excel";
const excelToJson = require('convert-excel-to-json');
// const excelRoute = require('./routes/excel')

const app = express();
 
global.__basedir = __dirname;
var con = mongoose.connect(url,{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true})
 .then(()=>{
     console.log("mongodb connected")
     
 })
 .catch(()=>{
     console.log("mongodb not connected")
 });

 
// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
 
const upload = multer({storage: storage});
 
// -> Express Upload RestAPIs
app.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
    importExcelData2MongoDB(__basedir + '/uploads/' + req.file.filename,req);
    res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
    });
});
app.get('/api/uploadfile/',async(req,res,next)=>{
    const dataModel = await excelModel.find();
    if(dataModel){
        res.send(dataModel);
    }
    res.send('hello')
})
 app.get('/api/uploadfile/:id',async(req,res,next)=>{
     var id = req.params.id;
     var specific = await excelModel.findOne({testid:id});
     if(specific){
         res.json(specific)
     }else{
         res.json({
             file: "document not found!!"
         })
     }
    //  res.send("hello ids")s
 });
// -> Import Excel File to MongoDB database
function importExcelData2MongoDB(filePath,req){
    // -> Read Excel File to Json Data
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
            // Excel Sheet Name
            name: 'Customers',
 
            // Header Row -> be skipped and will not be present at our result object.
            header:{
               rows: 1
            },
			
            // Mapping columns to keys
            columnToKey: {
                A: 'id',
                B: 'Question',
                C:  'A',
                D: 'B',
                E: 'C',
                F: 'D',
                G: 'E',
                H: 'F',
                I: 'G',
                J: 'H',
                K: 'Ans'

                
            }
        }]
    });
 
    // -> Log Excel Data to Console
    // console.log(excelData.Customers);
    // saveData(excelData.Customers,req);
    excelData.Customers.forEach((element) => {
        saveData(element,req)
        // console.log(element.Question)
    });

    fs.unlinkSync(filePath);
}
const saveData = async(element,req)=>{
    console.log(element)
    var arr = []
    // element.forEach(data => {
    //     var Excel = new excelModel({
    // Question: data.Question,
    //        option: {
    //             option: true
    //         }
    //     });
    //     if(data.A === data.F){
    //         // console.log(data.A)
    //         arr = [...arr,data.A]
    //         // Excel.option = true;
    //     }
    //     else if( data.B === data.F){
    //         // console.log(data.B)
    //         arr = [...arr,data.B]
    //         // Excel.option = true;
    //     }else if( data.C === data.F){
    //         // console.log(data.C)
    //         arr = [...arr,data.C]
    //         // Excel.option = true;
    //     }else if( data.D === data.F){
    //         // console.log(data.D)
    //         arr = [...arr,data.C]
    //         // Excel.option = true;
    //     }else if( data.E === data.F){
    //         // Excel.option = true;
    //         // console.log(data.E)
    //         arr = [...arr,data.E]
    //     }
    //     console.log(arr)
    // });
   var Excel = new excelModel({
    Question: element.Question,
    //    file: element
   });
   var data = await Excel.save();
   return data

    // var Excel = new excelModel({
    //     title: req.body.title,
    //     file: element
    // });
    // const data = await Excel.save();
    //  return data;
    
}
// Create a Server
app.use((req,res,next)=>{
    res.send("404 error")
})
const port  = 8080;
let server = app.listen(port, function () {
 
 
 
  console.log(  `App listening at http://localhost:${port}`);
})