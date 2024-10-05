import { useParams } from 'react-router-dom';
import './OutdoorActivitiesPage.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL } from '../../utils/utils';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop.jsx'; 

export default function OutdoorActivitiesPage() {
    const { id } = useParams();
    const [outdoorActivities, setOutdoorActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [droppedActivities, setDroppedActivities] = useState([]);
    const [draggingActivityIndex, setDraggingActivityIndex] = useState(null);
    const [draggingFromDropZone, setDraggingFromDropZone] = useState(false);
    const [draggedOverIndex, setDraggedOverIndex] = useState(null);

    useEffect(() => {
        const getOutdoorActivitiesList = async () => {
            try {
                const response = await axios.get(`${API_URL}/activities/outdoor-activities/${id}`);
                setOutdoorActivities(response.data);
            } catch (error) {
                console.error("Error fetching outdoor activities:", error);
                setError(`Cannot fetch outdoor activities list for ${id}`);
            } finally {
                setLoading(false);
            }
        };
        getOutdoorActivitiesList();
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
                const draggedActivity = outdoorActivities[draggingActivityIndex];

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
    if (!outdoorActivities.length) return <p>No outdoor activities found.</p>;

    return (
        <div className="outdoor-activities-page">
            <section className="outdoor-activities">
                <h2>Drag and Drop Outdoor Activities</h2>
                {outdoorActivities.map((activity, index) => (
                    <div
                        key={index}
                        className="outdoor-activities__item"
                        draggable
                        onDragStart={() => handleDragStartFromList(index)}
                    >
                        <div className="outdoor-activities__icon-container">
                            <FontAwesomeIcon icon={activity.outdoor_activity_icon} className="outdoor-activities__icon" />
                        </div>
                        <div className="outdoor-activities__text-container">
                            <h2 className="outdoor-activities__name">{activity.outdoor_activity_name}</h2>
                            <h2 className="outdoor-activities__description">{activity.outdoor_activity_description}</h2>
                        </div>
                    </div>
                ))}
            </section>

            <DragAndDrop
                droppedItems={droppedActivities}
                renderIcon={(activity) => activity.outdoor_activity_icon}
                renderName={(activity) => activity.outdoor_activity_name}
                renderDescription={(activity) => activity.outdoor_activity_description}
                handleDragStart={handleDragStartFromDropZone}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleRemove={handleRemove}
            />
        </div>
    );
}
