const Bid = require('../models/BidModel');
const StatusBid = require('../models/StatusBidModel');

module.exports = {
    async liberaBid(req, res) {
        await StatusBid.findOneAndUpdate(
            {},
            { status: true },
            { upsert: true }
        );
        const listStatus = await StatusBid.find({});
        const { status } = listStatus[0];
        req.io.emit('listStatus', status);
        return res.json(status);
    },
    async getStatus(req, res) {
        const listStatus = await StatusBid.find({});
        const { status } = listStatus[0];
        return res.json({ status });
    },
    async delete(req, res) {
        try {
            const listaBid = await Bid.find({})
                .populate('usuario')
                .populate('status')
                .sort('bid');
            const alterStatus = listaBid[0].status._id;

            await Bid.find({}).deleteMany();
            await StatusBid.findOneAndUpdate(
                { _id: alterStatus },
                { status: false }
            );
            const listStatus = await StatusBid.find({});
            const { status } = listStatus[0];
            const bidDeletado = await Bid.find({});
            const bidUpdate = {
                bidDeletado,
                status,
            };
            req.io.emit('deletaBid', bidDeletado);
            req.io.emit('listStatus', status);
            return res.json({
                message: 'Bid deletado com sucesso',
                bidUpdate,
            });
        } catch (err) {
            return res.json({
                message: 'erro ao deletar bid',
                error: `${err}`,
            });
        }
    },

    async getBid(req, res) {
        const checkBid = await StatusBid.find({});
        if (!checkBid[0].status) {
            return res.json({ message: 'Bid negado' });
        }
        const listaBid = await Bid.find({})
            .populate('usuario')
            .populate('status')
            .sort('bid');
        const countBid = await Bid.aggregate([
            {
                $group: {
                    _id: '$bid',
                    count: { $sum: 1 },
                },
            },
        ]);
        req.io.emit('contagem', countBid);

        return res.json(listaBid);
    },
    async addBid(req, res) {
        const checkBid = await StatusBid.find({});
        if (!checkBid[0].status) {
            return res.json({ message: 'Bid negado' });
        }
        const idStatus = checkBid[0]._id;
        const { bid } = req.body;
        const saveData = {
            bid,
            usuario: req.userId,
            status: idStatus,
        };

        await Bid.findOneAndUpdate({ usuario: saveData.usuario }, saveData, {
            upsert: true,
        });
        const listaBid = await Bid.find({})
            .populate('usuario')
            .populate('status')
            .sort('bid');
        const contBid = await Bid.aggregate([
            {
                $group: {
                    _id: '$bid',
                    count: { $sum: 1 },
                },
            },
        ]);
        req.io.emit('contagem', contBid);

        req.io.emit('bid', listaBid);

        return res.json(listaBid);
    },
};
