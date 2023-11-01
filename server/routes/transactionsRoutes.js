const express = require('express')
const routes = express.Router()
const transactionsControllers = require("../controllers/transactionsControllers")

// routes.get('/',(req,res)=>{
//     res.send("masuk transactions")
// }) 
routes.get('/',transactionsControllers.getAllData)
routes.post('/create', transactionsControllers.create)

// routes.post('/create',transactionsControllers.isAuthenticated, transactionsControllers.create)

routes.patch('/updatestatus/:id', transactionsControllers.updateStatus)


module.exports = routes