import React, { useState, useEffect } from 'react';

import './Karaoke.css';

function Karaoke() {
    const clientId = 'af3f950385974164af122690fca30b26';
    const scope = 'user-read-recently-played user-top-read user-library-modify user-library-read playlist-read-private playlist-read-collaborative' 
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token" 
    const [token, setToken] = useState("")

    useEffect(() => {
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
    }

    return (
        <><div>
            <h1>Karaoke</h1>
        </div>
        {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${scope}`}>Login to Spotify</a>
                    : <button onClick={logout}>Logout</button>}

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