const express = require("express")
const routes = express.Router()
const producMemberControllers = require("../controllers/productMemberControllers") 

routes.get('/', producMemberControllers.getDataProduct )

module.exports = routes