const authorModel = require("../models/authorModel")
const blogModel= require("../models/blogModel")

const createBlog= async function (req, res) {
    let data = req.body
    let blogCreated = await blogModel.create(data)
    res.status(201).send({data: blogCreated})
}

// const getBooksData= async function (req, res) {
//     let books = await bookModel.find()
//     res.send({data: books})
// }

// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }

module.exports.createBlog= createBlog
// module.exports.getBooksData= getBooksData
// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
