import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// This function will be used to render Font Awesome icons
const renderIcon = (iconClass) => {
    return <i className={iconClass}></i>;
};

export default function RadialMenu({ title, activities, icon }) {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle the menu open/close state
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="radial-menu">
            {/* Button to toggle the activity list */}
            <button onClick={toggleMenu} className="radial-menu__button">
                {renderIcon(icon)}
            </button>

            {/* If isOpen is true, show the activity list */}
            {isOpen && (
                <p>Hello</p>
                // <ul className="radial-menu__activities">
                //     {/* {activities.map((activity, index) => ( */}
                //         <li key={index} className="radial-menu__activity-item" onClick={() => console.log(`Clicked on: ${activity.name}`)}>
                //             {/* Render the icon for each activity */}
                //             {renderIcon(activity.icon)}
                //             <div>
                //                 <h4>{activity.name}</h4>
                //                 <p>{activity.description}</p>
                //             </div>
                //         </li>
                //     {/* ))} */}
                // </ul>
            )}
        </div>
    );
}
