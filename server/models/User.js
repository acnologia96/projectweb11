const mongoose = require("mongoose");
const {ObjectId}=mongoose.Schema
const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, require: true },
    lastname: { type: String, require: true },
    username: { type: String, require: true   },
    password: { type: String, require: true },
    birthday: { type: Date, require: true },
    gender: { type: String, require: true },
    tel: { type:String, require: true },
    email: { type: String, require: true },
    enabled:{ type: Boolean, default: true },
    address: {
      firstname: { type: String, require: true },
      lastname: { type: String, require: true },
      tel: { type:String, require: true },
      houseNo:{type:String ,require: true},
      villageNo:{type:String ,},
      subDistrict:{type:String ,require: true},
      subArea:{type:String ,require: true},
      area:{type:String ,require: true},
      postalCode:{type:Number ,require: true},
      
    },
    
    role:{type:String ,default:'user'},
    wishlist:[{
      type:ObjectId,
      ref:'product'
    }]
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("users", UserSchema);
