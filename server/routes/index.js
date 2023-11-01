const express = require("express")
const routes = express.Router()
const userRoutes = require("../routes/userRoutes")
const transactionsRoutes = require("../routes/transactionsRoutes")

routes.get('/',(req,res)=>{
    res.send("masuk ke route main")
})

routes.use('/users', userRoutes)

routes.use('/transactions', transactionsRoutes)
module.exports = routes