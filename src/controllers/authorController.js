const AuthorModel= require("../models/authorModel")

const createAuthor= async function (req, res) {
    try{
    let author = req.body
    if (!author ||author.lenght==0)
    {
        return res.status(400).send({status:false,msg:"please enter the data in request body"})
    }
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({data: authorCreated})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}
}

// const getAuthorsData= async function (req, res) {
//     let authors = await AuthorModel.find()
//     res.send({data: authors})
// }

module.exports.createAuthor= createAuthor
// module.exports.getAuthorsData= getAuthorsData