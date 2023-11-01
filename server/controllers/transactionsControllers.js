const db = require ("../db")
class TransactionsControllers {
    static async getAllData(req,res){
        let resultAll = await db('transactions_member').select("*")
        res.status(200).json(resultAll)
        console.log(resultAll);
    }

    
    static async create(req,res){

        const {user_id, product_id, date_start, prof_of_payment}= req.body
        const statusTrans = 'waiting confirmation'
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0') // Bulan dimulai dari 0, jadi perlu ditambahkan 1.
        const day = currentDate.getDate().toString().padStart(2, '0')
        
        const formattedDate = `${year}-${month}-${day}`;
        const pickDate = date_start
    
        
        try {
            
            let getStatusJson;
            let getMessegeJson;

            const checkProduct = await db ('member_products').where('id',product_id).first()
            const getDuration = checkProduct.duration
            const dateEndResult =new Date(date_start)
            const manipulDuration = parseInt(getDuration)
            dateEndResult.setDate(dateEndResult.getDate()+manipulDuration)
           
            if ( pickDate <= formattedDate) {
                getStatusJson = 400
                getMessegeJson = "date invalid"                
            }else if (!checkProduct) {
                getStatusJson = 400
                getMessegeJson = "product not found"           
                
            }else{
                await db ('transactions_member').insert({
                    user_id,
                    product_id,
                    date_start,
                    date_end:dateEndResult,
                    prof_of_payment,
                    status: statusTrans,
                    created_at: currentDate,
                    updated_at: null
                })
                getStatusJson = 201
                getMessegeJson = "create succes"

            }
            res.status(getStatusJson).json({getMessegeJson})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async updateStatus (req,res){
        let getStatusUpdate;
        let getmessageUpdate;
        let dateUpdate = new Date()
        const transId = req.params.id
        const getIdUpdate = await db('transactions_member').where('id', transId).first()
        const pickStatus = getIdUpdate.status
        if (pickStatus === "succes" ) {
            getStatusUpdate = 400
            getmessageUpdate = `id ${transId} can success`
        }else{
            await db('transactions_member').where('id' , transId).update({
                status: "succes",
                updated_at: dateUpdate
            })
            
            let getDateStart = getIdUpdate.date_start
            let getDateEnd = getIdUpdate.date_end
            const getUserToUpdate = await db('users').where('id', getIdUpdate.user_id).first()
            await db('users').where('id', getIdUpdate.user_id).update({
                date_start_member: getDateStart,
                date_end_member: getDateEnd,
                updated_at: dateUpdate
            })
            getStatusUpdate = 200
            getmessageUpdate = `id ${transId} transaction success`

        }
        res.status(getStatusUpdate).json(getmessageUpdate)
    }
}
module.exports = TransactionsControllers