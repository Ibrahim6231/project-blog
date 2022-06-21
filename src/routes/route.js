const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController")
const blogController= require("../controllers/blogController")



router.post("/createAuthor", authorController.createAuthor)

router.get("/getAuthorsData", authorController.getAuthorsData) 

router.post("/createBlog", blogController.createBlog)

router.get("/getBlogData", blogController.getBlogData)

router.delete("/blogs/:blogId", blogController.blogs) 




module.exports = router; 