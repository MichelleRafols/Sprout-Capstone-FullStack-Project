import { useParams } from 'react-router-dom';
import './IndoorActivitiesPage.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL } from '../../utils/utils';

export default function IndoorActivitiesPage() {
    const { id } = useParams();
    const [indoorActivities, setIndoorActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [droppedActivities, setDroppedActivities] = useState([]);
    const [draggingActivityIndex, setDraggingActivityIndex] = useState(null);
    const [draggingFromDropZone, setDraggingFromDropZone] = useState(false);
    const [draggedOverIndex, setDraggedOverIndex] = useState(null);

    useEffect(() => {
        const getIndoorActivitiesList = async () => {
            try {
                const response = await axios.get(`${API_URL}/activities/indoor-activities/${id}`);
                setIndoorActivities(response.data);
            } catch (error) {
                console.error("Error fetching indoor activities:", error);
                setError(`Cannot fetch indoor activities list for ${id}`);
            } finally {
                setLoading(false);
            }
        };
        getIndoorActivitiesList();
    }, [id]);

    const handleDragStartFromList = (index) => {
        setDraggingActivityIndex(index);
        setDraggingFromDropZone(false);
    };

    const handleDragStartFromDropZone = (index) => {
        setDraggingActivityIndex(index);
        setDraggingFromDropZone(true);
    };

    const handleDragOver = (event, index) => {
        event.preventDefault();
        setDraggedOverIndex(index);
    };

    const handleDrop = () => {
        if (draggingActivityIndex !== null) {
            if (draggingFromDropZone) {
                handleRearrangeDrop();
            } else {
                const draggedActivity = indoorActivities[draggingActivityIndex];

                setDroppedActivities((prevActivities) => {
                    if (!prevActivities.includes(draggedActivity)) {
                        return [...prevActivities, draggedActivity];
                    }
                    return prevActivities;
                });
            }

            setDraggingActivityIndex(null);
            setDraggedOverIndex(null);
        }
    };

    const handleRemove = (index) => {
        setDroppedActivities(prevActivities => prevActivities.filter((_, i) => i !== index));
    };

    const handleRearrangeDrop = () => {
        if (draggingActivityIndex !== null && draggedOverIndex !== null && draggingActivityIndex !== draggedOverIndex) {
            const updatedActivities = [...droppedActivities];
            const [draggedActivity] = updatedActivities.splice(draggingActivityIndex, 1);
            updatedActivities.splice(draggedOverIndex, 0, draggedActivity);
            setDroppedActivities(updatedActivities);
            setDraggingActivityIndex(null);
            setDraggedOverIndex(null);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!indoorActivities.length) return <p>No indoor activities found.</p>;

    return (
        <div className="indoor-activities-page">
            <section className="indoor-activities">
                <h2>Drag and Drop Indoor Activities</h2>
                {indoorActivities.map((activity, index) => (
                    <div
                        key={index}
                        className="indoor-activities__item"
                        draggable
                        onDragStart={() => handleDragStartFromList(index)}
                    >
                        <div className="indoor-activities__icon-container">
                            <FontAwesomeIcon icon={activity.indoor_activity_icon} className="indoor-activities__icon" />
                        </div>
                        <div className="indoor-activities__text-container">
                            <h2 className="indoor-activities__name">
                                {activity.indoor_activity_name}
                            </h2>
                            <h2 className="indoor-activities__description">
                                {activity.indoor_activity_description}
                            </h2>
                        </div>
                    </div>
                ))}
            </section>

            <section
                className="drop-zone"
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}
            >
                <h2>Drop your activities here</h2>
                {droppedActivities.length > 0 ? (
                    droppedActivities.map((activity, index) => (
                        <div
                            key={index}
                            className="drop-zone__item"
                            draggable
                            onDragStart={() => handleDragStartFromDropZone(index)}
                            onDragOver={(event) => handleDragOver(event, index)}
                            onDrop={handleRearrangeDrop}
                        >
                            <div className="drop-zone__top-container">
                                <div className="drop-zone__icon-container">
                                    <FontAwesomeIcon icon={activity.indoor_activity_icon} className="drop-zone__icon" />
                                </div>
                                <div className="drop-zone__text-container">
                                    <h2 className="drop-zone__name">
                                        {activity.indoor_activity_name}
                                    </h2>
                                    <h2 className="drop-zone__description">
                                        {activity.indoor_activity_description}
                                    </h2>
                                </div>
                            </div>
                            <button onClick={() => handleRemove(index)} className="drop-zone__remove-button">Remove</button>
                        </div>
                    ))
                ) : (
                    <p>No activities dropped yet.</p>
                )}
            </section>
        </div>
    );
}
