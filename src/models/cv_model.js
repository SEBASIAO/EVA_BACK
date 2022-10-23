const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurriculumVitae = new Schema({
    name : {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    doc_type: {
        type:String,
        required:true
    },
    doc_number: {
        type:Number,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    born_date: {
        type:String,
        required:true
    },
    profession: {
        type:String,
        required:true
    },
    education_level: {
        type:String,
        required:true
    },
    state: {
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    health_care: {
        type:String,
        required:true
    },
    pension_fund: {
        type:String,
        required:true
    },
    marital_status: {
        type:String,
        required:true
    },
    available: {
        type:Boolean,
        required:false,
        default : true
    },
    additional_info : {
        type:String,
        required:false
    },
    assigned_company : {
        type : Schema.Types.ObjectId,
        required : false,
        ref : "Company"
    }
})

module.exports = mongoose.model("CurriculumVitae", CurriculumVitae)