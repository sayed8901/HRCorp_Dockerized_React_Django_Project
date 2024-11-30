import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// to load the page from the top each time
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
