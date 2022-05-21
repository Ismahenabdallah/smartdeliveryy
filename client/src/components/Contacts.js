/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";


export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isAvatar, setIsAvatar] =useState(false);
  const [currentRole ,setCurrentRole] = useState(undefined);
  const data = useSelector(state => state.auth)
  useEffect(async () => {
  
    setCurrentUserName(data.user.fullname);
    setCurrentUserImage(data.user.avatarImage);
    setCurrentRole(data.user.role);
    setIsAvatar(data.user.isAvatarImageSet)
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
return(
    <>
      {currentUserImage && currentUserImage && (
        <Container className="">
         
          <div className="contacts ">
            {contacts.map((contact, index) => {
             
              return (
              
                <div key={contact.id}>
               {currentRole === contact.role || contact.role === 'ADMIN'||
                 contact.isAvatarImageSet ===false      
               ?  
               
                  null
             
                : 
               <div
               className={`contact ${
                 index === currentSelected ? "selected" : ""
               }`}
               onClick={() => changeCurrentChat(index, contact)}
             >
               <img className="w-14"  src ={contact.avatarImage} alt=""/>
               <div className="username">
                 <h3>{contact.fullname}</h3>
               
               </div>
             </div>
               }
              
              
               
               </div>
              );
            })}
          </div>
          <div className="current-user mt-11">
          
              <img
                src={currentUserImage}
                alt="avatar"
                className="w-14"
              />
          
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
)






}

const Container = styled.div`
  display: grid;
  grid-template-rows: 70% 30% ;
  overflow: hidden;
  background-color: #080420;

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.2rem;
   
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.2rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      max-height: 4rem;
      cursor: pointer;
      width:100%;
      text-align:left;
      border-radius: 0.2rem;
      padding:1rem 3rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    height:5rem ;
   
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;






