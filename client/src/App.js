
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import 'normalize.css'
import Navbar from './components/Navbar';

import Loader from './components/Loader';




import { useState, useEffect } from 'react';

import store from './redux/store'
import jwt_decode from 'jwt-decode'
import { Logout, setUser } from './redux/actions/authActions';
import { useSelector } from 'react-redux';
import { setAuth } from './util/setAuth';

/* kif na3mil refresh maydi3ech el compte */
if (window.localStorage.jwt) {
  const decode = jwt_decode(window.localStorage.jwt)
  store.dispatch(setUser(decode))
  setAuth(window.localStorage.jwt)
  const currentDate = Date.now / 1000

  if (decode.exp > currentDate) {
    store.dispatch(Logout())
  }
}

export default function App() {
 

  const auth = useSelector(state => state.auth)
  const user = {
    isConnected: auth.isConnected,
    role: auth.user.role
  }
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000)
  }, [])
  return loader ? (
    <Loader />

  ) :
    (
    
      <div >
        <Router>
          <Navbar user={user} />

         
        

        </Router>


        <div>

        </div>

      </div>


    )
}