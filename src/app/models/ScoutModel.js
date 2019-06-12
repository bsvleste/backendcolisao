//importa as dependencias
const mongoose = require('mongoose');
 
//schema do Jogador
const ScoutSchema = new mongoose.Schema({
    data_partida:{
        type:String,
        required:true
    },
    quadro:{
    	type:Number,
    	required:true,
    },
    scout:[
    {
    	usuario:{
        	type: mongoose.Schema.Types.ObjectId,
        	ref: 'Jogador',
        	require:true,        
    	},
    	chuteagol:{
    		type:Number,
    		required:true
    	},
    	gol:{
    		type:Number,
    		required:true
    	},
    	assistencia:{
    		type:Number,
    		required:true
    	},
    	faltascometidas:{
    		type:Number,
    		required:true
    	},
    	faltassofridas:{
    		type:Number,
    		required:true
    	},
    	desarmes:{
    		type:Number,
    		required:true
    	} 
    }
    ] 
});


module.exports = mongoose.model('Scout', ScoutSchema);

