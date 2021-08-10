const Bid = require('../models/BidModel');

module.exports = {
    async delete(req, res) {
        try {
            await Bid.find({}).deleteMany();
            return res.json({ message: 'Bid deletado com sucesso' });
        } catch (err) {
            return res.json({
                message: 'erro ao deletar placar',
                error: `${err}`,
            });
        }
    },
    async getBid(req, res) {
        const listaBid = await Bid.find({}).populate('usuario').sort('bid');
        const checkBid = await Bid.aggregate([
            {
                $group: {
                    _id: '$bid',
                    count: { $sum: 1 },
                },
            },
        ]);
        req.io.emit('contagem', checkBid);
        return res.json(listaBid);
    },
    async addBid(req, res) {
        const { bid } = req.body;
        const saveData = {
            bid,
            usuario: req.userId,
        };
        await Bid.findOneAndUpdate({ usuario: saveData.usuario }, saveData, {
            upsert: true,
        });
        const listaBid = await Bid.find({}).populate('usuario').sort('bid');
        const checkBid = await Bid.aggregate([
            {
                $group: {
                    _id: '$bid',
                    count: { $sum: 1 },
                },
            },
        ]);
        req.io.emit('contagem', checkBid);

        req.io.emit('bid', listaBid);

        return res.json(checkBid);
    },
};
