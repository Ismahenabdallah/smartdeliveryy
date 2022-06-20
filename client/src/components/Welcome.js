/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
 
export default function Welcome() {
  const [userName, setUserName] = useState("");
  const data = useSelector(state => state.auth)
  useEffect(async () => {
    setUserName(
        await  data.user.fullname
    );
  }, []);
  return (
    <Container>
    
      <h1>
       Bienvenue, <span>{userName}!</span>
      </h1>
      <h3>Veuillez sélectionner un chat pour démarrer la messagerie.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 18rem;
  }
  span {
    color: #4e0eff;
  }
`;
