import initKnex from "knex";
import configuration from '../knexfile.js';

const knex = initKnex(configuration);

const getReflectionItem = async (req, res) => {
    const { id } = req.params;
    try {
        const item = await knex("reflections AS r")
            .select(
                "r.id",
                "r.title",
                "r.body",
                "r.created_at"
            )
        if (!item) {
            return res.status(404).json({ message: `Item with ID ${id} not found` });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).send(`Error retrieving item with ID ${id}: ${error}`);
    }
};

export {
    getReflectionItem
};