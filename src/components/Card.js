import "./Card.css";

const Card = ({ title, description, url, image, technologies = [] }) => {
  return (
    <article className="project-card" aria-label={title}>
      {image && (
        <div className="card-image">
          <img src={image} alt={`Screenshot of ${title}`} />
        </div>
      )}
      <div className="card-content">
        <h4>{title}</h4>
        <p>{description}</p>
        {technologies.length > 0 && (
          <div className="card-tech" aria-hidden>
            {technologies.map((tech, i) => (
              <span key={i} className="card-tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}
        {url && (
          <p style={{ marginTop: "1rem" }}>
            <a
              className="project-link"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </p>
        )}
      </div>
    </article>
  );
};

export default Card;
