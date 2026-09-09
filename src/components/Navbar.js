// Import React hooks for state management and side effects
import { useState, useEffect, useRef } from 'react';
// Icon for the Recently Played dropdown toggle
import { FaMusic } from 'react-icons/fa';
// Import CSS styles for the navbar component
import './Navbar.css';

// Main Navbar component - a functional component that provides navigation for the portfolio
const Navbar = ({ isRecentlyPlayedOpen, onToggleRecentlyPlayed, adminSession }) => {
  // State to track whether the navbar should be sticky (fixed position when scrolling)
  const [isSticky, setIsSticky] = useState(false);
  // State to track which navigation section is currently active/selected
  const [activeSection, setActiveSection] = useState('about');
  // State to track whether the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to track whether the horizontal nav options are collapsed (desktop view)
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  // State for the admin login popover next to the site title
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLoginForm, setAdminLoginForm] = useState({ username: '', password: '' });
  // Ref to the Recently Played toggle button, used to restore focus when its dropdown closes
  const recentlyPlayedButtonRef = useRef(null);
  const wasRecentlyPlayedOpen = useRef(false);
  const adminLoginRef = useRef(null);

  const {
    isAuthenticated: isAdminAuthenticated,
    login: adminLogin,
    logout: adminLogout,
    error: adminLoginError,
    isLoading: isAdminLoggingIn,
  } = adminSession;

  // Return focus to the toggle button once the Recently Played dropdown closes
  useEffect(() => {
    if (wasRecentlyPlayedOpen.current && !isRecentlyPlayedOpen) {
      recentlyPlayedButtonRef.current?.focus();
    }
    wasRecentlyPlayedOpen.current = isRecentlyPlayedOpen;
  }, [isRecentlyPlayedOpen]);

  // Close the admin login popover on outside click or Escape
  useEffect(() => {
    if (!showAdminLogin) return;

    const handleClickOutside = (e) => {
      if (adminLoginRef.current && !adminLoginRef.current.contains(e.target)) {
        setShowAdminLogin(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowAdminLogin(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showAdminLogin]);

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    const success = await adminLogin(adminLoginForm.username, adminLoginForm.password);
    if (success) {
      setAdminLoginForm({ username: '', password: '' });
      setShowAdminLogin(false);
    }
  };

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

  // Function to toggle the horizontal nav options open/closed
  const toggleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
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
        <div className="navbar-brand navbar-title">
          <h1>John's World</h1>

          {/* Admin login control, next to the site title */}
          <div className="navbar-admin" ref={adminLoginRef}>
            {isAdminAuthenticated ? (
              <button type="button" className="navbar-admin-button" onClick={adminLogout}>
                Log out (admin)
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="navbar-admin-button"
                  onClick={() => setShowAdminLogin((v) => !v)}
                  aria-haspopup="dialog"
                  aria-expanded={showAdminLogin}
                >
                  Admin Login
                </button>
                {showAdminLogin && (
                  <form
                    className="navbar-admin-login"
                    onSubmit={handleAdminLoginSubmit}
                    role="dialog"
                    aria-label="Admin login"
                  >
                    <label className="sr-only" htmlFor="nav-admin-username">
                      Username
                    </label>
                    <input
                      id="nav-admin-username"
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      value={adminLoginForm.username}
                      onChange={(e) =>
                        setAdminLoginForm((f) => ({ ...f, username: e.target.value }))
                      }
                      required
                    />
                    <label className="sr-only" htmlFor="nav-admin-password">
                      Password
                    </label>
                    <input
                      id="nav-admin-password"
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={adminLoginForm.password}
                      onChange={(e) =>
                        setAdminLoginForm((f) => ({ ...f, password: e.target.value }))
                      }
                      required
                    />
                    <button type="submit" disabled={isAdminLoggingIn}>
                      {isAdminLoggingIn ? 'Logging in…' : 'Log in'}
                    </button>
                    {adminLoginError && (
                      <p role="alert" className="navbar-admin-login-error">
                        {adminLoginError}
                      </p>
                    )}
                  </form>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="navbar-menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Wrapper grouping the collapse toggle with the horizontal menu it controls */}
        <div className="navbar-menu-group">
          {/* Button that opens the Recently Played dropdown */}
          <button
            ref={recentlyPlayedButtonRef}
            className="navbar-recently-played-toggle"
            onClick={onToggleRecentlyPlayed}
            aria-label="Recently played tracks"
            aria-haspopup="dialog"
            aria-expanded={isRecentlyPlayedOpen}
          >
            <FaMusic aria-hidden="true" />
            <span className="navbar-tooltip" role="tooltip">Recently played</span>
          </button>

          {/* Button that collapses/expands the horizontal nav options */}
          <button
            className="navbar-collapse-toggle"
            onClick={toggleNavCollapse}
            aria-expanded={!isNavCollapsed}
            aria-controls="navbar-menu"
            aria-label={isNavCollapsed ? 'Show navigation options' : 'Hide navigation options'}
          >
            <span className={`collapse-icon ${isNavCollapsed ? 'collapsed' : ''}`} aria-hidden="true"></span>
            <span className="navbar-tooltip" role="tooltip">View options</span>
          </button>

          {/* Navigation menu list */}
          <ul
            id="navbar-menu"
            className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''} ${isNavCollapsed ? 'collapsed' : ''}`}
          >
            {/* About Me navigation item */}
            <li>
              <button
                // Apply CSS classes: base 'nav-link' class plus 'active' class conditionally
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                // Handle click to navigate to about section
                onClick={() => handleNavClick('about')}
                aria-current={activeSection === 'about' ? 'true' : undefined}
              >
                About Me
              </button>
            </li>
            <li>
              {/* Quotes navigation item */}
              <button
                className={`nav-link ${activeSection === 'quotes' ? 'active' : ''}`}
                onClick={() => handleNavClick('quotes')}
                aria-current={activeSection === 'quotes' ? 'true' : undefined}
              >
                Quotes
              </button>
            </li>
            {/* My Skills navigation item */}
            <li>
              <button
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={() => handleNavClick('skills')}
                aria-current={activeSection === 'skills' ? 'true' : undefined}
              >
                My Skills
              </button>
            </li>
            {/* Projects navigation item */}
            <li>
              <button
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects')}
                aria-current={activeSection === 'projects' ? 'true' : undefined}
              >
                Projects
              </button>
            </li>
            {/* Contact Me navigation item */}
            <li>
              <button
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick('contact')}
                aria-current={activeSection === 'contact' ? 'true' : undefined}
              >
                Contact Me
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component as the default export
export default Navbar;
