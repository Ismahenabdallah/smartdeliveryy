import React from "react";
import { useDispatch } from "react-redux";
import { DeleteProfile } from "../redux/actions/profileActions";

function RowDetails({_id, user, image,  tel, cin,adress_actuel,matricule_voiture, type_voiture,poids}) {
   const dispatch =  useDispatch()
    const DeleteHandler = (id)=>{
      dispatch(DeleteProfile(id))
    }
  return (
    <tr key={_id}>
   
      <td>{user.fullname}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
     <td><img className="h-14 w-14" src={`/client/public/ImageProfile/${image}`} alt=""/>
</td>
      <td>{tel}</td>
      <td>{cin}</td>
      <td>{adress_actuel}</td>
      <td>{matricule_voiture}</td>
      <td>{type_voiture}</td>
      <td>{poids}</td>
      
      <td>
        <button className="btn btn-outline-danger" onClick={()=>DeleteHandler(_id)}>Delete</button>
      </td>
    </tr>
  );
}

export default RowDetails;