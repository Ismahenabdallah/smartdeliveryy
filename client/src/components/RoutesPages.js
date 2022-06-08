import { Routes, Route } from 'react-router-dom';
import Admin from "../pages/Admin";
import Chat from "../pages/Chat";
import DetailProfile from "../pages/DetailProfile";
import Home from "../pages/Home";
import InterfaceLivreur from "../pages/InterfaceLivreur";
import Login from "../pages/Login";
import MyProfile from "../pages/MyProfile";
import NoAccess from "../pages/NoAccess";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Search from "../pages/Search";
import Suivi from "../pages/Suivi";
import UpdateProfile from "../pages/UpdateProfile";
import AdminRouter from "./AdminRouter";
import AjouterCl from "./AjouterCl";
import AjouterL from "./AjouterL";
import ForceRedirect from "./ForceRedirect";
import ForgetPassword from "./forgetPassword";
import PrivateRouterClient from "./PrivateRouterClient";
import PrivateRouterLivreur from "./PrivateRouterLivreur";
import ResetPassword from "./ResetPassword";
import SendEmail from "./SendEmail";
import SetAvatar from "./SetAvatar";

export default function RoutesPages ({ user}){
    return(
        <div>
 <Routes >
        <Route path='/' exact element={<Home user={user} />} />
    
        <Route path='/login' exact element={<ForceRedirect user={user}>
          <Login  />
        </ForceRedirect>
        } />

        <Route path='/register' exact element={<ForceRedirect user={user}><Register /></ForceRedirect>} />

        <Route path='/interfaceClient' exact element={
          <PrivateRouterClient user={user}>
            <Search />
          </PrivateRouterClient>


        } />
         
       
       
        <Route path='*' exact element={<NotFound  />} />
     
        <Route path='/noacc' exact element={<NoAccess />} />
        <Route path='/suivi' exact element={
       <PrivateRouterClient user={user}>
    <Suivi />
      </PrivateRouterClient>} />
        <Route path='/ajoutercl' exact element={
        <AdminRouter user={user}>
      <AjouterCl/>
      </AdminRouter>} />
        <Route path='/ajouterl' exact element={
        <AdminRouter user={user}>
     <AjouterL/>
      </AdminRouter>} />

        <Route path='/addprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <InterfaceLivreur />
          </PrivateRouterLivreur>
        } />
        <Route path='/updateprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <UpdateProfile />
          </PrivateRouterLivreur>
        } />
         
        
         <Route path='/myprofile' exact element={
          <PrivateRouterLivreur user={user}>
            <MyProfile />
          </PrivateRouterLivreur>
        } /> 
     
<Route path="/confirm/:confirmationCode" element={<SendEmail user={user}/>} />

<Route path="/forget" element={<ForgetPassword/>} exact />
<Route path="/reset/:token" element={<ResetPassword/>} exact />


        <Route path='/admin' exact element={
          <AdminRouter user={user}>
            <Admin />
          </AdminRouter>
        } />
  <Route path="/setavatar" exact element={
           
           <SetAvatar/>
       
      } />
      <Route path='/:id' exact element={ 
          
            <PrivateRouterClient user={user}>
           <DetailProfile />
           </PrivateRouterClient>}
/>
     
     
    
      <Route path="/chat/:id" exact element={
     <PrivateRouterClient user={user}>
    < Chat />
   </PrivateRouterClient>
} />
       
      <Route path="/chat" exact element={
     <PrivateRouterLivreur user={user}>
   < Chat />
   </PrivateRouterLivreur> } />

      </Routes>


        </div>
           
    )
}