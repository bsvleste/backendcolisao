const mongoose = require ('mongoose');

//schema mensalidade

const TesteSchema = new mongoose.Schema({
    descricao:String,     
    
    jogador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
        require:   true,
        
    },
    
})

module.exports = mongoose.model('Teste ', TesteSchema);
