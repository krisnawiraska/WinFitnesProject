const express = require("express")
const routes = express.Router()

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})
module.exports = routes