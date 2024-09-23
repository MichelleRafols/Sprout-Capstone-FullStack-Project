import initKnex from "knex";
import configuration from '../knexfile.js';
import { validationResult } from 'express-validator';

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
            .first(); 

        if (!item) {
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
};

const addReflection = async (req, res) => {
    console.log("Request Body:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ message: 'Title and body are required' });
    }

    const created_at = new Date();

    try {
        const [newReflectionId] = await knex('reflections')
            .insert({
                title,
                body,
                created_at
            });

        res.status(201).json({
            id: newReflectionId,
            title,
            body,
            created_at
        })
    } catch (error) {
        console.error('Error creating reflection:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

const editReflection = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(400).json({ message: 'Title and body are required for updating the reflection' });
    }

    try {
        const updatedRows = await knex('reflections')
            .where({ id })
            .update({
                title,
                body
            });

        if (updatedRows === 0) {
            return res.status(404).json({ message: `No reflection found with id ${id}` });
        }

        res.status(200).json({ message: 'Reflection updated successfully' });
    } catch (error) {
        console.error('Error updating reflection:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteReflection = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRows = await knex('reflections')
            .where({ id })
            .del();

        if (deletedRows === 0) {
            return res.status(404).json({ message: `No reflection found with id ${id}` });
        }

        res.status(200).json({ message: 'Reflection deleted successfully' });
    } catch (error) {
        console.error('Error deleting reflection:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export {
    getReflectionItem,
    getAllReflections,
    addReflection,
    editReflection,
    deleteReflection
};