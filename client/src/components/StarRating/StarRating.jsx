import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import './starRating.scss';

export default function StarRating() {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <section className="star-rating">
            {[...Array(5)].map((star, i) => {
                const currentRate = i + 1;
                return (
                    <label
                        key={currentRate}
                        className="star-rating__label"
                        onMouseEnter={() => setHover(currentRate)}
                        onMouseLeave={() => setHover(null)}
                    >
                        <input
                            type="radio"
                            name="rating"
                            value={currentRate}
                            onClick={() => setRating(currentRate)}
                            className="star-rating__input"
                        />
                        <FaStar
                            size={50}
                            className={
                                currentRate <= (hover || rating)
                                    ? "star-rating__icon star-rating__icon--active"
                                    : "star-rating__icon"
                            }
                        />
                    </label>
                );
            })}
        </section>
    )
}
