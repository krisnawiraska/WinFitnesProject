const db = require("../db")
class TraningControllers {
    static async getAllData (req,res){
        try {
            const allData = await db('category_traning').select('*')
            res.status(200).json(allData)
        } catch (error) {
            res.status(500).json(error)
        }
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
            res.status(getStatusCreate).json(getMessegeCreate)
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
            res.status(getStatusEdit).json(getMessegeEdit)

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