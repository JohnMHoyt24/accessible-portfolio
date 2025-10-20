import React from "react";
import "./About.css";
import profileImage from "../assets/profile.jpg"

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>About Me</h2>
            <p className="about-description">
              I'm a passionate developer with a strong focus on creating
              accessible, user-friendly websites and applications. With
              expertise in modern web technologies, I believe in building
              digital solutions that are engaging and easy to use.
            </p>
            <p className="about-description">
              My journey in web development has taught me the importance of
              resourcefulness, adaptability, and continuous learning. I'm always
              eager to take on new challenges that benefit both users and the
              organization.
            </p>
            <p className="about-description">
              This website is a platform for me to showcase my skills and
              I plan to continually update it with new projects and features.
            </p>
            <p className="about-description">
              Outside of coding, I enjoy reading classic literature, going to the
              movies, and spending time with friends and family.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <h3>User-Centered</h3>
                <p>
                  I focus on understanding user needs and creating intuitive
                  experiences.
                </p>
              </div>
              <div className="highlight-item">
                <h3>Accessibility First</h3>
                <p>
                  Every project I work on prioritizes Web Content Accessibility
                  Guidelines (WCAG) and inclusive design principles.
                </p>
              </div>
              <div className="highlight-item">
                <h3>Modern Technologies</h3>
                <p>
                  I stay current with the latest technologies in UI development,
                  AI, and automation.
                </p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div
              className="profile-image"
              role="img"
              aria-label="Profile picture of the developer"
            >
              <div className="image-placeholder">
                <span className="image-text"><img src={profileImage} width="250" height="350"/></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
