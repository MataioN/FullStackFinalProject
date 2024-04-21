import React, { useState, useEffect } from 'react';

import './Karaoke.css';

function Karaoke() {
    const CLIENT_ID = 'af3f950385974164af122690fca30b26';
    const SCOPES = ['user-read-recently-played', 'user-top-read user-library-modify', 'user-library-read', 'playlist-read-private',  'playlist-read-collaborative' ];
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token" ;
    const [token, setToken] = useState("");

    /**useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            const accessTokenParam = hash.substring(1).split("&").find(elem => elem.startsWith("access_token"));
            if (accessTokenParam) {
                token = accessTokenParam.split("=")[1];

                // Clear the hash part of the URL
                window.location.hash = "";
                window.localStorage.setItem("token", token);
            } else {
                console.error("Access token not found in hash:", hash);
        }
        }

        setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    } **/

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
    }, []);

    const handleLogin = () => {
        const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join('%20')}`;
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        setToken('');
    };

    return (
        <><div>
            <h1>Karaoke</h1>
        </div>
        {!token ? (
                <button onClick={handleLogin}>Login to Spotify</button>
            ) : (
                <div>
                    <p>Successfully authenticated with Spotify!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        <div class="oval">
            <input type="text" class="oval-input" placeholder="Search for your favorite songs!" />
        </div>
        <div class="upperOval">
            <input type="text" class="upperOval-input" placeholder="Join a Party" />
        </div>
        </>
    );
}

export default Karaoke;