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

        const {user_id, product_id, date_start, date_end, prof_of_payment}= req.body
        const statusTrans = 'waiting confirmation'
        const currentDate = new Date()
        try {
            let getStatusJson;
            let getMessegeJson;

            const checkProduct = await db ('member_product').where('id'.product_id).first()
            if (!checkProduct) {
                getStatusJson = 400
                getMessegeJson = "product not found"
              
            }else{
                await db ('transactions_member').insert({
                    user_id,
                    product_id,
                    date_start,
                    date_end,
                    prof_of_payment,
                    status: statusTrans,
                    created_at: currentDate,
                    updated_at: null
                })
                getMessegeJson = 201
                getMessegeJson = "create succes"

            }
            res.status(getMessegeJson).json({getMessegeJson})
        } catch (error) {
            
        }
    }
}
module.exports = TransactionsControllers