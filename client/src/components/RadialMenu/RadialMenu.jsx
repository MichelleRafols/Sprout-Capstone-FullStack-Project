// import './RadialMenu.scss';

// export default function RadialMenu({ title, activities, img, alt }) {
//     return (
//         <div className="radial-menu">
//             <h4>{title}</h4>
//             <div className="radial-menu__items">
//                 {activities.map((activity, index) => (
//                     <div key={index} className="radial-menu__item">
//                         <strong>{activity.name}</strong>
//                         <img src={img} alt={alt} className="radial-menu__img" />
//                         <p>{activity.description}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

import React from 'react';
import './radialMenu.scss';

export default function RadialMenu({ activities }) {
    return (
        <ul className="radial-menu">
            {activities.map((activity, index) => (
                <li key={index} className="radial-menu__item">
                    <i className={`radial-menu__icon ${activity.icon}`}></i>
                    <span>{activity.activity_name}</span>
                </li>
            ))}
        </ul>
    );
}
