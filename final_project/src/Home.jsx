import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="main_div">
      <h1>Harmonize</h1>
    </div>
  );
};

export default Home;