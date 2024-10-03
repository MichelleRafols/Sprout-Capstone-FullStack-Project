import { useParams } from 'react-router-dom';
import './IndoorActivitiesPage.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands, faWalking } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../utils/utils';

export default function IndoorActivitiesPage() {
    const { id } = useParams();
    const [indoorActivities, setIndoorActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [draggingItem, setDraggingItem] = useState(null);
    const [droppedActivities, setDroppedActivities] = useState([]);

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

    const handleDragStart = (activity) => {
        setDraggingItem(activity);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = () => {
        if (draggingItem) {
            // Check if the item is already in the droppedActivities array
            if (!droppedActivities.some(item => item.id === draggingItem.id)) {
                setDroppedActivities([...droppedActivities, draggingItem]);
            }
            setDraggingItem(null);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!indoorActivities) return <p>No activity found.</p>;

    return (
        <div className="indoor-activities-page">
            <section className="indoor-activities">
                <h2>Drag and Drop Indoor Activities</h2>
                {indoorActivities.length > 0 ? (
                    indoorActivities.map((activity, index) => (
                        <div
                            key={index}
                            className="indoor-activities__item"
                            draggable
                            onDragStart={() => handleDragStart(activity)}
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
                    ))
                ) : (
                    <p>No indoor activities found.</p>
                )}
            </section>

            {/* Drop zone box */}
            <section
                className="drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h2>Drop Activities Here</h2>
                {droppedActivities.length > 0 ? (
                    droppedActivities.map((activity, index) => (
                        <div key={index} className="drop-zone__item">
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
                    ))
                ) : (
                    <p>No activities dropped yet.</p>
                )}
            </section>
        </div>
    );
}
