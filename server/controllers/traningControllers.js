const db = require("../db")
class TraningControllers {
    static async getAllData (req,res){
        try {
            const traning = await db('category_traning').select('*')
            res.render('categori/index', { traning: traning });
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getById(req,res){
        const getIdTraning = req.params.id

        try {
            const resultById = await db('category_traning').where('id', getIdTraning).first()
            if (!resultById) {
                res.status(404).json({message : `id ${getIdTraning} not found`})
            }else{
                res.render('categori/edit', {resultById})
                // res.status(200).json(resultById)
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static formCreate (req,res){
        res.render('categori/create')
    }
    static async create (req,res){
        const {name_category_traning } = req.body
        const curDate = new Date()
        try {
            let getStatusCreate;
            let getMessegeCreate;
            if (!name_category_traning) {
                getStatusCreate = 400
                getMessegeCreate = "field name category traning is empty"
            } else {
                await db ('category_traning').insert({
                    name_category_traning,
                    created_at: curDate,
                    updated_at:null
                })
                getStatusCreate = 201
                getMessegeCreate = `created ${name_category_traning} succes`
            }
            res.redirect('/tranings')
            // res.status(getStatusCreate).json(getMessegeCreate)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async edit (req,res){
        const traning_id = req.params.id
        const {name_category_traning } = req.body
        const curDate = new Date()
        try {
            let getStatusEdit;
            let getMessegeEdit;
            if (!name_category_traning) {
                getStatusEdit = 400
                getMessegeEdit = "field name category traning is empty"
            } else {
                await db('category_traning').where({id:traning_id}).first().update({
                    name_category_traning,
                    updated_at:curDate
                })
                getStatusEdit = 201
                getMessegeEdit = `update id ${traning_id} success`              
            }
            res.redirect('/tranings')
            // res.status(getStatusEdit).json(getMessegeEdit)

        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async delete (req,res){
        const category_traing_id = req.params.id
        let getStatusDelete;
        let getMessegeDelete;
        try {
            const checkid = await db('category_traning').where({id:category_traing_id}).first()
            if (!checkid) {
                getStatusDelete = 404
                getMessegeDelete = `id ${category_traing_id} not found`
                
            } else {
                await db('category_traning').where({id:category_traing_id}).del()
                getStatusDelete = 200
                getMessegeDelete = `id ${category_traing_id} is deleted`
            }
            res.status(getStatusDelete).json(getMessegeDelete)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
module.exports = TraningControllers