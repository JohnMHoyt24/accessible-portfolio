import React from "react";
import "./Skills.css";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        {
          name: "React",
          description: "JavaScript library for building user interfaces",
        },
        {
          name: "JavaScript",
          description:
            "Programming language for making web projects interactive",
        },
        {
          name: "HTML5",
          description: "Markup language for structuring web content",
        },
        {
          name: "CSS3",
          description: "Styling language for designing web layouts",
        },
        {
          name: "TypeScript",
          description: "Superset of JavaScript that adds static types",
        },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        {
          name: "Git",
          description:
            "Version control system for tracking changes in source code",
        },
        {
          name: "Node.js",
          description:
            "JavaScript runtime for building server-side applications",
        },
        { name: "NPM", description: "Package manager for JavaScript" },
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
        <div className="skill-cards">
          {/*Iterate through each skill from the array and display the skill name 
          and description in a card*/}
          {skillCategories.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-content">
                <h3 className="skill-name">{skill.skills.name}</h3>
                <p className="skill-description">{skill.skills.description}</p>
              </div>
            </div>
          ))}
          <div className="skill-card">
            <div className="skill-content"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
