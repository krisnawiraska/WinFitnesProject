const db = require ("../db")
class TransactionsControllers {
    static async getAllData(req,res){
        let resultAll = await db('transactions_member').select("*")
        res.status(200).json(resultAll)
        console.log(resultAll);
    }
    // static isAuthenticated(req, res, next) {
    //     if (req.users) {
    //         next();
    //     } else {
    //       // Pengguna belum login
    //         res.status(403).json({ message: "Forbidden: User must be logged in" });
    //     }
    // }
    
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
}
module.exports = TransactionsControllers