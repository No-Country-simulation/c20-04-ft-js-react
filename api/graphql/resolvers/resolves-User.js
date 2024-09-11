import User from "../../models/user.models.js"
import Post from '../../models/post.models.js'
import crip from "bcryptjs";
import Pets from "../../models/pets.models.js"

import { createAccess } from "../../libs/jwt.js"


export const userResolves = {

    Query: {
        async getUser(_, args = {}, { user }) {
            const gUser = await User.findById(user.payload)
            return {
                ...gUser._doc,
                id: gUser._id,
            }
        },
        async getUserByUsername(_, {username}) {
            console.log(username)
            const gUser = await User.findOne({username})
            const userId = gUser.id_user
            
            if(!gUser){
                console.log("user not found")
            }
            return {
                ...gUser._doc,
                id: gUser._id,
            }
        },
        async getUserSearch(_, { username }) {
            if (!user) {
                throw new Error("Not authenticassted");
            }
            const pUser = await User.findById(user.payload)
            if (!pUser) {
                throw new Error("Not authenticated");
            }
            return await User.find({ username: { $regex: username, $options: 'i' } })
        }
    },
    Mutation: {
        async RegisterUser(_, { registerInput: { username, email, password, role } }, { res }) {

            const userFond = await User.findOne({ email })
            const errors = validateRegisterInput(registerInput);
            if (Object.keys(errors).length > 0) {
                throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
            }
            if (userFond) {
                throw new Error("A user is already register");
            }

            const hash = await crip.hash(password, 10)

            const newUser = new User({
                email,
                password: hash,
                role,
                username,
                age
            })
            const us = await newUser.save()
            const token = await createAccess(us._id)
            res.cookie("token", token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'lax', 
                maxAge: 24 * 60 * 60 * 1000, 
                path: '/'
            });
            return {
                ...us._doc,
                id: us._id,
            }

        },
        async loginUser(_, { loginInput: { email, password } }, { res }) {
            const fondUser = await User.findOne({ email })

            if (!fondUser) {
                throw new Error("Invalided creditials cc");
            }
            const compareHash = await crip.compare(password, fondUser.password)

            if (!compareHash) {
                throw new Error("Invalided creditials");
            }
            const token = await createAccess(fondUser._id, fondUser.role)

            res.cookie("token", token, {
                httpOnly: true, // Opcional: para prevenir el acceso al token desde el lado del cliente
                secure: process.env.NODE_ENV === 'production', // Opcional: solo enviar cookies a través de HTTPS en producción
                sameSite: 'lax', // Opcional: para evitar problemas con solicitudes cross-site
                maxAge: 24 * 60 * 60 * 1000, // 1 día
                path: '/'
            });
            return {
                ...fondUser._doc,
                id: fondUser._id,
            }

        },
        async Modprofile(_, { profileInput }, { user }) {
            
            if (!user) {
                throw new Error("Not authenticated");
            }
            const exist = await User.findById(user.payload)

            if (!exist) {   
                throw new Error("Not authenticated");
            }
            if (!exist.id == user.payload ){
                throw new Error("Not authenticated");
            }
            const upuser ={
                ...profileInput
            };
            
            const userp = await User.findByIdAndUpdate(user.payload, upuser, { new: true })
            return {
                ...userp._doc,
                id: userp._id,
            }

        },
        async addDeleFolowing(_, {followersInput:{id}}, { user }) {
            if (!user) {
                throw new Error("Not authenticcated");
            }
            const exist = await User.findById(user.payload)

            if (!exist) {
                throw new Error("Not auaaathenticated");
            }
            const fadd = await User.findById(user.payload)
            
            if(!fadd && fadd.following.includes(id)){

                console.log(fadd);
                const userin = await User.updateOne(
                    { _id: user.payload },
                    { $addToSet: { following: id } }
                )
                const userer = await User.updateOne(
                    { _id: id },
                    { $addToSet: { followers: user.payload } }
                );
            }else{
                const a = await User.findById(id)


                console.log("aaaaa");
                const userin = await User.updateOne(
                    { _id: user.payload },
                    { $pull: { following: id } }
                )
                const userer = await User.updateOne(
                    { _id: id },
                    { $pull: { followers: user.payload } }
                );
            }

            
            const a = await User.findById(id)
            //console.log(a);
            
            //console.log(exist)


        }
    },
    User:{
        posts: async ({_id}) => {
            const userId = _id.toString()
            console.log(userId)
            return await Post.find({id_user: userId})
        },
        comment: async ({ _id }) => {
            const userId = _id.toString()
            return await Comment.find({ id_user: userId })
        },
        pets: async ({ _id }) => {
            console.log(_id);
            const userId = _id.toString()
            return await Pets.find({ id_user: userId })
        }
    }
}