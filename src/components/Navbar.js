// Import React hooks for state management and side effects
import { useState, useEffect } from 'react';
// Import CSS styles for the navbar component
import './Navbar.css';

// Main Navbar component - a functional component that provides navigation for the portfolio
const Navbar = () => {
  // State to track whether the navbar should be sticky (fixed position when scrolling)
  const [isSticky, setIsSticky] = useState(false);
  // State to track which navigation section is currently active/selected
  const [activeSection, setActiveSection] = useState('about');
  // State to track whether the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // useEffect hook to handle scroll events and determine when navbar should become sticky
  useEffect(() => {
    // Function that runs on every scroll event
    const handleScroll = () => {
      // Get the current vertical scroll position from the top of the page
      const scrollTop = window.pageYOffset;
      // Set sticky state to true if user has scrolled more than 50 pixels from top
      setIsSticky(scrollTop > 50);
    };

    // Add scroll event listener to the window object
    window.addEventListener('scroll', handleScroll);
    // Cleanup function that removes the event listener when component unmounts
    // This prevents memory leaks by removing event listeners
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this effect only runs once on mount

  // Function to smoothly scroll to a specific section of the page
  const scrollToSection = (sectionId) => {
    // Find the DOM element with the matching ID
    const element = document.getElementById(sectionId);
    if (element) {
      // Scroll to the element with smooth animation
      element.scrollIntoView({
        behavior: 'smooth', // Animated scrolling instead of instant jump
        block: 'start'      // Align the top of the element with the top of the viewport
      });
    }
  };

  // Function to handle navigation button clicks
  const handleNavClick = (sectionId) => {
    // Update the active section state to highlight the clicked button
    setActiveSection(sectionId);
    // Scroll to the corresponding section on the page
    scrollToSection(sectionId);
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Return the JSX structure for the navigation bar
  return (
    <nav 
      // Apply CSS classes: base 'navbar' class plus 'sticky' class conditionally
      className={`navbar ${isSticky ? 'sticky' : ''}`}
      // Accessibility attributes for screen readers
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Container div to hold the navbar content */}
      <div className="navbar-container">
        {/* Brand/logo section of the navbar */}
        <div className="navbar-brand">
          <h1>John's World</h1>
        </div>
        
        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        {/* Navigation menu list */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`} role="menubar">
          {/* About Me navigation item */}
          <li role="none">
            <button
              // Apply CSS classes: base 'nav-link' class plus 'active' class conditionally
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              // Handle click to navigate to about section
              onClick={() => handleNavClick('about')}
              // Accessibility attributes
              role="menuitem"
              aria-current={activeSection === 'about' ? 'page' : undefined}
            >
              About Me
            </button>
          </li>
          <li>
            {/* Quotes navigation item */}
            <button
              className={`nav-link ${activeSection === 'quotes' ? 'active' : ''}`}
              onClick={() => handleNavClick('quotes')}
              role="menuitem"
              aria-current={activeSection === 'quotes' ? 'page' : undefined}
            >
              Quotes
            </button>
          </li>
          {/* My Skills navigation item */}
          <li role="none">
            <button
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
              onClick={() => handleNavClick('skills')}
              role="menuitem"
              aria-current={activeSection === 'skills' ? 'page' : undefined}
            >
              My Skills
            </button>
          </li>
          {/* Projects navigation item */}
          <li role="none">
            <button
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => handleNavClick('projects')}
              role="menuitem"
              aria-current={activeSection === 'projects' ? 'page' : undefined}
            >
              Projects
            </button>
          </li>
          {/* Contact Me navigation item */}
          <li role="none">
            <button
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => handleNavClick('contact')}
              role="menuitem"
              aria-current={activeSection === 'contact' ? 'page' : undefined}
            >
              Contact Me
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// Export the Navbar component as the default export
export default Navbar;
