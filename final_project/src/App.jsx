import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


import './App.css';
import Karaoke from './Karaoke';
import Home from './Home';
import Account from './Account';
import './background.css';
import Login from './Login';
import Signup from './Signup';
import Navbar from './Navbar';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showTabs, setShowTabs] = useState(true); // Control tab visibility

  
  const handlePageChange = (page) => {
    setCurrentPage(page);gi
    setShowTabs(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'Karaoke':
        return <Karaoke />; 
      case 'Account':
        return <Account />;
      default: 
        return null;
    }
  };
// PUT LOGO IN OURLOGO SECTION
  return (
    <div className = "background">
        <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
   <span className = "animation"></span>
    
    {/*
    <Router>
    <div class="ourLogo">  
      LOGO HERE 
    </div> 

       {showTabs && ( // Only render tabs if `showTabs` is true
        <div className="container">
          <div className="tabs">
            <button onClick={() => handlePageChange('Account')}>Account</button>
            <button onClick={() => handlePageChange('Karaoke')}>Karaoke</button>
          </div>
        </div>
      )}
      {renderPage()}

      <Routes>
        <Route path="/account" element={<Account />} />  Route for the login/sign up page 
      </Routes>
    </Router>
    
    */}
    <Navbar/>
      <div>
    <Routes>        
      <Route path="/Home"  element={<Home/>} />
      <Route path="/Karaoke"  element={<Karaoke/>} />
      <Route path="/Signup"  element={<Signup />}/>
      <Route path="/Login"  element={<Login/>}/>
    </Routes>
    </div>
    </div>
  );
}

export default App;