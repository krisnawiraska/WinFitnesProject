const db = require ("../db")

class AttandanceControllers{
    static get (req,res){
        res.send('masuk ke att')
    }
    static async addAttadance(req,res){
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
            if (formattedDate <= formattedDateStart && formattedDate >= formattedDateEnd) {
                await db('attandances').insert({
                    user_id,
                    date_attandance: currentDate,
                    created_at: currentDate,
                    updated_at: null
    
                })
                getStatusAdd = 201
                getMessageAdd = `id ${user_id} succes attandance`
                
            } else {
                getStatusAdd = 400
                getMessageAdd = `id ${user_id} is non active`
            }
            res.status(getStatusAdd).json(getMessageAdd)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = AttandanceControllers