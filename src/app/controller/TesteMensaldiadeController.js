const TesteMensalidade = require('../models/TesteMensalidade');
const Jogador = require('../models/Jogador');

module.exports = {
    async getMensalidades(req, res) {
        try {
            const listaMensalidade = await TesteMensalidade.find(
                {
                    _id: req.body.jogador,
                },
                {
                    mensalidade: { $elemMatch: { mes: req.body.mes } },
                }
            )
                .populate('jogador')
                .sort('_id');

            return res.json(listaMensalidade);
        } catch (err) {
            res.status(404).json({
                status: 'fail',
                message: `${err}`,
            });
        }
    },
}; /*const listaJogador = await Jogador.find({},{email:0,senha:0,isAdm:0,__v:0});
/* router.get('/', async (req, res) => {
    const listaMensalidade = await TesteMensalidade.find(
        {
            _id: req.body.jogador,
        },
        {
            mensalidade: { $elemMatch: { mes: req.body.mes } },
        }
    )
        .populate('jogador')
        .sort('_id');

    return res.json(listaMensalidade);
});
router.post('/create', async (req, res) => {
    try {
        const { _id, jogador, mensalidade } = req.body;

        const userDataSalve = {
            _id,
            jogador,
            mensalidade,
        };
        const criaMensalidade = await TesteMensalidade.create(userDataSalve);
        return res.send({ criaMensalidade });
    } catch (err) {
        res.send({ message: 'não foi possivel cadastrar', err: `${err}` });
    }

 */
/* const nome = listaJogador;
var meses = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
];
var mes = [];
for (var i = 0; i < meses.length; i++) {
    for (var jogadores of nome) {
        mes.push({ descricao: meses[i], mensalidade: [] });
        mes[i].mensalidade.push({ valor: 50, status: 'pendente' });
    }
}
//console.log(mes);
const criaMensalidade = await Teste.create(mes); */
//avisa que novo tweet foi criado
//req.io.emit('jogador',criaJogador);*/
/* });
router.post('/update', async (req, res) => {
    const { jogador, mes, status, valor } = req.body;
    console.log(jogador);
    /* findOne(
        { _id: id },
        { awards: { $elemMatch: { award: 'Turing Award', year: 1977 } } }
    ); */
/* const updateJogador = await TesteMensalidade.updateOne(
        { _id: jogador, 'mensalidade.mes': 2 },
        {
            $set: {
                'mensalidade.$.status': 'pago',
                'mensalidade.$.valor': 80,
            },
        }
    );

});
return res.send({ updateJogador }); */
