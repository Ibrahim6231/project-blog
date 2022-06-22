const mongoose = require('mongoose');
//create blog model schema
const blogSchema = new mongoose.Schema( {
    blogName:
    {
        type: String, 
        required: true
    }, 
    authorId: {
            type: ObjectId,
            ref: "authorModel" 
        },
    body:{
        type: mixed,
        required: true
    },
    tags: [String],
    category: [
        type= String,
        required=true
    ],
    subCategory:[String],
    publishedAt: {type: Date,
           default: Date.now} ,
    isPublished:{
        type:Boolean,
        default:false
    },
    deletedAt: String,
    isDeleted:{
        type: Boolean,
        default:false
    },
}, { timestamps: true });

 
module.exports = mongoose.model('blogModel', blogSchema)

