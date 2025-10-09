import React from 'react';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML5', level: 98 },
        { name: 'CSS3', level: 92 },
        { name: 'TypeScript', level: 85 }
      ]
    },
    {
      title: 'Accessibility & UX',
      skills: [
        { name: 'WCAG Guidelines', level: 95 },
        { name: 'Screen Reader Testing', level: 90 },
        { name: 'ARIA Implementation', level: 88 },
        { name: 'User Research', level: 85 },
        { name: 'Usability Testing', level: 87 }
      ]
    },
    {
      title: 'Tools & Technologies',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Node.js', level: 80 },
        { name: 'Webpack', level: 75 },
        { name: 'Jest', level: 85 },
        { name: 'Figma', level: 70 }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="skills-header">
          <h2>My Skills</h2>
          <p className="skills-subtitle">
            A comprehensive overview of my technical abilities and expertise areas
          </p>
        </div>
        
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage" aria-label={`${skill.level} percent`}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-label={`${skill.name} skill level: ${skill.level} percent`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="skills-summary">
          <h3>Key Strengths</h3>
          <div className="strengths-grid">
            <div className="strength-item">
              <div className="strength-icon" aria-hidden="true">♿</div>
              <h4>Accessibility Champion</h4>
              <p>Passionate about creating inclusive digital experiences for all users</p>
            </div>
            <div className="strength-item">
              <div className="strength-icon" aria-hidden="true">⚡</div>
              <h4>Performance Optimizer</h4>
              <p>Focused on building fast, efficient, and scalable applications</p>
            </div>
            <div className="strength-item">
              <div className="strength-icon" aria-hidden="true">🎨</div>
              <h4>User Experience Designer</h4>
              <p>Creating intuitive and engaging user interfaces that delight users</p>
            </div>
            <div className="strength-item">
              <div className="strength-icon" aria-hidden="true">🔧</div>
              <h4>Problem Solver</h4>
              <p>Approaching challenges with creativity and systematic thinking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
