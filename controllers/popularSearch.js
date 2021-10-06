const DistancePair = require('../models/DistancePair');

module.exports = {
    getPopularSearch: async (req, res, next) => {
        try {
            const pairWithMaxHits = await DistancePair.find().sort({hits:-1}).limit(1);
            if(!pairWithMaxHits.length)
                res.status(404).json({
                    message: 'Not found any distance pairs'
                })
            else
                res.status(200).json({
                    source:pairWithMaxHits[0].source,
                    destination:pairWithMaxHits[0].destination,
                    hits: pairWithMaxHits[0].hits
                })
        }
        catch (error){
            next(error)
        }
    }
}