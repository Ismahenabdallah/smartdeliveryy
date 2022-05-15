const UserModel = require("../models/users.models");

const ValidateRegister = require("../validation/Register");

const sendEmail = require('../util/sendEmail')
const send = require('../util/SENDMAILRESET.JS')

require('dotenv').config()



const ValidateLogin = require("../validation/Login");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.PRIVATE_KEY, { expiresIn: '15m' })
}

const Register = async (req, res) => {
  const { errors, isValid } = ValidateRegister(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      UserModel.findOne({ email: req.body.email }).then(async (exist) => {
        if (exist) {
          errors.email = "user exist";
          res.status(404).json(errors);
        } else {
          const hashPassword = bcrypt.hashSync(req.body.password, 10)//hashed password
          req.body.password = hashPassword;

          const user = await new UserModel({
            ...req.body,
            password: hashPassword,
            confirmationCode: jwt.sign({ email: req.body.email }, process.env.PRIVATE_KEY),

          })



          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({
              message:
                "User was registered successfully! Please check your email",
            });
            sendEmail.sendConfirmationEmail(
              user.fullname,
              user.email,
              user.confirmationCode
            );

          });

          /*
                    const url = `http://localhost:3000/${user._id}/verify`
                    await sendEmail(user.email, "verify Email ", url)
                    res.status(200).json({ message: "An Email sent to your account please verify  " });
          */

        }
      })
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const Login = async (req, res) => {
  const { errors, isValid } = ValidateLogin(req.body)
  try {
    if (!isValid) {
      res.status(404).json(errors)
    } else {
      const user = await UserModel.findOne({ email: req.body.email })

      if (!user) {
        errors.email = "not found user"
        res.status(404).json(errors)
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(async isMatch => {
            if (!isMatch) {
              errors.password = "incorrect password"
              res.status(404).json(errors)
            } else {

              if (user.status !== "Active") {

                return res.status(401).json({
                  errors: "  Please Verify Your Email!",
                });
              }

              var token = jwt.sign({
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                isAvatarImageSet: user.isAvatarImageSet,
                avatarImage: user.avatarImage
              }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
              res.status(200).json({
                message: "success",
                token: "Bearer " + token
              })




            }
          })
      }

    }
  } catch (error) {
    res.status(404).json(error.message);
  }
}


const verifyUser = async (req, res) => {
  UserModel.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {

      if (!user) {
        return res.status(404).json({ errors: "User Not found." });

      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).json({ errors: err });

          return;
        }
      });
    })
    .catch((e) => console.log("error", e));
};



const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) return res.status(400).json({ msg: "This email does not exist." })



    const access_token = createAccessToken({ id: user._id })


    const url = `http://localhost:3000/reset/${access_token}`
    send(email, url, 'reset-password')

    //send(email,'Reset Password',`<h1>Email Confirmation</h1>
    //<h3>Hello ${user.fullname}</h3>
    // <a href=http://localhost:3000/reset/${access_token}> Click here</a>`) 
    //

    res.json({ msg: "Re-send the password, please check your email." })
    // await UserModel.updateOne({ _id: user.id },{ password: "" })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}


const resetPassword = async (req, res) => {


  try {
    const { password } = req.body

    const passwordHash = await bcrypt.hashSync(password, 12)

    await UserModel.findOneAndUpdate({ _id: req.user.id }, {
      password: passwordHash
    })

    res.json({ msg: "Password successfully changed!" })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}





const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "fullname",
      "avatarImage",
      "id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

/*
const fetch = require ("node-fetch");

 url=`https://api.multiavatar.com/4645646/${Math.round(Math.random() * 1000)}`

const get_data = async  url => {
  try {
    const response = await fetch(url);
   
   //console.log(response.url)
  } catch (error) {
    console.log(error);
  }
};
get_data(url)
*/
module.exports = {
  Register,
  Login,
  verifyUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  setAvatar,
//get_data

};
