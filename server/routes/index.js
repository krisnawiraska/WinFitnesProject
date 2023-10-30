const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")

const trainingRoutes = require("../routes/trainingRoutes")

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)
routes.use('/tranings', trainingRoutes)
module.exports = routes