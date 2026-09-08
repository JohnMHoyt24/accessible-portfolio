import { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";
import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="scroll-to-top">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="scroll-button"
      >
        <FaChevronUp />
      </button>
    </div>
  );

}

export default ScrollToTop;