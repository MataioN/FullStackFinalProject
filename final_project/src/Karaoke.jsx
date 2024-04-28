import React, { useState, useEffect } from 'react';
import './Karaoke.css';
import axios from 'axios';

function Karaoke() {
    const CLIENT_ID = 'af3f950385974164af122690fca30b26';
<<<<<<< HEAD
    const SCOPES = ['user-read-recently-played', 'user-top-read user-library-modify', 'user-library-read', 'playlist-read-private', 'playlist-read-collaborative', 'user-read-private'];
    const REDIRECT_URI = "http://localhost:5173/";
=======
    const SCOPES = ['user-read-recently-played', 'user-top-read user-library-modify', 'user-library-read', 'playlist-read-private',  'playlist-read-collaborative', 'user-read-private' ];
    const REDIRECT_URI = "http://localhost:5173/Karaoke";
>>>>>>> 1b8ccdd937143c01f955d753acba95d1abcc82a1
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const [token, setToken] = useState("");
    const [userProfile, setProfile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');  // Track the input value

    useEffect(() => {
        // Extract token from URL hash
        const hashParams = window.location.hash.substring(1).split('&');
        const tokenParam = hashParams.find(param => param.startsWith('access_token='));
        if (tokenParam) {
            const accessToken = tokenParam.split('=')[1];
            setToken(accessToken);
            window.history.pushState('', document.title, window.location.pathname);
        }
        
        if (token) {
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
        }
    }, [token]);

    const getTopTracks = async () => {
        try {
            const data = await axios.get('https://api.spotify.com/v1/me/top/tracks?offset=0', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(data);
        } catch (error) {
            console.error('Error fetching top tracks:', error);
        }
    };

    const handleLogin = () => {
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join('%20')}`;
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        setToken('');
    };

    // Function to send the search query to the backend
    const searchSongs = async () => {
        try {
            const response = await axios.post('/search', {
                query: searchQuery,
            });
            console.log('Search results:', response.data);  // Handle search results
        } catch (error) {
            console.error('Error during search:', error);
        }
    };

    return (
<<<<<<< HEAD
        <>
            <div>
                <h1>Karaoke</h1>
            </div>
            {!token ? (
=======
        <div class= "main_div">
            <div >
            <h1>Karaoke</h1>
            </div>
        {!token ? (
>>>>>>> 1b8ccdd937143c01f955d753acba95d1abcc82a1
                <button onClick={handleLogin}>Login to Spotify</button>
            ) : (
                <div >
                    <p>Successfully authenticated with Spotify!</p>
                    <button onClick={getTopTracks}>Get your top songs!</button>
                    <button onClick={handleLogout}>Logout</button>
                    {userProfile ? (
                        <div>
                            <h3>Hi {userProfile.display_name}</h3>
                        </div>
                    ) : null}
                </div>
            )}
<<<<<<< HEAD
            
            <div className="oval">
                <input
                    type="text"
                    id="search-input"
                    className="oval-input"
                    placeholder="Search for your favorite songs!"
                    value={searchQuery}  // Bind the input value to state
                    onChange={(e) => setSearchQuery(e.target.value)}  // Update state on input change
                />
            
            
                <button onClick={searchSongs}>Search</button>  
            </div>
            
            <div className="upperOval">
                <input
                    type="text"
                    className="upperOval-input"
                    placeholder="Join a Party"
                />
            </div>
        </>
=======
        <div class= "input_ovals">
        <div class="oval">
            <input type="text" class="oval-input" placeholder="Search for your favorite songs!" />
        </div>
        <div class="upperOval">
            <input type="text" class="upperOval-input" placeholder="Join a Party" />
        </div>
        </div>
        </div>
>>>>>>> 1b8ccdd937143c01f955d753acba95d1abcc82a1
    );
}

export default Karaoke;
