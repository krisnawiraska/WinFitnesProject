const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")

const trainingRoutes = require("../routes/trainingRoutes")
const trainingRoutesDet = require("../routes/traingDetroutes")

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)
routes.use('/tranings', trainingRoutes)
routes.use('/det', trainingRoutesDet)
module.exports = routes