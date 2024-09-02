import User from "../../models/user.models.js"
import Post from "../../models/post.models.js";
export const postRosolves = {
    Query:{
        async getPost(_,__,{user}){
            /*if (!user) {
                throw new Error("Not authenticated");
            }
            const pUser = await User.findById(user.payload)
            if (!pUser) {
                throw new Error("Not authenticated");
            }*/
            const allpost = await Post.find({})
            console.log(allpost);
            
            return allpost;  
        }
    },
    Mutation: {
        async PostC(_,{ postInpit: { category } },{user}) {
            console.log(user);

            if (!user) {
                throw new Error("Not authenticassted");
            }
            const pUser = await User.findById(user.payload)
            if (!pUser) {
                throw new Error("Not authenticated");
            }
            const postc = new Post({
                category,
                id_user: pUser.id,
            })
            const awpostS = await postc.save()

            return {
                ...awpostS._doc,
                id: awpostS._id,
            }
        },
        async PostM(_,{postInpit:{category,_id}},{user}){
            if (!user) {
                throw new Error("Not authenticated");
            }
            const pUser = await User.findById(user.payload)
            if (!pUser) {
                throw new Error("Not authenticated");
            }
            if (!Post.findById(_id).id_user == user.payload){
                throw new Error("Not authenticated");
            }
            const postM = await Post.findByIdAndUpdate(_id, { category }, { new: true })
            
            return  postM
        
        }
    }
}