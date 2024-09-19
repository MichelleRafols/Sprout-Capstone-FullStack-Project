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
import './RadialMenu.scss';

export default function RadialMenu({ title, activities }) {
    return (
        <div className="radial-menu">
            <h3>{title}</h3>
            <div className="menu-items">
                {activities.map((activity, index) => (
                    <div key={index} className="menu-item">
                        <img src={activity.icon} alt={activity.name} />
                        <p>{activity.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
