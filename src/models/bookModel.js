// try{
//     const filterQuery = {isDeleted:false}
//     const queryParams= req.query
//    const authorIdFromToken= req.authorId
  
//    const isValid = function(value){
//     if(typeof value === 'undefined'|| value === null) return false
//     if(typeof value === 'string' && value.trim().length === 0) return false
//     return true
//    }

//    const isValidObjectId=function(objectId){
//     return mongoose.Types.ObjectId.isValid(objectId)
//    }
    
//    const isValidRequestBody= function(requestBody){
//     return Object.keys(requestBody).length > 0
//    }
//     // if(!isValidObjectId(authorIdFromToken)){
//     //   res.status(400).send({status:false,message: `${authorIdFromToken} is not a valid token id`})
//     //   return
//     // }
  
//     if(!isValidRequestBody(queryParams)){
//       res.status(400).send({status:false, message:`No query params received. Aborting delete operation`})
//       return
//     }
  
//     const {authorId, category, tags, subcategory, isPublished}= queryParams

//     if(isValid(authorId) && isValidObjectId(authorId)){
//       filterQuery['authorId']= authorId
//     }

//     if(isValid(category)){
//       filterQuery['category']= category.trim()
//     }

//     if(isValid(isPublished)){
//       filterQuery['isPublished']= isPublished
//     }

//     if(isValid(tags)){
//       const tagsArr = tags.trim().split(',').map(tag => tag.trim());
//       filterQuery['tags'] = {$all: tagsArr}
//     }

//     if(isValid(subcategory)){
//       const subcatArr= subcategory.trim().split(',').map(subcat => subcat.trim());
//       filterQuery['subcategory']= {$all: subcatArr}
//     }

//     const blogs= await BlogModel.find(filterQuery);

//     if(Array.isArray(blogs) && blogs.length===0){
//       res.status(404).send({status: false, message: 'No matchin blogs found'})
//       return
//     }

//     const idOfBlogsToDelete= blogs.map(blog =>{
//       if(blog.authorId.toString()=== authorIdFromToken) return blog._id
//     })

//     if(idOfBlogsToDelete.length===0){
//       res.status(404).send({status:false,message: 'No blogs found'})
//       return
//     }

//     await BlogModel.updateMany({_id: {$in: idOfBlogsToDelete}}, {$set: {isDeleted: true}})
//     res.status(200).send({status: false, message: 'Blog(s) deleted successfully'});
//   } catch(error){
//     res.status(500).send({status: false, message: error.message});
//   }
// }

