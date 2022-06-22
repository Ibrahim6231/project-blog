const authorModel = require("../models/authorModel")
const blogModel= require("../models/blogModel")

const createBlog= async function (req, res) {

    try{
    let blogData = req.body

    let user= await authorModel.findById(blogData.authorId)
    if (!user)
               return res.status(400).send({status:false,msg:"author id is incorrect"})

     if (blogData.isPublished) {
        blogData.publishedAt=new Date()
     }         
     if (blogData.isDeleted){
        blogData.deletedAt =new Date()
     }
     console.log(blogData)

    let blogCreated = await blogModel.create(blogData)

    return res.status(201).send({status:true,data: blogCreated})
}
   catch(error){
        return res.status(500).send({status:false,msg:error.message})
}
}

const getBlogList = async function(req, res){
    try {
        const list = await blogModel.find({isDeleted:false, isPublished:true});
        return res.status(200).send({status:true, data: list});
     } catch (error) {
        return res.status(500).send({status:false,  msg: error.message})
    }
}

   const getByQuery= async function(req,res){

       try {
            const auth = req.query.authorId
            const cat = req.query.category
            const tag = req.query.tags
            const subCat = req.query.subcategory
    
            const findQuery = await blogModel.find({$or:[{authorId:auth},{category:cat}, {tags:tag}, {subcategory: subCat}]});
    
            res.status(200).send({status:true, data: findQuery})
    
        } catch (error) {
            return res.status(500).send({status:false,  msg: error.message})
        }
   }


   const updateBlog= async function(req,res){
    let blogId=req.params.blogId
    let blog=await blogModel.findById(blogId)

          if (!blog) return res.status(400).send("id is incorrect please fill properly")
          if (blog.isDeleted) return res.status(404).send("id is incorrect ")

    let data=req.body
     if (!data) return res.status(400).send({status:false, msg:"Bad request" })
     let updateData = await blogModel.findByIdAndUpdate(blogId,data,{new:true})

     return res.status(201).send({status:true,data:updateData})


}
 
      

module.exports.createBlog= createBlog
module.exports.getBlogList=getBlogList
module.exports.updateBlog=updateBlog
module.exports.getByQuery=getByQuery
