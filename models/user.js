//creating user schemas
const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        }
},{
    timeStamps:true
});

const User= mongoose.models('User',userSchema);
module.exports=User;