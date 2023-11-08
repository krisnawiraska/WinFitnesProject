const express = require("express")
const routes = express.Router()
const producMemberControllers = require("../controllers/productMemberControllers") 

routes.get('/', producMemberControllers.getAllDataProduct )
// routes.get('/:id', producMemberControllers.getDataProduct)
// routes.post('/create', producMemberControllers.addProduct)
// routes.put('/edit/:id', producMemberControllers.editDataProduct)
routes.delete('/delete/:id', producMemberControllers.deleteProduct)

module.exports = routes