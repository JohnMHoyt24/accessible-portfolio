import "./Skills.css";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Libraries",
      skills: [
        {
          name: "React",
          description: "JavaScript library for building user interfaces"
        },
        {
          name: "JavaScript",
          description:
            "Programming language for making web projects interactive"
        },
        {
          name: "HTML5",
          description: "Markup language for structuring web content"
        },
        {
          name: "CSS3",
          description: "Styling language for designing web layouts"
        },
        {
          name: "TypeScript",
          description: "Superset of JavaScript that adds static types"
        },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        {
          name: "Drupal",
          description: "Content management system for building websites"
        },
        {
          name: "Git",
          description:
            "Version control system for tracking changes in source code"
        },
        {
          name: "Node.js",
          description:
            "JavaScript runtime for building server-side applications"
        },
        { name: "NPM", 
          description: "Package manager for JavaScript"
        },
        { name: "SQL",
          description: "Structured Query Language for managing relational databases"
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