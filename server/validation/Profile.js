const isEmpty = require("./isEmpty");
const validator = require("validator");
const { body } = require('express-validator');
module.exports = function ValidateProfile(data) {
  let errors = {};

 
  data.adress_actuel = !isEmpty(data.adress_actuel) ? data.adress_actuel : "";

  data.matricule_voiture = !isEmpty(data.matricule_voiture) ? data.matricule_voiture : "";
  data.type_voiture = !isEmpty(data.type_voiture) ? data.type_voiture : "";
  data.poids = !isEmpty(data.poids) ? data.poids : "";


 
/*
  if ((data.matricule_voiture).length > 8 || (data.matricule_voiture).length < 8) {
    errors.matricule_voiture = " Must be 8 number ";
  }
*/
  if (validator.isEmpty(data.adress_actuel)) {
    errors.adress_actuel = "Required adress_actuel";
  }


  if (validator.isEmpty(data.matricule_voiture)) {
    errors.matricule_voiture = "Required maticule";
  }

  if (validator.isEmpty(data.type_voiture)) {
    errors.type_voiture = "Required type";
  } if (validator.isEmpty(data.poids)) {
    errors.poids = "Required poids";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};
