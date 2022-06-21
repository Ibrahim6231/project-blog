const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema( {
    
    
    title: {type:String,required:true},
    body: {type:String,required:true},
    authorId:  {
        type: ObjectId,
        ref: "Author",
        required:true
    },
     tags: [{type:String}], 

     category:
       {type:String, required:true, 
        enum: ["technology", "entertainment", "life style", "food", "fashion"]},
     subcategory: [String] ,

     publishedAt:{type:Date, },

     isPublished: {type:Boolean, default: false},

     isDeleted: {type:Boolean, default: false},

     isDeletedAt:{type:Date}

}, { timestamps: true });


module.exports = mongoose.model('Blog', blogSchema)
