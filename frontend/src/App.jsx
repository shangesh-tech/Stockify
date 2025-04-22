import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const measurementId = "G-SFZVX02FV7";
ReactGA.initialize(measurementId);

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send("pageview", { page_path: location.pathname });
  }, [location]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
