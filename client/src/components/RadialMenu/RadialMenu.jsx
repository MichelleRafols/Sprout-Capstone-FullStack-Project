import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RadialMenu.scss';

export default function RadialMenu() {
    const [indoorActivities, setIndoorActivities] = useState([]);
    const [outdoorActivities, setOutdoorActivities] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null); // 'indoor' or 'outdoor'

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const indoorResponse = await axios.get('/levels/indoor-activities');
                setIndoorActivities(indoorResponse.data);

                const outdoorResponse = await axios.get('/levels/outdoor-activities');
                setOutdoorActivities(outdoorResponse.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };

        fetchActivities();
    }, []);

    // Handler for showing the radial menu based on the selected type
    const showRadialMenu = (type) => {
        if (type === activeMenu) {
            setActiveMenu(null); // If already active, close it
        } else {
            setActiveMenu(type);
        }
    };

    return (
        <div className="radial-menu-container">
            <div className="radial-menu__center-buttons">
                <button className={`radial-menu__button ${activeMenu === 'indoor' ? 'radial-menu__button--active' : ''}`}
                    onClick={() => showRadialMenu('indoor')}>
                        <img 
                            className="level-details__icon level-details__icon--indoor" 
                            src="src/assets/icons/indoor-icon.png" 
                            alt="indoor activities button" 
                        />
                </button>
                <button className={`radial-menu__button ${activeMenu === 'outdoor' ? 'radial-menu__button--active' : ''}`}
                    onClick={() => showRadialMenu('outdoor')}>
                    <img 
                        className="level-details__icon level-details__icon--outdoor" 
                        src="src/assets/icons/outdoor-icon.png" 
                        alt="outdoor activities button" 
                    />
                </button>
            </div>

            {/* Radial Menu for Indoor Activities */}
            {activeMenu === 'indoor' && (
                <ul className="radial-menu__items">
                    {indoorActivities.map((activity, index) => (
                        <li
                            key={activity.id}
                            style={{ '--index': index, '--total': indoorActivities.length }}
                            className="radial-menu__item"
                        >
                            {activity.activity_name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Radial Menu for Outdoor Activities */}
            {activeMenu === 'outdoor' && (
                <ul className="radial-menu__items">
                    {outdoorActivities.map((activity, index) => (
                        <li
                            key={activity.id}
                            style={{ '--index': index, '--total': outdoorActivities.length }}
                            className="radial-menu__item"
                        >
                            {activity.activity_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

