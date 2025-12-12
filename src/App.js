import Navbar from './components/Navbar';
import About from './components/About';
import Quotes from './components/Quotes';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <div className="App">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <About />
        <Quotes />
        <Skills />
        <Projects />
        <Contact />
        <ScrollToTop />
      </main>
    </div>
  );
}

export default App;
