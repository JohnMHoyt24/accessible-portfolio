import React, { useState } from "react";
import "./Projects.css";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "Accessible E-Commerce Platform",
      description:
        "A fully accessible online shopping platform built with React and Node.js, featuring screen reader compatibility, keyboard navigation, and WCAG 2.1 AA compliance.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      features: [
        "Screen reader optimized product browsing",
        "Keyboard-only navigation support",
        "High contrast mode compatibility",
        "Voice search functionality",
      ],
      image:
        "https://via.placeholder.com/600x400/007bff/ffffff?text=E-Commerce+Platform",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Inclusive Learning Management System",
      description:
        "An educational platform designed for students with diverse learning needs, featuring customizable interfaces and multiple content delivery methods.",
      technologies: ["React", "TypeScript", "Express", "PostgreSQL"],
      features: [
        "Text-to-speech integration",
        "Customizable font sizes and colors",
        "Video captions and transcripts",
        "Progress tracking for different learning styles",
      ],
      image:
        "https://via.placeholder.com/600x400/28a745/ffffff?text=LMS+Platform",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Accessibility Testing Dashboard",
      description:
        "A comprehensive tool for testing and monitoring website accessibility compliance across multiple pages and devices.",
      technologies: ["Vue.js", "Python", "Selenium", "Docker"],
      features: [
        "Automated accessibility scanning",
        "Real-time compliance monitoring",
        "Detailed accessibility reports",
        "Integration with CI/CD pipelines",
      ],
      image:
        "https://via.placeholder.com/600x400/dc3545/ffffff?text=Testing+Dashboard",
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Voice-Controlled Portfolio",
      description:
        "An innovative portfolio website that can be navigated entirely through voice commands, designed for users with motor disabilities.",
      technologies: ["React", "Web Speech API", "Three.js", "WebRTC"],
      features: [
        "Complete voice navigation",
        "Gesture recognition support",
        "Eye-tracking compatibility",
        "Multi-language voice support",
      ],
      image:
        "https://via.placeholder.com/600x400/6f42c1/ffffff?text=Voice+Portfolio",
      liveUrl: "#",
      githubUrl: "#",
    },
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setActiveProject(index);
  };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2>Featured Projects</h2>
          <p className="projects-subtitle">
            A showcase of my work focusing on accessibility, user experience,
            and modern web technologies
          </p>
        </div>

        <div className="projects-showcase">
          <div className="project-main">
            <div className="project-image">
              <img
                src={projects[activeProject].image}
                alt={`Screenshot of ${projects[activeProject].title}`}
                className="project-screenshot"
              />
              <div className="project-overlay">
                <div className="project-links">
                  <a
                    href={projects[activeProject].liveUrl}
                    className="project-link live-link"
                    aria-label={`View live demo of ${projects[activeProject].title}`}
                  >
                    Live Demo
                  </a>
                  <a
                    href={projects[activeProject].githubUrl}
                    className="project-link github-link"
                    aria-label={`View source code for ${projects[activeProject].title}`}
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="project-content">
              <h3 className="project-title">{projects[activeProject].title}</h3>
              <p className="project-description">
                {projects[activeProject].description}
              </p>

              <div className="project-technologies">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {projects[activeProject].technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-features">
                <h4>Key Features:</h4>
                <ul className="features-list">
                  {projects[activeProject].features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="project-navigation">
            <button
              className="nav-button prev-button"
              onClick={prevProject}
              aria-label="Previous project"
            >
              ← Previous
            </button>

            <div className="project-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeProject ? "active" : ""}`}
                  onClick={() => goToProject(index)}
                  aria-label={`Go to project ${index + 1}: ${projects[index].title}`}
                />
              ))}
            </div>

            <button
              className="nav-button next-button"
              onClick={nextProject}
              aria-label="Next project"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
