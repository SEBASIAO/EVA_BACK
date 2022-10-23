const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = new Schema({
    name : {
        type:String,
        required:true
    },
    nit: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    manager: {
        type:String,
        required:true
    },
    manager_doc_number: {
        type:String,
        required:true
    },
    manager_phone_number: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Company", Company)