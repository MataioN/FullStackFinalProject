import React, { useState, useRef, useEffect } from 'react';

function Menu(){
    const [isOpen, setIsOpen] = useState(False);
    const menuRef = useRef(null)
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
          <button onClick={toggleMenu}>Logo</button>
          {isOpen && (
            <div ref={menuRef} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
              <button onClick={toggleMenu}>Logo</button>
        
            </div>
          )}
        </div>
      );


}

export default Menu;