import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate , useLocation} from 'react-router-dom';

import './LyricsPage.css';

const LyricsPage = (props) => {
    const location = useLocation();  // Retrieve the state from navigation
    const { lyrics } = location.state || {};  
    return (
        <div className="main_div">
        <div className="lyrics-page">
      <h2>Lyrics Page</h2>
      {lyrics ? (
        <pre>{lyrics}</pre>  // Display the lyrics
      ) : (
        <p>No lyrics found</p>  // Fallback if no data
      )}
    </div>
    </div>
    );
  };
export default LyricsPage;