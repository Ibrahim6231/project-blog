// const { isValidObjectId } = require("mongoose")
const mongoose= require('mongoose')
const BlogModel= require("../models/blogModel.js")

const createBlog= async function (req, res) {
    let author = req.body
    let authorCreated = await BlogModel.create(author)
    res.send({data: authorCreated})
}

const getBlogData= async function (req, res) {
    let authors = await BlogModel.find()
    res.send({data: authors})
}
//router.delete("/blogs/:blogId", blogController.blogs) 

const blogs = async function (req,res){
    try{ 
    let bblogId = req.params.blogId;
    let blog = await BlogModel.findById(bblogId);
    if (!blog){
      return res.status(404).send("blog not found");
    }

    let deletedBlog = await BlogModel.updateMany(blog,{$set:{isDeleted:true}});
    res.status(201).send("your account has been deleted");
  } 
  catch(err){
    res.status(500).send(err.message)
  }
   }


   const deleteQuery = async function (req,res){
    try {
     const authorId = req.query.authorId; 
     const category = req.query.category; 
     const tag = req.query.tags;     
     const subCategory = req.query.subcategory;
    
     let filters = {isDeleted:false};
     if(authorId){filters.authorId = authorId};
    if(category){filters.category = {$all: category.split(",")}};
     if(tag){filters.tags = {$all: tag.split(",")}};
   if(subCategory){filters.subCategory = {$all: subCategory.split(",")}};
    
   
   let deletedBlog = await BlogModel.updateMany({$set:{isDeleted:true}});
    res.status(201).send("your blog has been deleted");
    
    } catch (err) {
        res.status(500).send(err.message)
        }
    }
    



module.exports.createBlog= createBlog
module.exports.getBlogData= getBlogData
module.exports.blogs= blogs
module.exports.deleteQuery= deleteQuery
