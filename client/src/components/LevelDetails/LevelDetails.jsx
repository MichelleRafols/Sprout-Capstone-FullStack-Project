import './LevelDetails.scss';

export default function LevelDetails() {
    return (
        <section className="level-details">
            <h3 className="level-details__description">
                You’re feeling low but not completely drained. Light, calming activities can refresh your mind and body. This is a good time to engage in gentle reflection.
            </h3>
            <h3 className="level-details__prompt">
                Click one of the buttons below to see suggestions of activities to do at your energy level :)
            </h3>
            {/* <div className="level-details__btn-container">
                <button className='level-details__button level-details__button--indoor'>
                    <img className="level-details__icon level-details__icon--indoor" src="src/assets/icons/indoor-icon.png" alt="indoor activities button" />
                </button>
                <button className='level-details__button level-details__button--outdoor'>
                    <img className="level-details__icon level-details__icon--outdoor" src="src/assets/icons/outdoor-icon.png" alt="outdoor activities button" />
                </button>
            </div> */}
        </section>
    )
}
