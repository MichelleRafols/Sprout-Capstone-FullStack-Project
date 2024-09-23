import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import StarRating from '../../components/StarRating/StarRating.jsx';
import indoorIcon from '../../assets/icons/indoor-icon.png';
import outdoorIcon from '../../assets/icons/outdoor-icon.png';
import './EnergyDetailsPage.scss';

export default function EnergyDetailsPage() {
    const { energyLevel } = useParams();
    const navigate = useNavigate();
    const [energyData, setEnergyData] = useState(null);
    const [currentEnergyLevel, setCurrentEnergyLevel] = useState(
        parseInt(energyLevel) || parseInt(localStorage.getItem('energyLevel')) || 0
    );

    useEffect(() => {
        if (currentEnergyLevel) {
            localStorage.setItem('energyLevel', currentEnergyLevel);
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/levels/${currentEnergyLevel}`);
                    setEnergyData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        } else {
            navigate('/');
        }
    }, [currentEnergyLevel, navigate]);

    const handleNavigateToReflections = () => {
        navigate('/reflections');
    };

    return (
        <div className="level-details">
            <StarRating setEnergyLevel={setCurrentEnergyLevel} currentRating={currentEnergyLevel} />
            {energyData && (
                <section className="level-details">
                    <h2>Energy Level: {energyData.level}</h2>
                    <h3>{energyData.description}</h3>
                    <h3>"{energyData.verse_text}" ({energyData.reference} - {energyData.bible_version})</h3>
                    <div className="level-details__btn-container">
                        <Link to={`/levels/${currentEnergyLevel}/indoor-activities`}>
                            <img
                                className="level-details__icon level-details__icon--indoor"
                                src={indoorIcon}
                                alt="Indoor Activities"
                            />
                        </Link>
                        <Link to={`/levels/${currentEnergyLevel}/outdoor-activities`}>
                            <img
                                className="level-details__icon level-details__icon--outdoor"
                                src={outdoorIcon}
                                alt="Outdoor Activities"
                            />
                        </Link>
                    </div>
                    <div className="level-details__reflection-section" onClick={handleNavigateToReflections}>
                        <h2 className="level-details__reflection-title">Reflection</h2>
                        <p className="level-details__reflection-text">Click here to view and write reflections on your day.</p>
                    </div>
                </section>
            )}
        </div>
    );
}
