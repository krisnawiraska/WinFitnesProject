const express = require("express")
const routes = express.Router()
const userControllers = require("../controllers/usersControllers")
const session = require('express-session');

routes.use(session({
    secret: '3232knrnj23b3or2nof', // Change this to a strong, random key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if your site uses HTTPS
}));

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