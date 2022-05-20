var express = require("express");

const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(400).json({ msg: "Invalid Authentication." })

    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication." })

      req.user = user
      next()
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}


const {
  Register,
  Login,
  verifyUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  setAvatar,
  AllUsers,
  DeleteUser,
  RegisterL,
  RegisterC

} = require('../controllers/users.controllers')
const ConditionProfile = require('../util/ConditionProfile')

var router = express.Router();
const passport = require("passport");
const { ROLES, inRole } = require("../security/Rolemiddleware");
const { uploadAvatar, FindAllProfiles, FindSingleProfile, DeleteProfile, DetailsProfile, likes } = require("../controllers/profile.controllers");
const { addMessage, getMessages } = require("../controllers/message.controller");

const { AddLocalisation, FindLocation } = require("../controllers/localisation.c.js");


/* users routes. */
router.post("/register", Register);
router.post("/liv", RegisterL);
router.post("/cli", RegisterC);
router.post("/login", Login);

router.get("/confirm/:confirmationCode", verifyUser)
router.post('/forget', forgotPassword)

router.post('/reset/', auth, resetPassword)
/* localisation router */
router.post("/localisation", AddLocalisation);
router.get("/localisation/", FindLocation);

/* get all profiles */
router.get("/allprofiles",
  passport.authenticate("jwt", { session: false }),

  FindAllProfiles);
  router.get("/users",
 // passport.authenticate("jwt", { session: false }),

  AllUsers);
/* get one profiles */
router.get("/profile",
  passport.authenticate("jwt", { session: false }),
  FindSingleProfile);
/* delete profiles */
router.delete("/profiles/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  DeleteProfile);
  router.delete("/deluser/:id",
  passport.authenticate("jwt", { session: false }),
  inRole(ROLES.ADMIN),
  DeleteUser);
  router.get("/:id"  ,DetailsProfile)

//chat
router.post("/addmsg/", passport.authenticate("jwt", { session: false }), addMessage);
router.post("/getmsg/", passport.authenticate("jwt", { session: false }), getMessages);
router.get("/allusers/:id", getAllUsers);

router.post("/setavatar/:id", setAvatar);

router.put('/like/:id',passport.authenticate("jwt", { session: false }),likes)

/* add profile route with image */
router.post('/add',passport.authenticate("jwt", { session: false }),ConditionProfile, uploadAvatar)





module.exports = router;
