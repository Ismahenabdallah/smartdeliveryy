
const LocalisationModels = require('../models/position.Model');

const AddLocalisation = async (req, res) => {

    try {
        await LocalisationModels.create(req.body);
        res.status(200).json('ajout avec sucess ')
        console.log(req.body);
    } catch (error) {
        res.status(404).json('echec')
    }
}
/*const DeleteLocation = async (req ,res)=>{
    try {
        const data =  await locationeModel.findOneAndRemove({code: req.params.code})
        res.status(200).json({message: "deleted"})
 
     } catch (error) {
         res.status(404).json(error.message)
     }
}*/
const FindLocation = async (req, res) => {
    const { q } = req.query;
    console.log(' le code ili ena ktebto ', q)
    
    try {
        const data =  await LocalisationModels.find()
        console.log('les data',data)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.message)
        console.log('5raa ismahen')
    }

}


module.exports = {
    AddLocalisation,
    FindLocation,

}