//how the table should be
const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    name: {type:String},
    phone: {type:Number},
    email:{type: String, required: true},
    password:{type:String,required:true},
    status:{type:String,default:"Active"},
    address:{type:String}
});

module.exports = mongoose.model("UserModel",userSchema) //importing it to monogdb,table name=UserModel//
