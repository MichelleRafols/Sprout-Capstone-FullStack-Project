import { useNavigate, useParams } from 'react-router-dom';
import './IndoorActivitiesPage.scss';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands, faWalking } from '@fortawesome/free-solid-svg-icons';

export default function IndoorActivitiesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [indoorActivities, setIndoorActivities] = useState([]); // Since the response is an array, set the initial state to an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getIndoorActivitiesList = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/activities/indoor-activities/${id}`);
                console.log(response.data); 
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!indoorActivities) return <p>No activity found.</p>;

    return (
        <section className="indoor-activities">
            {indoorActivities.length > 0 ? (
                indoorActivities.map((activity, index) => (
                    <div key={index} className="indoor-activities__item">
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
    )
}