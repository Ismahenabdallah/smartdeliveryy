import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import React from "react";
import Classnames from 'classnames'
function Inputs({name, placeholder, type, icon, onChangeHandler, errors, value}) {
  return (
    <div className=" mb-3">
     
      <div className="input-group">
        <span className="input-group-text">
          <i className={icon}></i>
        </span>
        <input type={type} placeholder={placeholder}  name={name} className={Classnames("form-control", {"is-invalid": errors})} onChange={onChangeHandler} value={value}/>
        {
          errors && (<div  className="invalid-feedback">
          {errors}
        </div>)
        }
      </div>
    </div>
  );
}

export default Inputs;
