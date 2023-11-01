const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)
module.exports = routes