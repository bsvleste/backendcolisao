const Bid = require('../models/BidModel');

module.exports = {
    async getBid(req, res) {
        return res.send({ ok: true });
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

        return res.json(listaBid);
    },
};
