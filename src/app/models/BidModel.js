//importa as dependencias
const mongoose = require('mongoose');
 
//schema do Jogador
const BidSchema = new mongoose.Schema({
    bid:{
        type:String,
        required:true
    },
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
        require:true,        
    }    
});


module.exports = mongoose.model('BidModel', BidSchema);

