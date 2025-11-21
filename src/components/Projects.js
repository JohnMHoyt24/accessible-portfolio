import React, { useState } from "react";
import Card from "./Card";
import Carousel from "./Carousel";
import "./Projects.css";

const Projects = () => {
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
