import "./Quotes.css";

function Quotes() {
    const quotes = [
        {
            text: "The mystery of human existence lies not in just staying alive, but in finding something to live for.",
            author: "Fyodor Dostoevsky"
        },
        {
            text: "The only man who never makes a mistake is the man who never does anything.",
            author: "Theodore Roosevelt"
        },
        {
            text: "With man this is impossible, but not with God; all things are possible with God.",
            author: "Jesus Christ"
        }
    ];

    return (
        <section id="quotes" className="quotes-section">
            <h2 className="quotes-heading">Inspirational Quotes</h2>
            <div className="quotes-container">
                {quotes.map((quote, i) => (
                    <div key={i} className="quote-card">
                        <p className="quote-text">"{quote.text}"</p>
                        <p className="quote-author">- {quote.author}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Quotes;