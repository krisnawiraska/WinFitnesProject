const db = require ("../db")
class Dashboard{
    static async getHome(req,res){
        const products = await db ('member_products').select('id','name_product','duration', 'price')
        const categori = await db ('category_traning').select('id','name_category_traning')
        res.render('WelcomeUser' , {products, categori})
    }
    static async getVidio(req,res){
        const categoryId = req.params.id;
        const vidio = await db('category_traning_detail')
            .where('traning_id', categoryId)
            .join('category_traning', 'category_traning_detail.traning_id', '=', 'category_traning.id')
            .select('category_traning_detail.id', 'category_traning.name_category_traning', 'category_traning_detail.name_vidio', 'category_traning_detail.vidio', 'category_traning_detail.deskripsi');

        res.render('vidio/vidioCatalog', { vidio });

        // res.render('vidio/vidioCatalog');
    }
    static admin (req,res){
        res.render('index');
    }
}
module.exports = Dashboard