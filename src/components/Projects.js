import React, { useState } from "react";
import Card from "./Card";
import Carousel from "./Carousel";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      title: "Advice Generator",
      description:
        "A tool used to receive random pieces of advice via an external API.",
      technologies: ["React", "TypeScript", "Tailwind", "Vite"],
      image:
        "https://via.placeholder.com/600x400/007bff/ffffff?text=E-Commerce+Platform",
      liveUrl: "https://advice-generator-ecru-iota.vercel.app/",
    },
    {
      title: "Sign-Up Form",
      description:
        "A simple sign-up form with real-time validation and error messaging.",
      technologies: ["React", "TypeScript", "CSS"],
      image:
        "https://via.placeholder.com/600x400/28a745/ffffff?text=LMS+Platform",
      liveUrl: "https://signup-form-jsnm.vercel.app/"
    },
    {
      title: "Rating System",
      description:
        "A simple rating system with a scale from 1 to 5. Displays a thank you message upon submission.",
      technologies: ["HTML", "CSS", "JavaScript"],
      image:
        "https://via.placeholder.com/600x400/dc3545/ffffff?text=Testing+Dashboard",
      liveUrl: "https://rating-system-jet.vercel.app/"
    },
  ];

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
          <Carousel>
            {projects.map((p, i) => (
              <Card
                key={i}
                title={p.title}
                description={p.description}
                url={p.liveUrl}
                image={p.image}
                technologies={p.technologies}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Projects;
