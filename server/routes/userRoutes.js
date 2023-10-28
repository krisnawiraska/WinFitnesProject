const express = require("express")
const routes = express.Router()

routes.get('/', (req,res)=>{
    res.send("masuk ke users")
})


module.exports = routes