const mongoose= require("mongoose");

const parentSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:Date,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});
module.exports=mongoose.model('parents',parentSchema)

