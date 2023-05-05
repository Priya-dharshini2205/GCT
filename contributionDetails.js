const mongoose = require("mongoose");

const ContributionDetailSchema = new mongoose.Schema({
  
    contribution_type: String,
    body: String,
    email: String,
    community_points:{type:Number,default:0},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"UserInfo"
    }
}, {
    collection : "Contribution"
});

mongoose.model("Contribution", ContributionDetailSchema);