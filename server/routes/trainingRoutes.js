const express = require('express')
const routes = express.Router()
const traningControllers = require('../controllers/traningControllers')


// routes.get('/', (req,res)=>{
//     res.send("masuk ke training")
// })

routes.get('/', traningControllers.getAllData)
// routes.get('one/:id', traningControllers.getById)

routes.get('/formcreate', traningControllers.formCreate)
routes.post('/create', traningControllers.create)
routes.get('/one/:id', traningControllers.getById)
routes.post('/edit/:id', traningControllers.edit)
routes.delete('/delete/:id', traningControllers.delete)

// routes detail

// routes.get('/detail', traningDetailControllers.getAllDataDetail)
// routes.get('/det', (req,res)=>{
//     res.send("masuk ke detail")
// })
// routes.get('/detail/:id', traningDetailControllers.getById)
// routes.post('/detail/create', traningDetailControllers.create)
// routes.put('/detail/edit/:id', traningDetailControllers.edit)

module.exports = routes