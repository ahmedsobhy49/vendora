import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// called in admin layout component
export default function ScrollToTopOnRoute() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
