const express = require('express')
const routes = express.Router()
const transactionsControllers = require("../controllers/transactionsControllers")
// const methodOverride = require('method-override');
// routes.use(methodOverride('_method'));


// routes.get('/',(req,res)=>{
//     res.send("masuk transactions")
// }) 
routes.get('/',transactionsControllers.getAllData)
routes.get('/user/:id', transactionsControllers.getByIdUser)
routes.get('/one/:id', transactionsControllers.getById)
routes.post('/create', transactionsControllers.create)

// routes.post('/create',transactionsControllers.isAuthenticated, transactionsControllers.create)

routes.patch('/updatestatus/:id', transactionsControllers.updateStatus)



module.exports = routes