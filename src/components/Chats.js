import React,{ useState, useEffect  } from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading]=useState(true);
    console.log(user);
    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data=await response.blob();

        return new File([data],"userPhoto.jpg", { type: 'image/jpeg'}) ;

    }

 useEffect( () => {

    if(!user) {
        history.push('/');
        return;
    }
    axios.get('https://api.chatengine.io/users/me/', {
    headers: { 
        "project-id": "c27ad32f-0ce7-4bdf-9e56-2c2b201b4372",
        "user-name": user.email,
        "user-secret": user.uid,
         }
     })
     .then(() => {
         setLoading(false);
     })
     .catch(() => {
         let formdata= new FormData();
         formdata.append('email', user.email);
         formdata.append('username', user.email);
         formdata.append('secret', user.uid);

         getFile(user.photoURL)
         .then((avatar) => {
            formdata.append('avatar', avatar,avatar.name);

            axios.post('https://api.chatengine.io/users/', 
            formdata, 
            {headers: { "private-key": "a71b17e5-8c5c-44fe-ba63-b720522e0d35"}}
            
            )
            .then(() => setLoading(false))
            .catch((error) => console.log(error))
         })
     })

 }, [user, history] );

    if(!user) return 'Loading...';

    return (
      <div className="chats-page">
          <div className="nav-bar">
              <div className="logo-tab">
                  Chat-App
              </div>
              <div onClick ={handleLogout} className="logout-tab">
                  Logout
                  </div>
            </div>

            <ChatEngine height="calc(100vh-66px)"
            projectID="
            c27ad32f-0ce7-4bdf-9e56-2c2b201b4372"
            userName={user.email}
            userSecret={user.uid}
            />
      </div>
    );
}

export default Chats;