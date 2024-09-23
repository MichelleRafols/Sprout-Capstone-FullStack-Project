import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../StarRating/StarRating.jsx';
import RadialMenu from '../RadialMenu/RadialMenu.jsx';
import indoorIcon from '../../assets/icons/indoor-icon.png';
import outdoorIcon from '../../assets/icons/outdoor-icon.png';
import './LevelDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';

library.add(fas);

export default function LevelDetails() {
    const [energyLevel, setEnergyLevel] = useState(null);
    const [energyData, setEnergyData] = useState(null);
    const navigate = useNavigate();

    const handleNavigateToReflections = () => {
        navigate('/reflections');
    };

    useEffect(() => {
        if (energyLevel) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/levels/${energyLevel}`);
                    setEnergyData(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [energyLevel]);

    return (
        <div className="level-details">
            {!energyLevel && (
                <div className="level-details__prompt">
                    <h2 className="level-details__prompt-title">🌟 How's Your Energy Today? 🌟</h2>
                    <p className="level-details__prompt-text">
                        Take a moment to reflect and let us know how you're feeling! Use the stars below to rate your energy level, and we'll sprout some personalized activity suggestions just for you! 🌱
                    </p>
                </div>
            )}
            <StarRating setEnergyLevel={setEnergyLevel} />
            {energyData && (
                <section className="level-details">
                    <h2>Energy Level: {energyData.level}</h2>
                    <h3>{energyData.description}</h3>
                    <h3>"{energyData.verse_text}" ({energyData.reference} - {energyData.bible_version})</h3>
                    <div className="level-details__btn-container">
                        <Link to={`/levels/${energyLevel}/indoor-activities`}>
                            <img
                                className="level-details__icon level-details__icon--indoor"
                                src={indoorIcon}
                                alt="Indoor Activities"
                            />
                        </Link>
                        <Link to={`/levels/${energyLevel}/outdoor-activities`}>
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

