import User from '../models/user.models.js'
import  jwt  from 'jsonwebtoken';
import { TOKEN_KEY } from '../config.js';
import fs from 'fs-extra';

// cloudinary
import {uploadPfpImage} from '../cloudinary.js'

export const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }, 'username name profile_photo gender age country');
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Construct the response object based on required fields
        const userData = {
            username: user.username,
            name: user.name || 'not specified',
            profilePicture: user.profile_photo || 'https://i.redd.it/is-there-a-sniper-default-pfp-that-someone-made-v0-78az45pd9f6c1.jpg?width=396&format=pjpg&auto=webp&s=5be4618605b25e0546d72dff52a7b897c3d4e1d4',
            gender: user.gender || 'not specified',  // Assuming gender field exists
            age: new Date().getFullYear() - new Date(user.age).getFullYear(), // Calculating age from Date
            country: user.address // Assuming address field corresponds to country
        };

        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
export const prifileUpDate = async (req, res) => {
  try {
      const { token } = req.cookies
      const userid = jwt.verify(token, TOKEN_KEY);
      console.log(userid);
      const Userfind = await User.findById(userid.payload.id)
      const { password, profile_photo,...restOfBody } = req.body;
      
      const upuser = {
          ...restOfBody,
      };
      console.log("!");
      if (req.tempFilePath) {
          const uploadImage = await uploadPfpImage(req.tempFilePath, req.user._id);
          upuser.url_img = uploadImage;
          await fs.remove(req.tempFilePath);
      }
      console.log("userid");
        const userp = await User.findByIdAndUpdate(userid.payload.id, upuser, { new: true })
      console.log(Userfind)
      res.status(200).json(userp)
  } catch (error) {
      res.status(500).json({ message: 'Error actualizando el perfil', error });
  }
};
export const followCntrol = async (req, res) => {
    try {
        const { token } = req.cookies
        const userid = jwt.verify(token, TOKEN_KEY);
        userid = userid.payload.id
        const { id } = req.params;

        const currentUser = await User.findById(userid);
        const targetUser = await User.findById(id);

        if (!currentUser || !targetUser) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!currentUser.following.includes(id)) {
            // sigue
            await User.updateOne(
                { _id: userid },
                { $addToSet: { following: id } }
            );
            await User.updateOne(
                { _id: id },
                { $addToSet: { followers: userid } }
            );
        } else {
            //quita el foll
            await User.updateOne(
                { _id: userid },
                { $pull: { following: id } }
            );
            await User.updateOne(
                { _id: id },
                { $pull: { followers: userid } }
            );
            res.status(200).json({ message: 'Follow/unfollow successful' });

        }
    } catch (error) {
        res.status(500).json({ message: 'Error in follow/unfollow operation', error });
    }
};