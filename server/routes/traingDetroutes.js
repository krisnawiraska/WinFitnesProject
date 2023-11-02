const express = require("express")
const routes = express.Router()
const traningDetailControllers = require('../controllers/traningDetailControllers')

routes.get('/', traningDetailControllers.getAllDataDetail)
routes.get('/:id', traningDetailControllers.getById)
routes.get('/one/:id', traningDetailControllers.getOneId)
routes.delete('/delete/:id', traningDetailControllers.delete)
module.exports = routes
