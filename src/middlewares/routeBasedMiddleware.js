const jwt = require('jsonwebtoken');
const { find } = require('../models/authorModel.js');
const authorModel = require('../models/authorModel.js');
const blogModel = require('../models/blogModel.js');


//useful functions
function isName(x) {
    const type = typeof x
    if (type === "undefined" || x === null) { return false };    //name cannot be empty
    if (x.trim().length === 0) { return false }        //name cannot be only space
    if (type === "number") { return false };               //name  must contains atleast on alphabet
    if(Number(x) !== NaN){return false};               //name  must contains atleast on alphabet
    return true
}
//to validate title
function isTitle(x) {
    if (!x) { return false };
    // if(x.trim().length===0){return false};
    if (x !== "Mr" && x !== "Mrs" && x !== "Miss") { return false };
    return true
}
//to validate password
function isPassword(x) {
    if (!x) { return false };
    if (x.trim().length !== x.length) { return false }

    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(x);
}
//to validate email
function isEmail(x) {
    if (!x) { return false };
    if (x.trim().length !== x.length) { return false };

    let filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return filter.test(x);
}
async function isEmailExist() {
    const newEmail = req.body.email
    const email = await authorModel.find({ email: newEmail });
    if (email.length === 0) { return false };
    return true;
}



//validation of data before creating blog
const validateAuthor = function (req, res, next) {
    try {
        const details = req.body;
        if (!isName(details.firstName)) { return res.status(400).send({ status: false, msg: "firstName is mandatory and must includes alphabets" }) }
        if (!isName(details.lastName)) { return res.status(400).send({ status: false, msg: "lastName is mandatory and must includes alphabets" }) }
        if (!isTitle(details.title)) { return res.status(400).send({ status: false, msg: "title is mandatory and must be from:\"Mr\", \"Mrs\", \"Miss\"" }) };
        if (!isEmail(details.email)) { return res.status(400).send({ status: false, msg: "email is mandatory and it must be in the appropriate format" }) };
        if (isEmailExist(details.email)) { return res.status(400).send({ status: false, msg: "email already exists" }) }
        if (!isPassword(details.password)) { return res.status(400).send({ status: false, msg: "password is mandatory and must contain min 8 characters and must be alphanumeric, with one upper case, one lower case" }) };
        next();
    } catch (error) {
        res.status(500).send({ status: false, error: error.name, msg: error.message })
    }

}

// validating blog details coming for creating blog
const validateBlog = async function (req, res, next) {
    try {
        const details = req.body;
        if (!isName(details.title)) { return res.status(400).send({ status: false, message: "title is mandatory and must includes alphabets" }) }
        if (!isName(details.body)) { return res.status(400).send({ status: false, msg: "body is mandatory and must includes alphabets" }) };
        if (details.authorId.toString().length !== 24) { return res.status(400).send({ status: false, msg: "valid author id is required" }) };
        if (!details.tags) { return res.status(400).send({ status: false, msg: "tags are mandatory" }) };
        if (details.tags.length === 0) { return res.status(400).send({ status: false, msg: "tag must contain some elements" }) };
        if (!details.category) { return res.status(400).send({ status: false, msg: "category are mandatory" }) };
        if (details.category.length === 0) { return res.status(400).send({ status: false, msg: "category must contain some elements" }) };

        next();
    } catch (error) {
        res.status(500).send({ status: false, error: error.name, msg: error.message })
    }

}



//authentication
const checkLogin = function (req, res, next) {
    try {
        const token = req.headers["x-api-key"];    //how to auto insert separate secret key for each login?
        if (!token) { return res.status(400).send({ status: false, error: "token not sent", msg: "token is mandatory" }) } //validation1
        const decode = jwt.verify(token, "topScerect");
        next();
    } catch (error) {
        return res.status(500).send({ status: false, error: error.name, msg: error.message }) //if err.name is decode=>
    }
}

//authorisation
const checkOwner = async function (req, res, next) {
    try {
        const token = req.headers["x-api-key"];
        const blogId = req.params.blogId;
        if (!blogId) { return res.status(200).send({ status: false, msg: "enter blog Id" }) }; //validation1
        if (blogId.split("").length !== 24) { return res.status(400).send({ status: false, msg: "enter a valid id" }) } //validation2

        const blog = await blogModel.findById(blogId);
        const blogOwnerId = blog.authorId.toString();

        const decode = jwt.verify(token, "topScerect");
        const loggedInUser = decode.authorId;
        // console.log(loggedInUser);console.log(blogOwnerId); //printing only for explanation

        if (loggedInUser === blogOwnerId) {
            next(); //u r authorized to make changes in this blog
        } else {
            return res.status(403).send({ status: false, msg: "you are not authorised to make changes in this blog" }) //validation3
        }
    } catch (error) {
        return res.status(500).send({ status: false, error: error.name, msg: error.message })
    }
}

const authforQueryDelete = async function (req, res, next) {
    try {
        const token = req.headers["x-api-key"];
        const decode = jwt.verify(token, "topScerect");
        const loggedInUserId = decode.authorId;

        let authorId = req.query.authorId;
        if (authorId && authorId.split("").length !== 24) { return res.status(400).send({ status: false, msg: "enter a valid id" }) } //validation1
        if (authorId && (authorId !== loggedInUserId)) { return res.status(400).send({ status: false, msg: "you are not authorised to delete blogs of different author" }) } //val2
        if (!authorId) { authorId = loggedInUserId }; //validation3
        req.query.authorId = authorId; //updating authorId qeury by loggedInUserId value
        next();
    } catch (error) {
        return res.status(500).send({ status: false, error: error.name, msg: error.message })
    }
}


module.exports.checkLogin = checkLogin;
module.exports.checkOwner = checkOwner;
module.exports.authForQueryDelete = authforQueryDelete;
module.exports.validateAuthor = validateAuthor;
module.exports.validateBlog = validateBlog;

//must check:
//1. object id validation
//2. email & password validation your own way