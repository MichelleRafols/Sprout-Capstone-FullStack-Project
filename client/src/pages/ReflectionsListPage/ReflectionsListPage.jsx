import React from 'react';
import './ReflectionsListPage.scss';
import { useState, useEffect } from 'react';
import { API_URL } from '../../utils/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ReflectionsListPage() {
    const [reflections, setReflections] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchReflections = async () => {
            try {
                const response = await fetch(`${API_URL}/reflections`);
                if (!response.ok) throw new Error('Failed to fetch reflections');

                const data = await response.json();
                console.log(data);
                setReflections(data);
            } catch (error) {
                console.error('Error fetching reflections:', error);
                setError('Failed to fetch reflections.');
            }
        };
        fetchReflections();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `${API_URL}/reflections/${id}`
            );
            if (response.status === 204 || response.status === 200) {
                const filteredReflections = reflections.filter(reflection => reflection.id !== id);
                setReflections(filteredReflections);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error deleting reflection:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/reflections/${id}/edit`);
    };

    const handleAddReflection = () => {
        navigate('/reflections');
    };

    return (
        <section className="reflections-list-page">
            <h1 className="reflections-list-page__title">My Reflections</h1>
            <button 
                className="reflections-list-page__add-btn" 
                onClick={handleAddReflection}
            >
                Add New Reflection
            </button>
            {error && <p className="reflections-list-page__error-message">{error}</p>}
            <div className="reflections-list-page__container">
                {reflections.map(reflection => (
                    <div key={reflection.id} className="reflections-post-it">
                        <h3 className="reflections-post-it__title">{reflection.title}</h3>
                        <p className="reflections-post-it__body">{reflection.body}</p>
                        <div className="reflections-post-it__btn-container">
                            <button
                                className="reflections-post-it__btn reflections-post-it__btn--edit"
                                onClick={() => handleEdit(reflection.id)}
                            >
                                Edit
                            </button>
                            <button
                                className="reflections-post-it__btn reflections-post-it__btn--dlt"
                                onClick={() => handleDelete(reflection.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
