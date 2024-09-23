import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/utils.js';
import './EditReflectionsPage.scss';

export default function EditReflectionsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        body: ''
    });

    const [placeholderData, setPlaceholderData] = useState({
        title: '',
        body: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchReflectionDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/reflections/${id}`);
                console.log('API Response:', response.data); // Debugging log

                if (response.status === 200 && response.data) {
                    const reflection = response.data;
                    console.log(reflection.body);

                    setPlaceholderData({
                        title: reflection.title || '',
                        body: reflection.body || ''
                    });
                    setFormData({
                        title: reflection.title || '',
                        body: reflection.body || ''
                    });
                    console.log('Fetched reflection data set to formData:', formData); 
                } else {
                    throw new Error('Invalid data structure');
                }
            } catch (error) {
                console.error('Error fetching reflection data:', error);
            }
        };

        fetchReflectionDetails();
    }, [id]);

    const validateForm = () => {
        const errors = {};
        if (!formData.title) errors.title = "Title is required";
        if (!formData.body) errors.body = "Reflection body is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        axios.put(`${API_URL}/reflections/${id}`, formData)
            .then(response => {
                console.log('Reflection updated successfully:', response.data);
                navigate('/reflections/list'); 
            })
            .catch(error => {
                console.error('Error updating reflection:', error);
                setFormErrors({ general: 'Failed to update reflection' });
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleCancel = () => {
        navigate('/reflections/list'); 
    };

    return (
        <section className="edit-reflection">
            <div className="edit-reflection__icon-title">
                <h1 className="edit-reflection__title">Edit Reflection</h1>
            </div>

            <form className="edit-reflection__form" onSubmit={handleSubmit}>
                <div className="edit-reflection__details">
                    <div className="edit-reflection__input-wrapper">
                        <label className="edit-reflection__label">Reflection Title</label>
                        <input
                            id="title"
                            name="title"
                            className={`edit-reflection__input ${formErrors.title ? 'input-error' : ''}`}
                            value={formData.title} 
                            placeholder={placeholderData.title || 'Enter your title'} 
                            onChange={handleInputChange}
                        />
                        {formErrors.title && (
                            <p className="error-message">{formErrors.title}</p>
                        )}
                    </div>

                    <div className="edit-reflection__input-wrapper">
                        <label className="edit-reflection__label">Reflection Body</label>
                        <textarea
                            id="body"
                            name="body"
                            className={`edit-reflection__textarea ${formErrors.body ? 'input-error' : ''}`}
                            value={formData.body} 
                            placeholder={placeholderData.body || 'Write your reflection here...'}
                            onChange={handleInputChange}
                        ></textarea>
                        {formErrors.body && (
                            <p className="error-message">{formErrors.body}</p>
                        )}
                    </div>

                    {formErrors.general && (
                        <p className="error-message">{formErrors.general}</p>
                    )}
                </div>

                <div className="edit-reflection__actions">
                    <button type="button" className="edit-reflection__button-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="edit-reflection__button-save" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </section>
    );
};