const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")
const productMemberRoutes = require("../routes/productmemberRoutes")
const attRoutes = require("../routes/attandancesRoutes")
const transactionsRoutes = require("../routes/transactionsRoutes")
const trainingRoutes = require("../routes/trainingRoutes")
const trainingRoutesDet = require("../routes/traingDetroutes")

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)
routes.use('/transactions', transactionsRoutes)
routes.use('/products', productMemberRoutes)
routes.use('/attandance', attRoutes)
routes.use('/tranings', trainingRoutes)
routes.use('/det', trainingRoutesDet)
module.exports = routes