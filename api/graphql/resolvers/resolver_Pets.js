import User from "../../models/user.models.js"
import Pets from "../../models/pets.models.js"

export const commentResolves = {
    Query: {
        async getMyPets(_, __, { user }) {
            if (!user) {
                throw new Error("Not authenticated");
            }
            const CUser = await User.findById({ id_user: user.payload })
            if (!CUser) {
                throw new Error("Not authenticated");
            }
            return Pets.find({ id_user: user.payload })
        }
    },
     async getPetsByUsername(_, { username }) {
        console.log(username)
        const gUser = await User.findOne({ username })
        const userId = gUser.id_user

        if (!gUser) {
            throw new Error("Not authenticated");
        }
         const petsfind = Pets.find({ id_user: userId.id })
       
    },
    Pets: {
        user: async ({ id_user }) => {
            return await User.find(id_user)
        },
    }
}