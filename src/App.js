import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Quotes from './components/Quotes';
import Skills from './components/Skills';
import Projects from './components/Projects';
import RecentlyPlayed from './components/RecentlyPlayed';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import useAdminSession from './hooks/useAdminSession';
import './App.css';

function App() {
  const [isRecentlyPlayedOpen, setIsRecentlyPlayedOpen] = useState(false);
  const adminSession = useAdminSession();

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar
        isRecentlyPlayedOpen={isRecentlyPlayedOpen}
        onToggleRecentlyPlayed={() => setIsRecentlyPlayedOpen((open) => !open)}
        adminSession={adminSession}
      />
      <main id="main-content" tabIndex={-1}>
        <About />
        <Quotes />
        <Skills />
        <Projects />
        <Contact />
        <ScrollToTop />
      </main>
      <RecentlyPlayed
        isOpen={isRecentlyPlayedOpen}
        onClose={() => setIsRecentlyPlayedOpen(false)}
        adminSession={adminSession}
      />
    </div>
  );
}

export default App;
