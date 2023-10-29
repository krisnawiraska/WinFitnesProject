const db = require ("../db")

class ProducControllers {
    static async getAllDataProduct (req,res){
        try {
            const getAll = await db ('member_products').select('*')
            res.status(200).json(getAll)            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getDataProduct (req,res){

    }
    static async addProduct (req,res){
        const {name_product, duration, price} = req.body
        try {
            const currentDate = new Date()
            const result = await db ('member_products').insert({
                name_product,
                duration,
                price,
                created_at: currentDate,
                updated_at: currentDate
            })
            
            res.status(201).json({message: `create ${name_product} succes`})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async editDataProduct (req,res){
        const productId = req.params.id
        const { name_product, duration,  price } = req.body
        const curDateUpdate = new Date()
        let getStatus;
        let getMessage;
        try {
            const resultEdit = await db('member_products').where({ id: productId }).update({ 
                name_product, 
                duration, 
                price,
                updated_at: curDateUpdate 
            });
            if (!resultEdit) {
                getStatus=404
                getMessage=`id ${productId} not found`
                console.log(resultEdit);
            }else{
                getStatus=200
                getMessage=`update ${productId} succes`
            }
        res.status(getStatus).json(getMessage)

        }catch (error) {
            res.status(500).json(error)
        }

    }
    static async deleteProduct (req,res){
        const productId = req.params.id
        try {           
            const existingProduct = await db('member_products').where('id', productId).first()
            if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' })
            }            
            await db('member_products').where('id', productId).del()
            res.status(200).json({ message: `Product with ID ${productId} has been deleted` })
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}

module.exports = ProducControllers