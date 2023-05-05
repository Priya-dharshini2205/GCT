const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    points: {type:Number,default:0},
    contributions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Contribution"
    }
    ]
}, {
    collection : "UserInfo"
});

mongoose.model("UserInfo", UserDetailSchema);