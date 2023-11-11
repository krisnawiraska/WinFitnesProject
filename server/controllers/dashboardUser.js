const db = require ("../db")
class Dashboard{
    static async getHome(req,res){
        const products = await db ('member_products').select('name_product','duration', 'price')
        const categori = await db ('category_traning').select('name_category_traning')
        res.render('WelcomeUser' , {products, categori})
    }
}
module.exports = Dashboard