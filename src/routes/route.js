const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const aController = require("../controllers/assignment.js")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)

router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts) 

router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)

router.get("/findByDistrict", aController.findByDistrict)

router.get("/findWeatherData", aController.weather)

router.get("/arrangeSortedCities", aController.sortedCities)

router.post("/memeMaker", aController.meme) 

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router; 