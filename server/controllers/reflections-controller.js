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
            .where(
                "r.id",
                id
            )
        if (item.length === 0) {
            return res.status(404).json({ message: `Reflection with ID ${id} not found` });
        }

        res.status(200).json(item);
    } catch (error) {
        res.status(500).send(`Error retrieving reflection with ID ${id}: ${error}`);
    }
};

const getAllReflections = async (_req, res) => {
    try {
        const data = await knex("reflections AS r")
            .select(
                "r.id",
                "r.title",
                "r.body",
                "r.created_at"
            );
        if (data.length === 0) {
            return res.status(404).json({ message: `No data found for reflections` });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(400).send(`Cannot fetch reflections: ${error}`);
    }
}

export {
    getReflectionItem,
    getAllReflections
};