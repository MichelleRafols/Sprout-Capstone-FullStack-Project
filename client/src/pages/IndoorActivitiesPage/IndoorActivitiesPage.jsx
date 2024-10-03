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
    const [droppedActivities, setDroppedActivities] = useState([]); // Array to store dropped activities
    const [draggingActivityIndex, setDraggingActivityIndex] = useState(null); // Track the currently dragged activity index (for drag-and-drop)
    const [draggedOverIndex, setDraggedOverIndex] = useState(null); // Track where the dragged item is dropped within the drop zone

    useEffect(() => {
        const getIndoorActivitiesList = async () => {
            try {
                const response = await axios.get(`${API_URL}/activities/indoor-activities/${id}`);
                setIndoorActivities(response.data); // Use the data fetched from the server
            } catch (error) {
                console.error("Error fetching indoor activities:", error);
                setError(`Cannot fetch indoor activities list for ${id}`);
            } finally {
                setLoading(false);
            }
        };
        getIndoorActivitiesList();
    }, [id]);

    // Function to handle drag start and store the activity index in state
    const handleDragStart = (index) => {
        setDraggingActivityIndex(index); // Set the activity index being dragged in state
    };

    const handleDragOver = (event, index) => {
        event.preventDefault(); // Allows the drop
        setDraggedOverIndex(index); // Set the index where the dragged item is hovering
    };

    // Function to handle the drop into the drop zone
    const handleDrop = () => {
        if (draggingActivityIndex !== null) {
            const draggedActivity = indoorActivities[draggingActivityIndex]; // Get the dragged activity

            if (draggedActivity) {
                // Add the dragged activity to droppedActivities if it doesn't exist
                setDroppedActivities((prevActivities) => {
                    const existingItem = prevActivities.find(item => item === draggedActivity);
                    if (!existingItem) {
                        return [...prevActivities, draggedActivity]; // Append new item to the array
                    }
                    return prevActivities; // Return previous array if the item already exists
                });

                // Clear dragging items
                setDraggingActivityIndex(null);
                setDraggedOverIndex(null);
            }
        }
    };

    // Function to remove an activity from the drop zone
    const handleRemove = (index) => {
        setDroppedActivities(prevActivities => prevActivities.filter((_, i) => i !== index));
    };

    // Function to handle rearranging within the drop zone
    const handleRearrangeDrop = () => {
        if (draggingActivityIndex !== null && draggedOverIndex !== null && draggingActivityIndex !== draggedOverIndex) {
            // Rearrange items in droppedActivities
            const updatedActivities = [...droppedActivities];
            const [draggedActivity] = updatedActivities.splice(draggingActivityIndex, 1); // Remove the dragged item
            updatedActivities.splice(draggedOverIndex, 0, draggedActivity); // Insert at the new position
            setDroppedActivities(updatedActivities); // Update the state

            // Reset drag-related states
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
                        onDragStart={() => handleDragStart(index)} // Pass the index of the item being dragged
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

            {/* Drop zone box */}
            <section
                className="drop-zone"
                onDragOver={(event) => event.preventDefault()} // Allow items to be dragged over
                onDrop={handleDrop} // Handle the initial drop from the list of indoor activities
            >
                <h2>Drop your activities here</h2>
                {droppedActivities.length > 0 ? (
                    droppedActivities.map((activity, index) => (
                        <div
                            key={index}
                            className="drop-zone__item"
                            draggable
                            onDragStart={() => setDraggingActivityIndex(index)} // Start rearranging within the drop zone
                            onDragOver={(event) => handleDragOver(event, index)} // Allow rearranging over
                            onDrop={handleRearrangeDrop} // Handle rearranging drop
                        >
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
                            <button onClick={() => handleRemove(index)} className="remove-button">Remove</button> 
                        </div>
                    ))
                ) : (
                    <p>No activities dropped yet.</p>
                )}
            </section>
        </div>
    );
}
