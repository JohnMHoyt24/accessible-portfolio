# Accessible Portfolio Website

## Overview
A modern, engaging portfolio website built with React that prioritizes accessibility and inclusive design. This portfolio demonstrates best practices for creating web experiences that work for users with diverse abilities.

**Current State**: Configured and ready to run in Replit environment

**Last Updated**: October 10, 2025

## Technologies Used
- **React 19**: Modern React framework with hooks
- **Create React App (react-scripts)**: Build tooling and development server
- **CSS3**: Custom styling with CSS Grid and Flexbox
- **HTML5**: Semantic markup for accessibility
- **JavaScript ES6+**: Modern JavaScript features

## Project Architecture

### Structure
```
/
├── public/              # Static assets
│   └── index.html      # HTML template
├── src/
│   ├── components/     # React components
│   │   ├── About.js/css
│   │   ├── Contact.js/css
│   │   ├── Navbar.js/css
│   │   ├── Projects.js/css
│   │   └── Skills.js/css
│   ├── App.js          # Main application component
│   ├── App.css         # Global app styles
│   ├── index.js        # Application entry point
│   └── index.css       # Base styles
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

### Key Components
1. **Navbar**: Navigation component for site sections
2. **About**: Introduction and bio section
3. **Skills**: Skills and expertise showcase
4. **Projects**: Portfolio projects display
5. **Contact**: Contact form component

## Replit Configuration

### Workflow
- **Name**: React App
- **Command**: `npm start` with environment variables
- **Port**: 5000 (required for Replit webview)
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Host Check**: Disabled (required for Replit's iframe proxy)

### Environment Variables
The workflow is configured with:
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` - Allows Replit's proxy to access the dev server
- `PORT=5000` - Serves on port 5000 for Replit webview
- `HOST=0.0.0.0` - Binds to all interfaces

## Recent Changes
- **October 10, 2025**: Initial Replit setup
  - Installed npm dependencies
  - Configured Create React App for Replit environment
  - Set up workflow with proper environment variables for proxy compatibility
  - Updated .gitignore with standard React patterns

## Development

### Available Scripts
- `npm start` - Runs the development server
- `npm build` - Creates production build
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App (not recommended)

### Accessibility Features
This portfolio emphasizes accessibility with:
- Semantic HTML markup
- Skip-to-content link for keyboard navigation
- ARIA labels and roles where appropriate
- Keyboard navigation support
- Screen reader friendly components

## Notes
- This is a frontend-only application with no backend
- All content is static and defined within the React components
- The site uses Create React App's built-in development server
- Replit's proxy serves the application to users in an iframe
