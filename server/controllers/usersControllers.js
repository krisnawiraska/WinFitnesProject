const md5 = require('md5')
const db = require ("../db")
class UserControllers {
    static getForm (req,res){
        res.render('user/register')
    }
    static getLogin (req,res){
        res.render('user/login')
    }
    static async registerCust(req, res) {
        const { 
            name, 
            no_hp, 
            address, 
            email, 
            password, 
        } = req.body;
    
        try {
            // Cek apakah email sudah ada dalam database
            const existingUser = await db('users').where({ email }).first();
    
            if (existingUser) {
                // Email sudah ada, kirim respons kesalahan
                return res.status(400).json("Email sudah digunakan. Silakan gunakan email lain.");
            }
    
            // Email belum ada, lanjutkan dengan proses registrasi
            const hashedPassword = md5(password);
            const dateStart = null;
            const dateEnd = null;
            const role = "customer"; 
            const currentDate = new Date();
    
            await db('users').insert({
                name,
                no_hp,
                address,
                email,
                password: hashedPassword,
                date_start_member: dateStart, 
                date_end_member: dateEnd,  
                role,
                created_at: currentDate,
                updated_at: currentDate
            });
    
            res.redirect('/users/formlogin');
            // res.status(201).json("created Succes");
        } catch (error) {
            res.status(500).json(error);
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
            res.redirect('/')
            // res.status(responseStatus).json(responseMessage)
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
            res.redirect('/')

        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = UserControllers