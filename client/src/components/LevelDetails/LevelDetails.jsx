import { useState, useEffect } from 'react';
import axios from 'axios';
import StarRating from '../StarRating/StarRating.jsx'
import RadialMenu from '../RadialMenu/RadialMenu.jsx';

export default function EnergyLevelActivities() {
    const [energyLevel, setEnergyLevel] = useState(null);
    const [energyData, setEnergyData] = useState(null);

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
        <div>
            <StarRating setEnergyLevel={setEnergyLevel} />
            {energyData && (
                <>
                    <h2>Energy Level: {energyData.level}</h2>
                    <h3>{energyData.description}</h3>
                    <h3>"{energyData.verse_text}" ({energyData.reference} - {energyData.bible_version})</h3>

                    {/* Radial Menu for Indoor Activities */}
                    {/* <RadialMenu
                        title="Indoor Activities"
                        activities={[
                            {
                                name: energyData.indoor_activity_name,
                                description: energyData.indoor_activity_description,
                            }
                        ]}
                    /> */}

                    {/* Radial Menu for Outdoor Activities */}
                    {/* <RadialMenu
                        title="Outdoor Activities"
                        activities={[
                            {
                                name: energyData.outdoor_activity_name,
                                description: energyData.outdoor_activity_description,
                            }
                        ]}
                    /> */}

                    {/* Radial Menu for Indoor Activities */}
                    <RadialMenu
                        title="Indoor Activities"
                        activities={energyData.indoorActivities.map(activity => ({
                            name: activity.activity_name,
                            description: activity.description,
                            icon: activity.icon 
                        }))}
                    />

                    {/* Radial Menu for Outdoor Activities */}
                    <RadialMenu
                        title="Outdoor Activities"
                        activities={energyData.outdoorActivities.map(activity => ({
                            name: activity.activity_name,
                            description: activity.description,
                            icon: activity.icon 
                        }))}
                    />
                </>
            )}
        </div>
    );
};

