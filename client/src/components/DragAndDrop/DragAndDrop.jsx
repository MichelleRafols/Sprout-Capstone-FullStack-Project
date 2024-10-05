import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DragAndDrop.scss';

export default function DragAndDrop({ 
    droppedItems, 
    renderIcon, 
    renderName, 
    renderDescription, 
    handleDragStart, 
    handleDragOver, 
    handleDrop, 
    handleRemove 
}) {
    
    return (
        <div className="drop-zone" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
            <h2>Drop your activities here</h2>
            {droppedItems.length > 0 ? (
                droppedItems.map((activity, index) => (
                    <div
                        key={index}
                        className="drop-zone__item"
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(event) => handleDragOver(event, index)}
                    >
                        <div className="drop-zone__top-container">
                            <div className="drop-zone__icon-container">
                                <FontAwesomeIcon icon={renderIcon(activity)} className="drop-zone__icon" />
                            </div>
                            <div className="drop-zone__text-container">
                                <h2 className="drop-zone__name">{renderName(activity)}</h2>
                                <h2 className="drop-zone__description">{renderDescription(activity)}</h2>
                            </div>
                        </div>
                        <button onClick={() => handleRemove(index)} className="drop-zone__remove-button">Remove</button>
                    </div>
                ))
            ) : (
                <p>No activities dropped yet.</p>
            )}
        </div>
    );
}
