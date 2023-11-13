const db = require("../db")
class TraningDetailControllers{

    static async getForm(req,res){
        try {
            const vidios = await db('category_traning_detail')
                .join('category_traning', 'category_traning_detail.traning_id', '=', 'category_traning.id')
                .select('category_traning_detail.id','category_traning_detail.name_vidio', 'category_traning_detail.vidio')
            
                res.render('vidio/index',{vidios})
            // res.status(200).json(getAllData)
        } catch (error) {
            res.status(500).json(error)
        }
    
    }
    static async formCreate (req,res){
        const getId = await db ('category_traning').select('id','name_category_traning')
        res.render('vidio/create', {getId})
    }
    static async getAllDataDetail(req, res) {
        // res.send("masuk ke get")
        try {
            const getAllData = await db('category_traning_detail')
                .join('category_traning', 'category_traning_detail.traning_id', '=', 'category_traning.id')
                .select('category_traning.name_category_traning', 'category_traning_detail.vidio')
            
            res.status(200).json(getAllData)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    
    static async getById (req,res) {
        const detId = req.params.id
        try {
            let getStatusById;
            let getMessageById;
            const resultId = await db('category_traning_detail').where('traning_id', detId)
                .join('category_traning', 'category_traning_detail.traning_id', '=', 'category_traning.id')
                .select('category_traning_detail.id', 'category_traning.name_category_traning', 'category_traning_detail.vidio');
            if (resultId.length === 0) {
                getStatusById = 404
                getMessageById = `id ${detId} not found`
            } else {
                getStatusById = 200
                getMessageById = resultId
            }
            res.status(getStatusById).json(getMessageById)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getOneId (req,res){
        const getOne = req.params.id;
        try {
            const resultOne = await db('category_traning_detail').where('id', getOne).first()
            if (resultOne) {
                // Data ditemukan
                res.status(200).json(resultOne)
            } else {
                // Data tidak ditemukan
                res.status(404).json(`ID ${getOne} not found`)
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }      

    static async create (req,res) {
        try {
            const traning_id = req.body.traning_id
            const vidio = req.file.path
            const{name_vidio, deskripsi} = req.body
            
            // console.log(traning_id)
            const curDate = new Date()
            
            const manupulInt = parseInt(traning_id, 10);

        
            // console.log(manupulInt)
        
            const result = await db('category_traning_detail').insert({
                traning_id: manupulInt,
                name_vidio,
                vidio,
                deskripsi,
                created_at: curDate,
                updated_at: null
            }).returning('*');
        
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
        
    }
    static async edit (req,res) {
        const getIdEdit = req.params.id
        try {
            const { traning_id } = req.body

        const curDate = new Date();
        const getDetId = await db('category_traning_detail').where('id', getIdEdit).first()

        if (!getDetId) {
            res.status(404).json(`id ${getIdEdit} not found`)
        } else {
            let updatedData = {
                traning_id,
                updated_at: curDate
            };

            // Check if there's a new video file
            if (req.file) {
                const newVidio = req.file.path
                updatedData = { ...updatedData, vidio: newVidio }
            }

            await db('category_traning_detail').where('id', getIdEdit).update(updatedData)

            res.status(200).json(`Successfully updated training details with id ${getIdEdit}`)
        }
            
            
        } catch (error) {
            res.status(500).json(error)
        }


    }
    static async delete (req,res) {
        const idDelete = req.params.id;

        try {

            const result = await db('category_traning_detail').where('id', idDelete).first()
    
            if (!result) {

                res.status(404).json(`id ${idDelete} not found`)
            } else {

                await db('category_traning_detail').where('id', idDelete).del()
                res.status(200).json(`id ${idDelete} succes deleted`)
            }
        } catch (error) {

            res.status(500).json(error);
        }
    }
}
module.exports = TraningDetailControllers