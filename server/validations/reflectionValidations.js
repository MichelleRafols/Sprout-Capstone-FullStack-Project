import { body, validationResult } from 'express-validator';

export const reflectionValidationRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 255 }).withMessage('Title must be less than 255 characters'),

    body('body')
        .trim()
        .notEmpty().withMessage('Body is required')
        .isLength({ max: 1000 }).withMessage('Body must be less than 1000 characters'),
];

// Middleware to check for validation errors
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
