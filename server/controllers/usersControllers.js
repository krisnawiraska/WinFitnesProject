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
}
module.exports = UserControllers