const express = require("express")
const routes = express.Router()
const userControllers = require("../controllers/usersControllers")

routes.get('/', (req,res)=>{
    res.send("masuk ke users")
})

routes.post('/register', userControllers.registerCust)


module.exports = routes