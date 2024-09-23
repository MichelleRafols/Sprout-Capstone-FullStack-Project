import React from 'react';
import './DeleteModal.scss';

export default function DeleteModal({ show, onClose, onConfirm }) {
    if (!show) return null;

    return (
        <div className="delete-modal">
            <div className="delete-modal__content">
                <h2 className="delete-modal__title">Confirm Delete</h2>
                <p className="delete-modal__text">Are you sure you want to delete this reflection?</p>
                <div className="delete-modal__buttons">
                    <button className="delete-modal__btn delete-modal__btn--cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="delete-modal__btn delete-modal__btn--confirm" onClick={onConfirm}>
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
