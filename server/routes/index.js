const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")
const productMemberRoutes = require("../routes/productmemberRoutes")

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)
routes.use('/products', productMemberRoutes)
module.exports = routes