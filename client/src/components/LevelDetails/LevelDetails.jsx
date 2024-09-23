import StarRating from '../StarRating/StarRating.jsx';
import './LevelDetails.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

library.add(fas);

export default function LevelDetails() {
    const navigate = useNavigate();

    const handleEnergySelection = (level) => {
        localStorage.setItem('energyLevel', level);
        navigate(`/energy-details/${level}`);
    };

    return (
        <section className="level-details">
            <div className="level-details__prompt">
                <h2 className="level-details__prompt-title">🌟 How's Your Energy Today? 🌟</h2>
                <p className="level-details__prompt-text">
                    Take a moment to reflect and let us know how you're feeling! Use the stars below to rate your energy level, and we'll sprout some personalized activity suggestions just for you! 🌱
                </p>
                <StarRating setEnergyLevel={handleEnergySelection} />
            </div>
        </section>
    );
}
