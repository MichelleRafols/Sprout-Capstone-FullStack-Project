import './ReflectionsPage.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/utils.js';

export default function ReflectionsPage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setError('');
        setSuccessMessage('');

        const newReflection = { title, body }; 

        try {
            const response = await fetch(`${API_URL}/reflections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReflection),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Failed to submit reflection';
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('New item added:', data);

            setSuccessMessage('Reflection submitted successfully!');
            setTitle('');  // Clear the title input
            setBody('');   // Clear the textarea

            navigate('/reflections');
        } catch (error) {
            console.error('Error submitting reflection:', error);
            setError(error.message || 'There was an error submitting your reflection. Please try again.');
        }
    };

    return (
        <section className="reflections-page">
            <form id="reflectionsForm" className="reflections__form" onSubmit={handleSubmit}>
                <h1 className="reflections-page__title">Reflections</h1>
                <p className="reflections-page__description">
                    Write and view your reflections on your daily activities and Bible verses.
                </p>
                <div className="reflections-page__title-container">
                    <input
                        type="text"
                        name="reflectionsTitle"
                        className="reflections-page__input-title"
                        placeholder="Add a title to your reflection"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="reflections-page__textarea-container">
                    <textarea
                        className="reflections-page__textarea"
                        placeholder="Write your reflection here..."
                        required
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button className="reflections-page__submit-btn" type="submit">
                    Submit Reflection
                </button>

                {/* Display error or success messages */}
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
        </section>
    );
}
