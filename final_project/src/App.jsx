import { useState } from 'react';

import './App.css';
import Karaoke from './Karaoke';
import Home from './Home';
//import SignUp from './SignUp';
//import LogIn from './LogIn';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showTabs, setShowTabs] = useState(true); // Control tab visibility

  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setShowTabs(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'Sign Up':
        return <SignUp />; 
      case 'Karaoke':
        return <Karaoke />; 
      case 'Log In':
        return <LogIn />;
      default: 
        return null;
    }
  };
// PUT LOGO IN OURLOGO SECTION
  return (
    <>
    <div class="ourLogo">  
      LOGO HERE 
    </div> 

       {showTabs && ( // Only render tabs if `showTabs` is true
        <div className="container">
          <div className="tabs">
            <button onClick={() => handlePageChange('Karaoke')}>Karaoke</button>
            <button onClick={() => handlePageChange('Sign Up')}>Sign Up</button>
            <button onClick={() => handlePageChange('Log In')}>Log In</button>
          </div>
        </div>
      )}
      {renderPage()}

    </>
  );
}

export default App;