// // Import
// let mongoose = require('mongoose');

// // Create a model class
// let userModel = mongoose.Schema(
//     {
//         username: String,
//         email: String,
//         BirthDate: Date,
//         contact_number: Number
//     },
//     {
//         collection: "user"
//     }
// );

// module.exports = mongoose.model("User", userModel );


const mongoose = require("mongoose");
//const passportLocalMongoose = require('passport-local-mongoose');
//const { options } = require("../routes");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


//let option =({missingPasswordError: "Wrong/Missing the Passowrd"});

//UserSchema.plugin(passportLocalMongoose,option);
const User = mongoose.model("User", UserSchema);

module.exports = User;