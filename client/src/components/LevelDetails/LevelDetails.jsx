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

library.add(fas);

export default function LevelDetails() {
    const [energyLevel, setEnergyLevel] = useState(null);
    const [energyData, setEnergyData] = useState(null);
    const [showIndoorMenu, setShowIndoorMenu] = useState(false);
    const [showOutdoorMenu, setShowOutdoorMenu] = useState(false);
    const [showIndoorMenu, setShowIndoorMenu] = useState(false);
    const [showOutdoorMenu, setShowOutdoorMenu] = useState(false);

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

    const getIcon = (iconClass) => {
        // FontAwesome classes are typically in the format 'fa-solid fa-[icon-name]'
        const iconParts = iconClass.split(' ');
        const iconName = iconParts[1]?.replace('fa-', '');
        return <FontAwesomeIcon icon={['fas', iconName]} />;
    };

    return (
        <div className="level-details">
            <StarRating setEnergyLevel={setEnergyLevel} />
            {energyData && (
                <section className="level-details">
                    <h2>Energy Level: {energyData.level}</h2>
                    <h3>{energyData.description}</h3>
                    <h3>"{energyData.verse_text}" ({energyData.reference} - {energyData.bible_version})</h3>

                    <div className="level-details__btn-container">
                        {/* <Link> */}
                            <img className="level-details__icon level-details__icon--indoor" src={indoorIcon} alt="Indoor Activities" />
                        {/* </Link> */}

                        <img className="level-details__icon level-details__icon--outdoor" src={outdoorIcon} alt="Outdoor Activities" />
                    </div>

                    {/* Radial Menu for Indoor Activities */}
                    {/* {showIndoorMenu && (
                        <RadialMenu
                            title="Indoor Activities"
                            activities={[
                                {
                                    name: energyData.indoor_activity_name,
                                    description: energyData.indoor_activity_description,
                                    icon: getIcon(energyData.indoor_activity_icon)  // Dynamic Font Awesome Icon
                                }
                            ]}
                        />
                    )} */}

                    {/* Radial Menu for Outdoor Activities */}
                    {/* {showOutdoorMenu && (
                        <RadialMenu
                            title="Outdoor Activities"
                            activities={[
                                {
                                    name: energyData.outdoor_activity_name,
                                    description: energyData.outdoor_activity_description,
                                    icon: getIcon(energyData.outdoor_activity_icon)  // Dynamic Font Awesome Icon
                                }
                            ]}
                        />
                    )} */}
                </>
            )}
        </div>
    );
}
}
