import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../StarRating/StarRating.jsx'
// import RadialMenu from '../RadialMenu/RadialMenu.jsx';

export default function EnergyLevelActivities() {
    const [energyLevel, setEnergyLevel] = useState(null);
    const [energyData, setEnergyData] = useState(null);  // Store fetched data

    useEffect(() => {
        if (energyLevel) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/levels/${energyLevel}`);
                    console.log(response.data.data);
                    setEnergyData(response.data);  // Store the entire data object
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchData();
        }
    }, [energyLevel]);

    return (
        <div>
            <StarRating setEnergyLevel={setEnergyLevel} />
            {energyData && (
                <>
                    <h2>Energy Level: {energyData.level}</h2>
                    <h3>{energyData.description}</h3>
                    <h3>"{energyData.verse_text}" ({energyData.reference} - {energyData.bible_version})</h3>
                </>
            )}
        </div>
    );
};

