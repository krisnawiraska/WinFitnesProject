const md5 = require('md5')
const db = require ("../db")
class UserControllers {
    static async registerCust (req,res) {
        const { 
            name, 
            no_hp, 
            address, 
            email, 
            password, 
        } = req.body
        try {
            const hasedPassword = md5(password)
            const dateStart = null
            const dateEnd = null
            const status = "non_active"
            const role = "customer" 
            const currentDate = new Date()
        
            await db('users').insert({
                name,
                no_hp,
                address,
                email,
                password: hasedPassword,
                date_start_member: dateStart, 
                date_end_member: dateEnd,  
                status: status, 
                role: role,
                created_at: currentDate,
                updated_at: currentDate
            })
                    
            res.status(201).json("created Succes")            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async registerAdmin (req,res) {
        const { 
            name, 
            no_hp, 
            address, 
            email, 
            password, 
        } = req.body
        try {
            const hasedPassword = md5(password)
            const dateStart = null
            const dateEnd = null
            const status = "active"
            const role = "admin" 
            const currentDate = new Date()
        
            await db('users').insert({
                name,
                no_hp,
                address,
                email,
                password: hasedPassword,
                date_start_member: dateStart, 
                date_end_member: dateEnd,  
                status: status, 
                role: role,
                created_at: currentDate,
                updated_at: currentDate
            })
                    
            res.status(201).json("created Succes")            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async loginCust (req,res){
        const {email, password} = req.body
        try {
            const loginUSer = await db ('users').where({email, role: 'customer'}).first()
            const hashPassword = md5(password)
            let responseStatus;
            let responseMessage;
            if (!loginUSer) {
                responseStatus = 404
                responseMessage = "Account not found"                
            } else if (loginUSer.password !== hashPassword) {
                responseStatus = 401
                responseMessage = "password wrong"                       
            }else {
                responseStatus = 200
                responseMessage = `welcome ${email}`                               
            }
            res.status(responseStatus).json(responseMessage)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async loginAdmin (req,res){
        const {email, password} = req.body
        try {
            const loginUSer = await db ('users').where({email, role: 'admin'}).first()
            const hashPassword = md5(password)
            let responseStatus;
            let responseMessage;
            if (!loginUSer) {
                responseStatus = 404
                responseMessage = "Account not found"                
            } else if (loginUSer.password !== hashPassword) {
                responseStatus = 401
                responseMessage = "password wrong"                       
            }else {
                responseStatus = 200
                responseMessage = `welcome ${email}`                               
            }
            res.status(responseStatus).json(responseMessage)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = UserControllers