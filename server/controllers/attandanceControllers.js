const db = require ("../db")

class AttandanceControllers{
    static async get (req,res){
        try {
            const result =await db('attandances')
                .join('users','attandances.user_id','=','users.id')
                .select('attandances.id', 'users.name', 'attandances.date_attandance')
            
            res.status(200).json(result)
            
        } catch (error) {
            res.status(500).json(error)
        }

    }
    static async getById (req,res){
        const attId = req.params.id
        try {
            let getStatusById;
            let getMessageById;
            const resultId = await db('attandances').where('user_id', attId).join('users','attandances.user_id','=','users.id')
            .select('attandances.id', 'users.name', 'attandances.date_attandance')
            if(resultId.length === 0){
                getStatusById = 404
                getMessageById =`id ${attId} not found`
            }else{
                getStatusById = 200
                getMessageById = resultId
                
            }
            res.status(getStatusById).json(getMessageById)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async checkMembership (req,res,next){
        const {user_id} =req.body 

        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Bulan dimulai dari 0, jadi perlu ditambahkan 1.
        const day = currentDate.getDate().toString().padStart(2, '0')
        
        const formattedDate = `${year}-${month}-${day}`

            try {
            const getUserId = await db ('users').where('id',user_id).first()
            const getDateStartMember = getUserId.date_start_member
            const yearStart = getDateStartMember.getFullYear()
            const monthStart = (getDateStartMember.getMonth() + 1).toString().padStart(2, '0') // Bulan dimulai dari 0, jadi perlu ditambahkan 1.
            const dayStart  = getDateStartMember.getDate().toString().padStart(2, '0')
            const formattedDateStart = `${yearStart}-${monthStart}-${dayStart}`

            const getDateEnd = getUserId.date_end_member
            const yearEnd = getDateEnd.getFullYear()
            const monthEnd = (getDateEnd.getMonth() + 1).toString().padStart(2, '0') // Bulan dimulai dari 0, jadi perlu ditambahkan 1.
            const dayEnd  = getDateEnd.getDate().toString().padStart(2, '0')
            const formattedDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}`
            
            // console.log(formattedDateStart, formattedDateEnd);
            let getMessageAdd;
            let getStatusAdd;
            // console.log(getUserId);
            // console.log(date_attandance);
            if (formattedDate >= formattedDateStart && formattedDate <= formattedDateEnd) {
                next()
              
            } else {
                res.status(400).json(`id ${user_id} is non active`)
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async addAttadance(req,res){
        const {user_id} =req.body 

        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Bulan dimulai dari 0, jadi perlu ditambahkan 1.
        const day = currentDate.getDate().toString().padStart(2, '0')
        
        const formattedDate = `${year}-${month}-${day}`

            try {
                   
                await db('attandances').insert({
                    user_id,
                    date_attandance: formattedDate,
                    created_at: currentDate,
                    updated_at: null
    
                })
                
            res.status(201).json(`id ${user_id} succes attandance`)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = AttandanceControllers