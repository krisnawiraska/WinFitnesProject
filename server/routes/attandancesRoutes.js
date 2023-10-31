const express = require('express')
const routes = express.Router()
const attandanceControllers = require("../controllers/attandanceControllers")

routes.get('/', attandanceControllers.get)
routes.post('/add', attandanceControllers.addAttadance)

module.exports =routes