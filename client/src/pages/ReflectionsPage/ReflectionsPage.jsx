import './ReflectionsPage.scss';

export default function ReflectionsPage() {
    return (
        <section className="reflections-page">
            <form id="reflectionsForm" className="reflections__form">
                <h1 className="reflections-page__title">Reflections</h1>
                <p className="reflections-page__description">
                    Write and view your reflections on your daily activities and Bible verses.
                </p>
                <div className="reflections-page__title-container">
                    <input
                        type="text"
                        name="reflectionsTitle"
                        className="reflections-page__input-title"
                        placeholder="Add a title to your reflection"
                        required
                    />
                </div>
                <div className="reflections-page__textarea-container">
                    <textarea
                        className="reflections-page__textarea"
                        placeholder="Write your reflection here..."
                    />
                </div>
                <button className="reflections-page__submit-btn">
                    Submit Reflection
                </button>
            </form>
        </section>
    );
}
