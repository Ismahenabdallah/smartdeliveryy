var express = require("express");

const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
            if(err) return res.status(400).json({msg: "Invalid Authentication."})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}



const {
  Register,
  Login,
  verifyUser,
  forgotPassword,
  resetPassword


} = require('../controllers/users.controllers')
const ConditionProfile = require('../util/ConditionProfile')

var router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const { uploadAvatar, FindAllProfiles, FindSingleProfile, DeleteProfile, DetailsProfile } = require("../controllers/profile.controllers");
const { addMessage, getMessages } = require("../controllers/message.controller");
const { AddLocalisation } = require("../controllers/position.controllers");
/* users routes. */
router.post("/register", Register);
router.post("/login", Login);

router.get("/confirm/:confirmationCode", verifyUser)
router.post('/forget', forgotPassword)

router.post('/reset/',auth ,resetPassword)
/* get all profiles */
router.get("/allprofiles",
  passport.authenticate("jwt", { session: false }),
  
  FindAllProfiles);
/* get one profiles */
router.get("/profile",
  passport.authenticate("jwt", { session: false }),
  FindSingleProfile);
/* delete profiles */
router.delete("/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile);
router.get("/:id"  ,DetailsProfile)

//IMAGE UPLOAD CONFIGURATION
/* add profile route with image */
router.post('/add',passport.authenticate("jwt", { session: false }),ConditionProfile, uploadAvatar)

///chat 

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.post("/localisation", AddLocalisation);



module.exports = router;
