let axios = require("axios")

let findByDistrict = async function (req, res) {
    try {
        let dc = req.query.district_id
        let date = req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${dc}&date=${date}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}



 let weather = async function (req, res) {
    try {
       let dc = req.query.lc
        let appid = req.query.appid;
       
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${dc}&appid=${appid}`
        }
        let result = await axios(options)
        res.status(200).send({ msg: result.data.main.temp })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message }) 
    }
}


let sortedCities = async function(req,res){
    try{
            let cities = ["Bangalore","Mumbai","Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let cityObjArray = []
    
        for (i = 0; i < cities.length; i++){
            let obj = { city: cities[i] }
            
            let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=ead5c4c1808019eaf08425a491a00906`) 
            console.log(resp.data.main.temp)
    
            obj.temp = resp.data.main.temp
            cityObjArray.push(obj)
        }
    
        let sorted = cityObjArray.sort( function(a, b){ return a.temp - b.temp})
    
        console.log(sorted)
        
         res.status(200).send({status: true, data: sorted})
    }catch(error) {
       console.log(error)
        res.status(500).send({status: false, msg:"server error"})
    } 
}
    


let meme = async function (req, res) {
    try {
        let dc = req.query.template_id
        let text = req.query.text0
        let pass = req.query.password
        let user = req.query.username
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${dc}&text0=${text}&username=${user}&password=${pass}`
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data})
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
} 

module.exports.findByDistrict= findByDistrict
module.exports.weather= weather
module.exports.sortedCities = sortedCities
module.exports.meme= meme