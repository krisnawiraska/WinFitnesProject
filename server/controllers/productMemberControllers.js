const db = require ("../db")

class ProducControllers {
    static async getAllDataProduct (req,res){
        try {
            const products = await db('member_products').select('id','name_product','duration','price');
            res.render('products/index', { products: products })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getDataProduct (req,res){
        const getIdProduct = req.params.id
        const resultByIdProduct = await db('member_products').where('id', getIdProduct).first()
        if (!resultByIdProduct) {
            res.status(404).json(`id ${getIdProduct} not found`)
        }else{
            res.render('products/edit', {resultByIdProduct})
            // res.status(200).json(resultByIdProduct)
        }
    }
    static formCreate (req,res){
        res.render('products/create')
    }
    static async addProduct (req,res){
        const {name_product, duration, price} = req.body
        // console.log(duration);
        try {
            if (!name_product || !duration || !price) {
                res.status(400).json({message: `field not empty`})
                
            }else{
                const currentDate = new Date()
                const result = await db ('member_products').insert({
                    name_product,
                    duration,
                    price,
                    created_at: currentDate,
                    updated_at: currentDate
                })
                res.redirect('/products')
                // res.status(201).json({message: `create ${name_product} succes`})
            }
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

            }else if (!name_product || !duration || !price){
                getStatus=404
                getMessage=`field not empty`
            }else{
                // getStatus=200
                // getMessage=`update id ${productId} succes`
            }
            res.redirect('/products')
        // res.status(getStatus).json(getMessage)

        }catch (error) {
            res.status(500).json(error)
        }

    }
    static async deleteProduct (req,res){
        const productId = req.params.id
        console.log("productId");
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