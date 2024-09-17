import initKnex from "knex";
import configuration from '../knexfile.js';

const knex = initKnex(configuration);
const getIndoorActivities = async (req, res) => {
    const { energyLevel } = req.params;
    try {
        const indoorActivities = await knex("indoor_activities AS i")
            .select(
                "i.activity_name as indoor_activity_name",
                "i.description as indoor_activity_description"
            )
            .where(
                "energy_level_id", energyLevel
            );
        if (indoorActivities.length === 0) {
            return res.status(404).json({ message: `No indoor activities found for energy level ${energyLevel}` });
        }

        res.status(200).json(indoorActivities);
    } catch (error) {
        res.status(500).send(`Error fetching indoor activities: ${error.message}`);
    }
};

const getOutdoorActivities = async (req, res) => {
    const { energyLevel } = req.params;
    try {
        const outdoorActivities = await knex("outdoor_activities AS o")
            .select(
                "o.activity_name as outdoor_activity_name",
                "o.description as outdoor_activity_description"
            )
            .where(
                "energy_level_id", energyLevel
            );
        if (outdoorActivities.length === 0) {
            return res.status(404).json({ message: `No outdoor activities found for energy level ${energyLevel}` });
        }

        res.status(200).json(outdoorActivities);
    } catch (error) {
        res.status(500).send(`Error fetching indoor activities: ${error.message}`);
    }
}


export {
    getIndoorActivities,
    getOutdoorActivities
}
