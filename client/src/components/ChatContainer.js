/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { GetAllProfiles } from "../redux/actions/profileActions";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  const [arrivalMessage, setArrivalMessage] = useState(null);


  const auth = useSelector(state => state.auth)

  useEffect(async () => {
    const data = await auth.user
    const response = await axios.post("http://localhost:5000/api/getmsg", {
      from: data.id,
      to: currentChat._id,
     
    });
    setMessages(response.data);
  }, [currentChat]);
 

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
          await  auth.user.id
      }
    };
    getCurrentChat();
  }, [currentChat]);
 
  const handleSendMsg = async (msg) => {
    const data =auth.user
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data.id,
      msg,
    });
   
   
    await axios.post('http://localhost:5000/api/addmsg', {
      from: data.id,
      to: currentChat._id,
      message: msg,
     
    });
    socket.current.emit("sendNotification", {
      to: currentChat._id,
      from: data.id,
       msg,
    });
    const msgs = [...messages];
    
    msgs.push({ fromSelf: true, message: msg  });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
       
      });
     /* socket.current.on("getNotification", (msg) => {
        setnotif({ fromSelf: false, message: msg });

       
      });*/
    }
  }, []);

 
  const {id} =useParams()
  let profiles = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
 
 
   await dispatch(GetAllProfiles());
 
   // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

 /* useEffect(() => {
    notif && setMessages((prev) => [...prev, notif]);
      }, [notif]);

*/
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  //console.log(notif)
  return (
    <Container>
      <div className="chat-header  ">
        <div className="user-details">
      {currentChat.role==="CLIENT" ? 
      <img
      src={currentChat.avatarImage}
      alt=""
      className="w-14"
    /> :null
      }
 {currentChat.role==="LIVREUR" ? <>
 {profiles.profiles.map(({ user, avatar, }) => (
  <>
  {user._id=== id ? <img className="w-14"  src ={avatar} alt=""/> : null}
  </>
   
))}
 
 </>:null}
        


         
            
        
          <div className="username">
            <h3>{currentChat.fullname}</h3>
          </div>
        </div>
       
      </div>
      <div className="chat-messages mt-10">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
             
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg}  
 />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
     
      .username {
        h3 {
          color: #31525b;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: gray;
        width: 0.2rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: white;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #15114a;
      }
    }
    .recieved {
      justify-content: flex-start;
     
      .content {
        background-color: #072a40;
      }
    }
  }
`;


