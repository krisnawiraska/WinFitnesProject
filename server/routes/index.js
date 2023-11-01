const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")
const productMemberRoutes = require("../routes/productmemberRoutes")
const attRoutes = require("../routes/attandancesRoutes")

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)

routes.use('/products', productMemberRoutes)
routes.use('/attandance', attRoutes)
module.exports = routes