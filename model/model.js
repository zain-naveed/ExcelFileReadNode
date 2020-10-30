const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
let url = "mongodb://localhost:27017/excel";
var connection = mongoose.createConnection(url,{useCreateIndex:true,useUnifiedTopology:true,useNewUrlParser:true, useFindAndModify: false });
autoIncrement.initialize(connection);
// const UniqueFile = new mongoose.Schema({
//     id: Number,
//     A: String,
//     B: String,
//     C: String,
//     D: String,
//     E: String,
//     F: String,
//     G: String,
//     H: String,
//     Ans: {
//         type: String,
//         // required: true
//     },
// });
const values = new mongoose.Schema({
    option: Boolean
})
const excelSchema  = new mongoose.Schema({
    
    // testid:{
    //     type: Number,
    //     // unique:true,
    //     default: 1
    // },
    Question: [{
        type: String,
        
    },{
    option:[values]
    }
],
    
});
excelSchema.plugin(autoIncrement.plugin,{
    model: 'Excel',
    field: 'testid',
    startAt: 100,
    incrementBy: 100
});
module.exports = mongoose.model('Excel',excelSchema);