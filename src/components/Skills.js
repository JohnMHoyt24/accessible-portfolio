import "./Skills.css";
import reactIcon from "../assets/react.png";
import jsIcon from "../assets/js.png";
import htmlIcon from "../assets/html.png";
import cssIcon from "../assets/css.png";
import tsIcon from "../assets/ts.png";
import drupalIcon from "../assets/drupal.png";
import gitIcon from "../assets/git.png";
import nodeIcon from "../assets/node-js.png";
import npmIcon from "../assets/npm.png";
import sqlIcon from "../assets/sql.png";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Libraries",
      skills: [
        {
          name: "React",
          description: "JavaScript library for building user interfaces",
          icon: reactIcon
        },
        {
          name: "JavaScript",
          description:
            "Programming language for making web projects interactive",
          icon: jsIcon
        },
        {
          name: "HTML5",
          description: "Markup language for structuring web content",
          icon: htmlIcon
        },
        {
          name: "CSS3",
          description: "Styling language for designing web layouts",
          icon: cssIcon
        },
        {
          name: "TypeScript",
          description: "Superset of JavaScript that adds static types",
          icon: tsIcon
        },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        {
          name: "Drupal",
          description: "Content management system for building websites",
          icon: drupalIcon
        },
        {
          name: "Git",
          description:
            "Version control system for tracking changes in source code",
          icon: gitIcon
        },
        {
          name: "Node.js",
          description:
            "JavaScript runtime for building server-side applications",
          icon: nodeIcon
        },
        { name: "NPM", 
          description: "Package manager for JavaScript",
          icon: npmIcon
        },
        { name: "SQL",
          description: "Structured Query Language for managing relational databases",
          icon: sqlIcon
        }
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
        <div className="skill-categories">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3>{category.title}</h3>
              <div className="skill-cards">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-card">
                    <div className="skill-content">
                      <img src={skill.icon} alt={skill.name} />
                      <h4 className="skill-name">{skill.name}</h4>
                      <p className="skill-description">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;