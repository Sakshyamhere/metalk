import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
fullname : {
    type:String,
    require:true
},
email : {
    type:String,
    require:true,
    unique:true
},
password : {
    type:String,
    require: true,
},
phonenumber : {
    type:String,
    required:true,
},
image : {
    data : Buffer,
    type : String
},
bio : {
    type: String
}
});

export default  mongoose.models.User || mongoose.model("User", userSchema);