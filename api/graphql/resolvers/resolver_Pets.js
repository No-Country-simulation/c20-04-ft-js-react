import User from "../../models/user.models.js"
import Pets from "../../models/pets.models.js"

export const petsResolves = {
    Query: {
        async getMyPets(_, __, { user }) {
            console.log(user)
            if (!user) {
                throw new Error("Not authenticated");
            }
            const CUser = await User.findById(user.payload)
            if (!CUser) {
                throw new Error("Not authenticated");
            } 
            const a = await Pets.find({ id_user: user.payload })
            return Pets.find({ id_user: user.payload })
        },
        async getPetsByUsername(_, { username }) {
            console.log(username)
            const gUser = await User.findOne({ username })
            const userId = gUser.id_user

            if (!gUser) {
                throw new Error("Not authenticated");
            }
            const petsfind = await Pets.find({ id_user: userId.id })

        },
    }, 
    Pets: {
        user: async ({ id_user }) => {
            console.log(id_user);
            return await User.findById(id_user)
        },
    }
}