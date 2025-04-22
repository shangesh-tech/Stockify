import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from "./pages/Home";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'G-SFZVX02FV7', {
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
