import './ReflectionPage.scss';

export default function ReflectionPage() {
    return (
        <div className="reflections-page">
            <h1 className="reflections-page__title">Reflections</h1>
            <p className="reflections-page__description">
                Write and view your reflections on your daily activities and Bible verses.
            </p>
            <textarea
                className="reflections-page__textarea"
                placeholder="Write your reflection here..."
            />
            <button className="reflections-page__submit-btn">Submit Reflection</button>
        </div>
    );
}
