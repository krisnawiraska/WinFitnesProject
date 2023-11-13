const express = require("express")
const routes = express.Router()
const producMemberControllers = require("../controllers/productMemberControllers") 

routes.get('/', producMemberControllers.getAllDataProduct )

routes.get('/formcreate', producMemberControllers.formCreate)
routes.post('/create', producMemberControllers.addProduct)

// routes.get('one/:id', producMemberControllers.getDataProduct)

routes.get('/one/:id' , producMemberControllers.getDataProduct)

routes.post('/edit/:id', producMemberControllers.editDataProduct)
routes.delete('/delete/:id', producMemberControllers.deleteProduct)

module.exports = routes