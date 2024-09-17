import initKnex from "knex";
import configuration from '../knexfile.js';

const knex = initKnex(configuration);
const getELevelsList = async (_req, res) => {
    try {
        const data = await knex("energy_levels AS e")
            .select(
                "e.id",
                "e.level",
                "e.description",
                "b.verse_text",
                "b.reference",
                "b.bible_version",
                "i.activity_name as indoor_activity_name",
                "i.description as indoor_activity_description",
                "o.activity_name as outdoor_activity_name",
                "o.description as outdoor_activity_description"
            )
            .join(
                "bible_verses AS b",
                "b.energy_level_id",
                "e.id"
            )
            .join(
                "indoor_activities AS i",
                "i.energy_level_id",
                "e.id"
            )
            .join(
                "outdoor_activities AS o",
                "o.energy_level_id",
                "e.id"
            );
        if (data.length === 0) {
            return res.status(404).json({ message: `No data found for energy list` });
        };

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Cannot fetch data for energy levels list: ${error}`);
    }
};

const getELevelItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await knex("energy_levels AS e")
            .select(
                "e.id",
                "e.level",
                "e.description",
                "b.verse_text",
                "b.reference",
                "b.bible_version",
                "i.activity_name as indoor_activity_name",
                "i.description as indoor_activity_description",
                "o.activity_name as outdoor_activity_name",
                "o.description as outdoor_activity_description"
            )
            .join(
                "bible_verses AS b",
                "b.energy_level_id",
                "e.id"
            )
            .join(
                "indoor_activities AS i",
                "i.energy_level_id",
                "e.id"
            )
            .join(
                "outdoor_activities AS o",
                "o.energy_level_id",
                "e.id"
            )
            .where(
                "e.id",
                id
            )
            .first();
        if (!item) {
            return res.status(404).json({ message: `Item with ID ${id} not found` });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).send(`Error retrieving item with ID ${id}: ${error}`);
    }
};

export {
    getELevelsList,
    getELevelItem
};
