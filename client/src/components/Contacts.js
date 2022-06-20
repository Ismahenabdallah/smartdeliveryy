/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { GetAllProfiles } from "../redux/actions/profileActions";


export default function Contacts({ contacts, changeChat, socket }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentRole, setCurrentRole] = useState(undefined);
  const [currentid, setCurrentid] = useState(undefined);
  const data = useSelector(state => state.auth);
  const [notif, setnotif] = useState([]);
  useEffect(() => {

    if (socket.current) {
      socket.current.on("getNotification", (msg) => {
        setnotif((prev) => [...prev, msg]);


      });

    }
  }, [socket.current]);
  const { id } = useParams()
  const handleRead = () => {
    setnotif([]);

  };
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {


    await dispatch(GetAllProfiles());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(async () => {

    setCurrentUserName(data.user.fullname);
    setCurrentUserImage(data.user.avatarImage);
    setCurrentRole(data.user.role);
    setCurrentid(data.user.id);


  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  let profiles = useSelector((state) => state.profiles);


  return (
    <>

      <Container className="bg-slate-400">

        <div className="contacts ">
          {contacts.map((contact, index) => {

            return (

              <div key={contact._id}>
                {currentRole === "CLIENT" ?
                  <>
                    {currentRole === contact.role || contact.role === 'ADMIN' ||
                /* contact.isAvatarImageSet ===false  ||*/ id !== contact._id
                      ?

                      null

                      :
                      <div
                        className={`contact ${index === currentSelected ? "selected" : ""
                          }`}
                        onClick={() => changeCurrentChat(index, contact)}
                      >
                        {

                          profiles.profiles.map(({ user, avatar, }) => (
                            <>
                              {id === user._id ? <img className="w-14" src={avatar} alt="" /> : null}
                            </>

                          ))}




                        <div className="username flex " onClick={handleRead}>


                          {index === currentSelected ? <h3>{contact.fullname}</h3> :

                            <>
                              {/* notif.length ===0 ?   : 
               <div className="flex">
                 <h3>{contact.fullname}</h3> <span class="badge  h-5 bg-secondary badge-secondary">{notif.length}</span>
               </div> 
              */}

                              {notif.length > 0 ?
                                <div className="flex">
                                  <h3>{contact.fullname}</h3> <span class="badge  h-5 bg-secondary badge-secondary">{notif.length}</span>
                                </div> : <h3>{contact.fullname}</h3>
                              }
                            </>
                          }








                        </div>
                      </div>
                    }

                  </> : null}
                {currentRole === "LIVREUR" ?
                  <>
                   
                      {currentRole === contact.role || contact.role === 'ADMIN' ||
                        contact.isAvatarImageSet === false
                        ?

                        null

                        :
                        <div
                          className={`contact ${index === currentSelected ? "selected" : ""
                            }`}
                          onClick={() => changeCurrentChat(index, contact)}
                        >
                          <img className="w-14" src={contact.avatarImage} alt="" />
                          <div className="username flex " onClick={handleRead}>


                            {index === currentSelected ? <h3>{contact.fullname}</h3> :

                              <>
                                {notif.length === 0 ? <h3>{contact.fullname}</h3> :
                                  <div className="flex">
                                    <h3>{contact.fullname}</h3> <span class="badge  h-5 bg-secondary badge-secondary">{notif.length}</span>
                                  </div>
                                }
                              </>
                            }








                          </div>
                        </div>
                      }


                  </> : null}

              </div>
            );
          })}
        </div>
        <div className="current-user bg-slate-500 mt-11">

          {currentRole === "CLIENT" ?
            <img
              src={currentUserImage}
              alt="avatar"
              className="w-14"
            /> : null}
          {currentRole === "LIVREUR" ?
            <>
              {

                profiles.profiles.map(({ user, avatar, }) => (
                  <>
                    {user._id === currentid ? <img className="w-14" src={avatar} alt="" /> : null}
                  </>

                ))}
            </> : null
          }


          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>

    </>
  )






}

const Container = styled.div`
  display: grid;
  grid-template-rows: 70% 30% ;
  overflow: hidden;
  //background-color: #080420;

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.2rem;
   
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: gray;
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
          color: #31525b;
          width:100%;
        }
      }
    }
    .selected {
      background-color: #e0e5e9;
    }
  }

  .current-user {
   // background-color: #0d0d30;
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






