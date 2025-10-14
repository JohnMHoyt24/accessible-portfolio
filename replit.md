# Accessible Portfolio Website

## Overview
A modern, engaging portfolio website built with React that prioritizes accessibility and inclusive design. This portfolio demonstrates best practices for creating web experiences that work for users with diverse abilities.

**Current State**: Full-stack application with React frontend and Express.js backend

**Last Updated**: October 14, 2025

## Technologies Used
- **React 19**: Modern React framework with hooks
- **Create React App (react-scripts)**: Build tooling and development server
- **Express.js**: Backend server for API endpoints
- **Resend**: Email service for contact form submissions
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
├── server.js           # Express backend server
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

### Key Components

**Frontend:**
1. **Navbar**: Navigation component for site sections
2. **About**: Introduction and bio section with portrait photo placeholder
3. **Skills**: Skills and expertise showcase
4. **Projects**: Portfolio projects display
5. **Contact**: Contact form component with side-by-side layout

**Backend:**
1. **server.js**: Express server with contact form API endpoint
2. **API Endpoints**:
   - `POST /api/contact`: Handles contact form submissions
   - `GET /api/health`: Health check endpoint

## Replit Configuration

### Workflows
**Frontend Workflow:**
- **Name**: React App
- **Command**: `npm start` with environment variables
- **Port**: 5000 (required for Replit webview)
- **Host**: 0.0.0.0 (allows Replit proxy access)
- **Host Check**: Disabled (required for Replit's iframe proxy)

**Backend Workflow:**
- **Name**: Backend Server
- **Command**: `npm run backend`
- **Port**: 3001 (localhost only, proxied by frontend)
- **Host**: localhost (not directly accessible)

### Environment Variables
**Frontend:**
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` - Allows Replit's proxy to access the dev server
- `PORT=5000` - Serves on port 5000 for Replit webview
- `HOST=0.0.0.0` - Binds to all interfaces

**Backend:**
- `BACKEND_PORT=3001` - Backend server port
- `RESEND_API_KEY` (optional) - API key for email sending via Resend
- `FROM_EMAIL` (optional) - Sender email address
- `TO_EMAIL` (optional) - Recipient email address (defaults to jmhoyt6355@gmail.com)

### Proxy Configuration
The React app is configured to proxy API requests to the backend:
- `package.json` contains `"proxy": "http://localhost:3001"`
- Frontend requests to `/api/*` are forwarded to the backend server

## Recent Changes
- **October 14, 2025**: Added backend with contact form functionality
  - Installed Express.js, cors, dotenv, and resend packages
  - Created Express backend server with contact form API endpoint
  - Updated Contact component to submit to backend API
  - Configured proxy to forward frontend API requests to backend
  - Set up dual workflows for frontend (port 5000) and backend (port 3001)
  - Changed About section profile image from circle to portrait rectangle
  - Repositioned Contact form to display side-by-side with contact info cards
  - Added error handling and status messages for form submissions
  - Backend gracefully handles missing RESEND_API_KEY (logs submissions instead)

- **October 10, 2025**: Initial Replit setup
  - Installed npm dependencies
  - Configured Create React App for Replit environment
  - Set up workflow with proper environment variables for proxy compatibility
  - Updated .gitignore with standard React patterns

## Development

### Available Scripts
- `npm start` - Runs the frontend development server
- `npm run backend` - Runs the backend server
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
- **Resend Integration**: User dismissed the official Resend connector setup. Email functionality uses Resend SDK directly with manual API key management. To enable email sending, add `RESEND_API_KEY` secret through Replit's secrets management.
- The backend runs on localhost:3001 and is proxied by the React dev server
- Without RESEND_API_KEY, the contact form logs submissions to console instead of sending emails
- The site uses Create React App's built-in development server for the frontend
- Replit's proxy serves the application to users in an iframe
- Both frontend and backend must be running for the contact form to work
