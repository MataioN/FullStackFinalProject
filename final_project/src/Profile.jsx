import {React, useState, useEffect} from 'react';
import axios from 'axios';

const Profile = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    useEffect(()=>{
        const token = localStorage.getItem('SignInToken');
        console.log(token);
        if (token) {
            const headers = {token: token};
            axios.get("http://localhost:3001/api/users/profile", { headers: headers })
            .then((response)=>{
                console.log(response);
                setData(response.data);
            }).catch((err)=>{
                console.log(err);
                setError(err);
            });

        }
    });
        

    return (
        <div className='main_div'>
        { error == null? (
        <div>
            <h1>Hi {data.Name} !</h1>
            <h3>Username: {data.Username}</h3>
            <h3>Email: {data.Email}</h3>
        </div>) : (
            <div>
                <h1>{error.message}</h1>
            </div>
        )}
        </div>
    );

};

export default Profile;