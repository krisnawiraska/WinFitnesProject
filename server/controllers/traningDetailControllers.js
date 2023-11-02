const db = require("../db")
class TraningDetailControllers{
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
        const {traning_id, vidio} = req.body
        try {
            const curDate = new Date()
            let getStatus;
            let getMessage;
            const getTraingId = await db('category_traning').where('id',traning_id).first()
            if (!vidio) {
    
                getStatus = 400
                getMessage = `fild not empty`
                
            }
            else if (!getTraingId) {
    
                getStatus = 404
                getMessage = `id ${traning_id} not found`
            }else{
                const result = await db('category_traning_detail').insert({
                    traning_id,
                    vidio,
                    created_at: curDate,
                    updated_at:null
                })
                getStatus = 200
                getMessage = 'succesesful'
                
            }
            res.status(getStatus).json(getMessage)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async edit (req,res) {
        const getIdEdit = req.params.id
        try {
            const {traning_id,vidio} = req.body
    
            // let getStatusEdit;
            // let getMessageEdit;
            const curDate = new Date()
            const getDetId = await db('category_traning_detail').where('id',getIdEdit).first()
            if (!getDetId) {
                getStatusEdit = 404
                getMessageEdit = `id ${getDetId}not found`
            }else{
                await db('category_traning_detail').update({
                    traning_id,
                    vidio,
                    created_at: curDate,
                    updated_at: curDate
                })
                getStatusEdit = 404
                getMessageEdit = `id ${getDetId}not found`
                // console.log("berhasil");
            }
            
            res.status(getStatusEdit).json(getMessageEdit)
            
            
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