const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")
const attandanceRoutes = require('../routes/attandancesRoutes');

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)
routes.use('/attandance', attandanceRoutes)
module.exports = routes