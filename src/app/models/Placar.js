//importa as dependencias
const mongoose = require('mongoose');
 
//schema do Placar
const PlacarSchema = new mongoose.Schema({
     
    data:{
        type:Date,
        required:true,
        createIndexs:{
            unique:true
        }

    },
    segundo:{
        type:String,
        required:true
    },
    primeiro:{
        type:String,
        requried:true
    }
});


module.exports = mongoose.model('Placar', PlacarSchema);

