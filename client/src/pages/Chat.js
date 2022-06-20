/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

import Contacts from "../components/Contacts.js";
import { useSelector } from "react-redux";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";


export default function Chat() {

  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const auth = useSelector(state => state.auth)

  useEffect(async () => {


    await setCurrentUser(auth.user);

  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser.id);
    }
  }, [currentUser]);
  useEffect(async () => {
    if (currentUser) {
      if (currentUser.role === "CLIENT") {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`http://localhost:5000/api/allusers/${currentUser.id}`);
          setContacts(data.data);
        } else {
          navigate("/setavatar");
        }
      }
      if (currentUser.role === "LIVREUR") { 
        const data = await axios.get(`http://localhost:5000/api/allusers/${currentUser.id}`);
        setContacts(data.data);
      }
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  //console.log(contacts)
  return (
    <>
      <Container className="dark:bg-slate-900  overflow-x-hidden  mt-14 " >
        <div className="container  bg-slate-300  dark:bg-slate-900 mt-11">
          <Contacts contacts={contacts} changeChat={handleChatChange} socket={socket} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  //background-color: #131324;
 
  .container {
    height: 85vh;
    width: 85vw;
   // background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;