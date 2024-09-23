import initKnex from "knex";
import configuration from '../knexfile.js';

const knex = initKnex(configuration);
const getIndoorActivities = async (req, res) => {
    const { energyLevel } = req.params;
    try {
        const indoorActivities = await knex("indoor_activities AS i")
            .select(
                "i.activity_name as indoor_activity_name",
                "i.description as indoor_activity_description",
                "i.icon as indoor_activity_icon"
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
                "o.description as outdoor_activity_description",
                "o.icon as outdoor_activity_icon"
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

const getAllActivities = async (_req, res) => {
    try {
        const data = await knex('energy_levels AS e')
            .select(
                'e.id',
                'e.level',
                'e.description',
                'i.activity_name AS indoor_activity_name',
                'i.description AS indoor_activity_description',
                'i.icon AS indoor_activity_icon',
                'o.activity_name AS outdoor_activity_name',
                'o.description AS outdoor_activity_description',
                'o.icon AS outdoor_activity_icon'
            )
            .leftJoin('indoor_activities AS i', 'i.energy_level_id', 'e.id')
            .leftJoin('outdoor_activities AS o', 'o.energy_level_id', 'e.id')
            .groupBy('e.id', 'i.id', 'o.id')
            .orderBy('i.id', 'asc')
            .orderBy('o.id', 'asc');

        if (data.length === 0) {
            return res.status(404).json({ message: `No data found for energy levels` });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Cannot fetch activities for energy levels: ${error}`);
    }
};

const getDistinctActivities = async (_req, res) => {
    try {
        const indoorActivities = await knex('indoor_activities')
            .distinct('activity_name')
            .select('activity_name', 'description', 'icon');

        const outdoorActivities = await knex('outdoor_activities')
            .distinct('activity_name')
            .select('activity_name', 'description', 'icon');

        if (!indoorActivities.length && !outdoorActivities.length) {
            return res.status(404).json({ message: 'No activities found' });
        }

        res.json({
            indoorActivities,
            outdoorActivities
        });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching distinct activities' });
    }
};

export {
    getIndoorActivities,
    getOutdoorActivities,
    getAllActivities,
    getDistinctActivities
}
