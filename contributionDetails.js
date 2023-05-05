const mongoose = require("mongoose");

const ContributionDetailSchema = new mongoose.Schema({
  
    contribution_type: String,
    body: String,
    email: String,
    userName: String,
    userFName:String,
    userLName:String,
    community_points:{type:Number,default:0},
    
}, {
    collection : "Contribution"
});

mongoose.model("Contribution", ContributionDetailSchema);