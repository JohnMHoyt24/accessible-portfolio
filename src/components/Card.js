import "./Card.css";

const Card = (props) => {
    
    function openExternalLink () {
        window.open("https://advice-generator-ecru-iota.vercel.app/");
    }

    return (
        <div className="card">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <button onClick={openExternalLink}>View Project</button>
        </div>
    );
}

export default Card;