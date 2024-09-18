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
            console.log(username);
        
            // Find the user by username
            const gUser = await User.findOne({ username });
        
            // Check if the user exists
            if (!gUser) {
                throw new Error("User not found");
            }
        
            // Extract the user ID (ensure this matches the field in your database)
            const userId = gUser._id
        
            // Check if userId exists
            if (!userId) {
                throw new Error("User ID not found");
            }
        
            // Now, use the userId to find the pets associated with the user
            const petsfind = await Pets.find({ id_user: userId });
        
            // Return the found pets
            return petsfind;
        }
    }, 
    Pets: {
        user: async ({ id_user }) => {
            console.log(id_user);
            return await User.findById(id_user)
        },
    }
}