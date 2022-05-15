
  

import React, {  useState } from "react";
import styled from "styled-components";
import '../App.scss';
import axios from "axios";
import users1 from '../assets/users/user1.png'
import users2 from '../assets/users/user2.png'
import users3 from '../assets/users/user3.png'
import users4 from '../assets/users/user4.png'
import users5 from '../assets/users/user5.png'
import users6 from '../assets/users/user6.png'
import users7 from '../assets/users/user7.png'
import users8 from '../assets/users/user8.png'
import users9 from '../assets/users/user9.png'
import users10 from '../assets/users/user10.png'
import users11 from '../assets/users/user11.png'
import users12 from '../assets/users/user12.png'
import users13 from '../assets/users/user13.png'
import users14 from '../assets/users/user14.png'
import users15 from '../assets/users/user15.png'
import users16 from '../assets/users/user16.png'


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setAvatarRoute } from "../util/ApiRouter";
export default function SetAvatar() {
 
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([
   users1 ,users2 ,users3,users4,
   users5 ,users6 ,users7,users8,
   users9 ,users10 ,users11,users12,
   users13 ,users14 ,users15,users16,
  

  ]);

  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const auth = useSelector(state => state.auth)
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
    

      const { data } = await axios.post(`${setAvatarRoute}/${auth.user.id}`,{
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        auth.user.isAvatarImageSet = true;
        auth.user.avatarImage = data.image;
       
        navigate("/chat");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  

    


 return (
    <>
  
      
  
        <Container>
          <div className="title-container mt-16">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars space-y-0 space-x-0   ">
            {avatars.map((avatar, index) => {
              return (
               
                <div key={avatar}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                
                >
                  
                  <img
                  className=""
                     src={avatar}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
              
                </div>
               
              );
            })}
          </div>
          <button onClick={setProfilePicture} className=" mt-20 mb-10 submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 
  background-color: #131324;
  
  width: 100vw;

 

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    
    gap: 1rem;
    display: grid !important;
    grid-template-columns: auto auto auto auto  ;
  
    .avatar {
     
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
       
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
  
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
