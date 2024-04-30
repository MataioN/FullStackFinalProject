import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"

import LyricsPage from './LyricsPage';
import './Karaoke.css';
import axios from 'axios';
import cleanLyrics from './cleanLyrics';


function Karaoke() {
    const CLIENT_ID = 'af3f950385974164af122690fca30b26';
    const SCOPES = ['user-read-recently-played', 'user-top-read user-library-modify', 'user-library-read', 'playlist-read-private',  'playlist-read-collaborative', 'user-read-private' ];
    const REDIRECT_URI = "http://localhost:5173/Karaoke";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token" ;
    const [token, setToken] = useState("");
    const [userprofile, setProfile]= useState(null);
    
    useEffect(() => {
        // Check if the URL contains an access token (returned from Spotify authentication)
        const hashParams = window.location.hash.substring(1).split('&');
        const tokenParam = hashParams.find(param => param.startsWith('access_token='));

        if (tokenParam) {
            const accessToken = tokenParam.split('=')[1];
            setToken(accessToken);

            // Remove the access token from the URL
            window.history.pushState('', document.title, window.location.pathname);
        }
        
        const fetchProfile = async () => {
            try {
              const response = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
      
              setProfile(response.data);
            } catch (error) {
              console.error('Error fetching user profile:', error);
            }
          };
          fetchProfile();
    }, []);

    const getTopTracks = async () => {
        try{
            let data = await axios.get('https://api.spotify.com/v1/me/top/tracks?offset=0',{
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
              });
            console.log(data);
            
        }catch (error) {
            console.error('Error Fetching Data', error);
        }

    }

    const handleLogin = () => {
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join('%20')}`;
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        setToken('');
    };

    const [searchQuery, setSearchQuery] = useState(''); // Track user input
    const [responseData, setResponseData] = useState(null);
    const navigate = useNavigate();

    
    const handleSearch = async () => {
      try {
        const response = await fetch('/api', {
            method: "POST",
            
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({query: searchQuery}),
          // Send user input to Flask
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

  
        const data = await response.json();  // Get the JSON response
        setResponseData(data);  // Store the response data in state
        const cleanedLyrics = cleanLyrics(responseData.data);
        <LyricsPage data={cleanedLyrics} />
        navigate('/LyricsPage', {state: { lyrics: cleanedLyrics}});
        console.log('Responose', cleanedLyrics);// Process the response from Flask
      } catch (error) {
        console.error('Error during search:', error); // Handle errors
      }
    };

    const DisplayLyrics = ({ lyrics }) => {
        // Replace carriage returns with newline characters
        const cleanedLyrics = lyrics.replace(/\r/g, '\n');  // Convert \r to \n
      
        return (
          cleanedLyrics
        );
      };

    
    return (
        <div className= "main_div">
            <div >
            <h1>Karaoke</h1>
            </div>
        {!token ? (
                <button onClick={handleLogin}>Login to Spotify</button>
            ) : (
                <div >
                    <p>Successfully authenticated with Spotify!</p>
                    <button onClick={getTopTracks}>Get your top songs!</button>
                    <button onClick={handleLogout}>Logout</button>
                    <div>
                    {userprofile ? (
                    <div>
                    <h3>Hi {userprofile.display_name}</h3>
          
                        </div>
                    ) : (
                        <div></div>
                    )}
    </div>
                
                </div>
            )}
        <div class= "input_ovals">
        <div class="oval">
            <input type="text" class="oval-input" placeholder="Search for your favorite songs!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <button onClick={handleSearch}>Search</button>
        {/* {responseData && (
        <div>
          <h2>Search Result:</h2>
          <p><DisplayLyrics lyrics={responseData.data}/></p> 
        </div>
      )} */}
        <div class="upperOval">
            <input type="text" class="upperOval-input" placeholder="Join a Party" />
        </div>
        </div>
        </div>
    );
}

export default Karaoke;