const ProfileModel = require('../models/profiles.models')

const cloudinary = require('cloudinary')
const fs = require('fs')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})



const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}


const uploadAvatar = (req, res, next) => {

    try {

        const file = req.files.file;

        cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'avatar', width: 150, height: 150, crop: "fill"
        }, async (err, result) => {
            if (err) return res.status(400).json(err)

            removeTmp(file.tempFilePath)

            res.json({ url: result.secure_url })


            await ProfileModel.findOne({ user: req.user.id })
                .then(async (profile) => {
                    req.body.avatar = result.secure_url
                    if (!profile) {


                        req.body.avatar = result.secure_url
                        req.body.user = req.user.id

                        await ProfileModel.create(req.body, function (err) {
                            if (err) {
                                console.log(err)
                            }
                            else {
                                console.log("insert")
                            }

                        })

                    }
                    else {

                        await ProfileModel.findOneAndUpdate(
                            { _id: profile._id },
                            req.body,
                            { new: true }
                        ).then(() => {
                            console.log("update")
                        })



                    }
                })
        }

        )


    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

const FindAllProfiles = async (req, res) => {
    try {
        const data = await ProfileModel.find().populate('user', ["fullname", "email", "role"])
        res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const FindSingleProfile = async (req, res) => {
    try {
        const data = await ProfileModel.findOne({ user: req.user.id }).populate('user', ["fullname", "email", "role"])
        res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const DeleteProfile = async (req, res) => {
    try {
        const data = await ProfileModel.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ message: "deleted" })

    } catch (error) {
        res.status(404).json(error.message)
    }
}
const DetailsProfile = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await ProfileModel.findById(id).populate('user', ["fullname", "email", "role"])
        res.status(200).json(data)

    } catch (error) {
        res.status(404).json(error.message)
    }
}

const likes = async (req, res) => {
    try {
        const post = await ProfileModel.findById(req.params.id)

        if (post.likes.filter(like => like.user.toString() === req.user.id).length < 5) {
            await post.likes.unshift({ user: req.user.id })

            await post.save()
            res.json(post.likes)

        }
        else {
res.json("already_likes")
        }



    }
    catch (error) {
        console.error(error.message)

    }
}














module.exports = {
    uploadAvatar,
    FindAllProfiles,
    FindSingleProfile,
    DeleteProfile,
    DetailsProfile,
    likes


}