const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const blogController=require("../controllers/blogcontroller")



router.post("/createAuthor", authorController.createAuthor)
router.post('/createBlog', blogController.createBlog)

router.get('/getBlogList',blogController.getBlogList)
router.get('/getByQuery',blogController.getByQuery)


router.put('/updateBlog/:blogId', blogController.updateBlog)



module.exports = router;