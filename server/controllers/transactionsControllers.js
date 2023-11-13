const db = require ("../db")
class TransactionsControllers {
    static async formCreateById (req,res){
        const reqIdProduct = req.params.id
        const getId = await db('member_products').where('id', reqIdProduct).select('id')
        res.render('createTrans', {getId})
    }
    static async formCreate (req,res){

        res.render('transactions/create')
    }
    static async getAllData(req,res){
        try {
            const transactions = await db('transactions_member')
                .join('users', 'transactions_member.user_id', '=', 'users.id' )
                .join('member_products', 'transactions_member.product_id', '=', 'member_products.id')
                .select('transactions_member.id', 'users.name', 'member_products.name_product', 'transactions_member.date_start', 'transactions_member.date_end', 'transactions_member.status' ) 
            res.render('transactions/index', { transactions: transactions });
            // res.status(200).json(resultAll)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getByIdUser (req,res){
        const transactionUserId = req.params.id
        try {
            let getStatusByUser;
            let getMessegeByUser;
    
            const resultById = await db('transactions_member')
                .join('users', 'transactions_member.user_id', '=', 'users.id' )
                .join('member_products', 'transactions_member.product_id', '=', 'member_products.id')
                .select('transactions_member.id', 'users.name', 'member_products.name_product', 'transactions_member.date_start', 'transactions_member.date_end', 'transactions_member.prof_of_payment', 'transactions_member.status' ) 
                .where('user_id', transactionUserId)
            if (resultById.length > 0) {
                getStatusByUser = 200
                getMessegeByUser = resultById        
            }else{
                getStatusByUser = 404
                getMessegeByUser = `id ${transactionUserId} not found`
            }
            res.status(getStatusByUser).json(getMessegeByUser)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getById (req,res){
        const transactionId = req.params.id
        try {
            let getStatusByTrans;
            let getMessegeByTrans;
            const resultByIdTrans = await db('transactions_member').where('id', transactionId).first()
            if (!resultByIdTrans) {
                getStatusByTrans = 404
                getMessegeByTrans = `id ${transactionId} not found` 
            } else {
                getStatusByTrans = 200
                getMessegeByTrans = resultByIdTrans    
            }
            res.render('transactions/detail', { transaction: resultByIdTrans });
            // res.status(getStatusByTrans).json(getMessegeByTrans)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    
    static async create(req,res){

        const {user_id, product_id, date_start, prof_of_payment}= req.body
        const statusTrans = 'waiting confirmation'
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        const day = currentDate.getDate().toString().padStart(2, '0')
        
        const formattedDate = `${year}-${month}-${day}`;
        const pickDate = date_start
    
        
        try {
            let getStatusJson;
            let getMessegeJson;
        
            const checkProduct = await db('member_products').where('id', product_id).first();
            const getUser = await db('users').where('id', user_id).first();
            
            if ( !getUser) {
                getStatusJson = 404;
                getMessegeJson = `id ${user_id} not found`;
            }else if (!checkProduct) {
                getStatusJson = 404;
                getMessegeJson = "product not found";
                
            }else {
                const getDateStartVal = getUser.date_start_member;
                const getDateEndtVal = getUser.date_end_member;
                const getDuration = checkProduct.duration;
                const dateEndResult = new Date(date_start);
                const manipulDuration = parseInt(getDuration);
                dateEndResult.setDate(dateEndResult.getDate() + manipulDuration);
        
                
        
                if (pickDate <= formattedDate) {
                    getStatusJson = 400;
                    getMessegeJson = "date invalid";
                } else if (currentDate >= getDateStartVal && currentDate <= getDateEndtVal) {
                    getStatusJson = 400;
                    getMessegeJson = `user id ${user_id} is membership`;
                } else {
                    await db('transactions_member').insert({
                        user_id,
                        product_id,
                        date_start,
                        date_end: dateEndResult,
                        prof_of_payment: null,
                        status: statusTrans,
                        created_at: currentDate,
                        updated_at: null
                    });
                    getStatusJson = 201;
                    getMessegeJson = "create success";
                }
            }
            res.redirect('/')
            // res.status(getStatusJson).json({ message: getMessegeJson });
        } catch (error) {
            res.status(500).json(error);
        }
    }        
    static async updateStatus (req,res){
        const transId = req.params.id
        const getIdUpdate = await db('transactions_member').where('id', transId).first()
        // console.log(get);
        const pickStatus = getIdUpdate.status
        let getStatusUpdate;
        let getmessageUpdate;
        let dateUpdate = new Date()
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
        res.redirect('/transactions')
        // res.status(getStatusUpdate).json(getmessageUpdate)
    }
}
module.exports = TransactionsControllers