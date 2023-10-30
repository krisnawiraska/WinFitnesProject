const express = require('express')
const routes = express.Router()
const traningControllers = require('../controllers/traningControllers')

// routes.get('/', (req,res)=>{
//     res.send("masuk ke training")
// })

routes.get('/', traningControllers.getAllData)
routes.post('/create', traningControllers.create)
routes.patch('/edit/:id', traningControllers.edit)
routes.delete('/delete/:id', traningControllers.delete)
module.exports = routes