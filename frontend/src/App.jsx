import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Home from './pages/Home';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const measurementId = 'G-SFZVX02FV7';
ReactGA.initialize(measurementId);

const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page_path: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <TrackPageView />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
