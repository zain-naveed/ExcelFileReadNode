// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const multer = require('multer');
// // const excelModel = require('../model/model');
// const excelToJson = require('convert-excel-to-json');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, __basedir + '/uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
//     }
// });
 
// const upload = multer({storage: storage});
 
// // -> Express Upload RestAPIs
// router.post('/api/uploadfile', upload.single("uploadfile"), (req, res) =>{
//     importExcelData2MongoDB(__basedir + '/uploads/' + req.file.filename,req);
//     res.json({
//         'msg': 'File uploaded/import successfully!', 'file': req.file
//     });
// });
// router.get('/api/uploadfile',async(req,res,next)=>{
//     const dataModel = await excelModel.find();
//     if(dataModel){
//         res.send(dataModel);
//     }
// })
//  router.post('/api/uploadfile/:id',async(req,res,next)=>{
//      var id = req.params.id;
//      var specific = await excelModel.findOne({testid:id});
//      if(specific){
//          res.send(specific)
//      }else{
//          res.json({
//              file: "document not found!!"
//          })
//      }
//     //  res.send("hello ids")
//  });
// // -> Import Excel File to MongoDB database
// function importExcelData2MongoDB(filePath,req){
//     // -> Read Excel File to Json Data
//     const excelData = excelToJson({
//         sourceFile: filePath,
//         sheets:[{
//             // Excel Sheet Name
//             name: 'quiz',
 
//             // Header Row -> be skipped and will not be present at our result object.
//             header:{
//                rows: 1
//             },
			
//             // Mapping columns to keys
//             columnToKey: {
//                 A: 'id',
//                 B: 'Question',
//                 C:  'A',
//                 D: 'B',
//                 E: 'C',
//                 F: 'D',
//                 G: 'E',
//                 H: 'F',
//                 I: 'G',
//                 J: 'H',
//                 K: 'Ans',
                
//             }
//         }]
//     });
 
//     // -> Log Excel Data to Console
//     console.log(excelData.quiz);
//     // saveData(excelData.Customers,req);
//     // excelData.Customers.forEach((element) => {
//     //     saveData(element,req)
//     // });

//     fs.unlinkSync(filePath);
// }
// const saveData = async(element,req)=>{
//     console.log(element)
//    var Excel = new excelModel({
//        file: element
//    });
//    var data = await Excel.save();
//    return data

// }
// module.exports  = router;