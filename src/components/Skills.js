import "./Skills.css";
import {
  SiReact,
  SiNextdotjs,
  SiPython,
  SiTailwindcss,
  SiTypescript,
  SiDrupal,
  SiFastapi,
  SiGit,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages & Libraries",
      skills: [
        {
          name: "React",
          icon: SiReact,
          description: "JavaScript library for building user interfaces"
        },
        {
          name: "Next.js",
          icon: SiNextdotjs,
          description:
            "React-based web framework for building server-side rendered applications"
        },
        {
          name: "Python",
          icon: SiPython,
          description: "High-level programming language for general-purpose coding"
        },
        {
          name: "Tailwind CSS",
          icon: SiTailwindcss,
          description: "Utility-first CSS framework for rapid UI development"
        },
        {
          name: "TypeScript",
          icon: SiTypescript,
          description: "Superset of JavaScript that adds static types"
        },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        {
          name: "Drupal",
          icon: SiDrupal,
          description: "Content management system for building websites"
        },
        {
          name: "FastAPI",
          icon: SiFastapi,
          description: "Python framework for building APIs quickly"
        },
        {
          name: "Git",
          icon: SiGit,
          description:
            "Version control system for tracking changes in source code"
        },
        {
          name: "Node.js",
          icon: SiNodedotjs,
          description:
            "JavaScript runtime for building server-side applications"
        },
        { name: "PostgreSQL",
          icon: SiPostgresql,
          description: "Open-source relational database system"
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
                {category.skills.map((skill, skillIndex) => {
                  const SkillIcon = skill.icon;
                  return (
                    <div key={skillIndex} className="skill-card">
                      <div className="skill-content">
                        <h4 className="skill-name">
                          <SkillIcon className="skill-icon" aria-hidden="true" />
                          {skill.name}
                        </h4>
                        <p className="skill-description">{skill.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;