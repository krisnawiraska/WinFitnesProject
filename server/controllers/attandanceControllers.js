const db = require ("../db")

class AttandanceControllers{
    static get (req,res){
        res.send('masuk ke att')
    }
    static async addAttadance(req,res){
        const {user_id, date_attandance} =req.body 
        try {
            const getUserId = await db ('users').where('id',user_id).first()
            let currDate = new Date()
            let getMessageAdd;
            let getStatusAdd;
            // console.log(getUserId);
            // console.log(date_attandance);
            if (getUserId.status === 'non_active') {
                getStatusAdd = 400
                getMessageAdd = `id ${user_id} is non active`
              
            } else {
                await db('attandances').insert({
                    user_id,
                    date_attandance: currDate,
                    created_at: currDate,
                    updated_at: null
    
                })
                getStatusAdd = 201
                getMessageAdd = `id ${user_id} succes attandance`
            }
            res.status(getStatusAdd).json(getMessageAdd)
            
        } catch (error) {
            
        }
    }
}
module.exports = AttandanceControllers