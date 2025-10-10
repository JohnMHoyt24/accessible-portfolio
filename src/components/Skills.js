import React from "react";
import "./Skills.css";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "HTML5", level: 98 },
        { name: "CSS3", level: 92 },
        { name: "TypeScript", level: 85 },
      ],
    },
    {
      title: "Accessibility & UX",
      skills: [
        { name: "WCAG Guidelines", level: 95 },
        { name: "Screen Reader Testing", level: 90 },
        { name: "ARIA Implementation", level: 88 },
        { name: "User Research", level: 85 },
        { name: "Usability Testing", level: 87 },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90 },
        { name: "Node.js", level: 80 },
        { name: "Webpack", level: 75 },
        { name: "Jest", level: 85 },
        { name: "Figma", level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2>My Skills</h2>
          <p className="skills-subtitle">
            A comprehensive overview of my technical abilities and expertise
            areas
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
