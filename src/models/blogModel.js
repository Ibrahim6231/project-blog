const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const mixed = mongoose.Schema.Types.Mixed

const blogSchema = new mongoose.Schema( {
    blogName: {type: String, 
        required: true}, 
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



// //{ title: {mandatory}, 
// //body: {mandatory}, 
// authorId: {mandatory, refs to author model},
//  //tags: {array of string}, 
//  //category: {string, mandatory, examples: [technology, entertainment, life style, food, fashion]},
//   //subcategory: {array of string, examples[technology-[web development, mobile development, AI, ML etc]] },
//    createdAt,
//    updatedAt, 
//    deletedAt: {when the document is deleted},
//     isDeleted: {boolean, default: false},
//      publishedAt: {when the blog is published}, 
//      isPublished: {boolean, default: false}}