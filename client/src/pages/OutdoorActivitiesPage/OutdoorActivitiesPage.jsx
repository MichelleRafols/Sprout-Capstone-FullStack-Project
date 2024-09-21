import { useNavigate, useParams } from 'react-router-dom';
import './OutdoorActivitiesPage.scss';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrayingHands, faWalking } from '@fortawesome/free-solid-svg-icons';

export default function OutdoorActivitiesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [outdoorActivities, setOutdoorActivities] = useState([]); // Since the response is an array, set the initial state to an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOutdoorActivitiesList = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/activities/outdoor-activities/${id}`);
                console.log(response.data); 
                setOutdoorActivities(response.data); 
            } catch (error) {
                console.error("Error fetching indoor activities:", error);
                setError(`Cannot fetch indoor activities list for ${id}`);
            } finally {
                setLoading(false);
            }
        };
        getOutdoorActivitiesList();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    if (!outdoorActivities) return <p>No activity found.</p>;

    return (
        <section className="outdoor-activities">
            {outdoorActivities.length > 0 ? (
                outdoorActivities.map((activity, index) => (
                    <div key={index} className="outdoor-activities__item">
                        <div className="indoor-activities__icon-container">
                            <FontAwesomeIcon icon={activity.outdoor_activity_icon} className="outdoor-activities__icon" />
                        </div>
                        <div className="outdoor-activities__text-container">
                            <h2 className="outdoor-activities__name">
                                {activity.outdoor_activity_name}
                            </h2>
                            <h2 className="outdoor-activities__description">
                                {activity.outdoor_activity_description}
                            </h2>
                        </div>
                    </div>
                ))
            ) : (
                <p>No outdoor activities found.</p>
            )}
        </section>
    )
}