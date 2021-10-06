const DistancePair = require('../models/DistancePair');
const distanceService = require('../services/distanceService')

module.exports = {
    insertPair: async (req, res, next) => {
        let {source, destination, distance} = req.body;
        // Input Validation
        if(
            !(source && typeof source == 'string') ||
            !(destination && typeof destination == 'string') ||
            !(!isNaN(distance) && distance>0)
          )
            return res.status(422).json({message: "Invalid request input"});
        source = source.toLowerCase();
        destination = destination.toLowerCase();

        const query={
            $or: [
              {$and: [{source},{destination}]},
              {$and: [{source: destination},{destination: source}]}
            ]
          }
        const update = {source, destination, distance}
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};
        try {
            const distancePair = await DistancePair.findOneAndUpdate(
                query, update, options
            );
            res.status(201).json({
                source: distancePair.source,
                destination: distancePair.destination,
                hits: distancePair.hits
            });
        }
        catch (error){
            console.log(error)
            next(error)
        }
    },
    getPair: async (req, res, next) => {
        let {source, destination} = req.query;
        // Input Validation
        if(!source || !destination)
            return res.status(422).json({message: "Invalid query params"});
        source = source.toLowerCase();
        destination = destination.toLowerCase();

        const query={
            $or: [
              {$and: [{source},{destination}]},
              {$and: [{source: destination},{destination: source}]}
            ]
          };
        const update = {$inc: {hits: 1}};
        const options = {new: true};
        try {
            let distancePair = await DistancePair.findOneAndUpdate(
                query, update, options,
            );
            if(!distancePair){
                // Get from external API
                const externalDistance = await distanceService.getDistance(source, destination);
                if(!externalDistance){
                    return res.status(404).json({message: "Cannot calculate distance for that locations"})
                }
                distancePair = await DistancePair.create({
                    source,
                    destination,
                    distance: externalDistance,
                    hits: 0
                });
            }
            return res.status(200).json({
                distance: distancePair.distance
            });
        }
        catch (error){
            next(error)
        }
    }
}