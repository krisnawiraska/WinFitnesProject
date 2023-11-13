const express = require("express")
const routes = express.Router()
const userControllers = require("../controllers/usersControllers")


// routes.get('/', (req,res)=>{
//     res.send("masuk ke users")
// })

//customer
routes.get('/formregister',  userControllers.getForm)
routes.get('/formlogin',  userControllers.getLogin)


routes.post('/register', userControllers.registerCust)
routes.post('/login', userControllers.loginCust)
//admin
routes.post('/register/admin', userControllers.registerAdmin)
routes.post('/admin/login', userControllers.loginAdmin)


module.exports = routes