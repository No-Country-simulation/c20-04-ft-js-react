import User from "../../models/user.models.js"
import Post from "../../models/post.models.js";
import Comments from "../../models/comments.models.js"
export const postRosolves = {
    Query: {
        async getPost(_, __,) {
            const allpost = await Post.find({})

            return allpost;
        },
        async getMyPost(_, __, { user }) {
            if (!user) {
                throw new Error("Not authenticated");
            }
            const pUser = await User.findById(user.payload)
            if (!pUser) {
                throw new Error("Not authenticated");
            }
            const allMyPost = await Post.find({ id_user: user.payload })

            return allMyPost;
        },
        async getAllPostByUsername(_, { username }) {
            const pUser = await User.findOne({ username });
            if (!pUser) {
              throw new Error("User not found");
            }
            const userPosts = await Post.find({ id_user: pUser._id });
            return userPosts;
        }      
    },
    Mutation: {
        async PostC(_, { postInput }, { user }) {
            console.log(postInput);

            if (!user) {
                throw new Error("Not authenticassted");
            }
            const pUser = await User.findById(user.payload)
            if (!pUser) {
                throw new Error("Not authenticated");
            }
            const postc = new Post({
                ...postInput,
                id_user: pUser.id,
            })
            const awpostS = await postc.save()

            return {
                ...awpostS._doc,
                id: awpostS._id,
            }
        },
        async PostM(_, { postInput}, { user }) {
            if (!user) {
                throw new Error("Not authenticated");
            }
            const pUser = await User.findById(user.payload)
            if (!pUser) {
                throw new Error("Not authenticated");
            }
            if ( !Post.findById(postInput._id).id_user == user.payload) {
                throw new Error("Not authenticated");
            }        
            const { ...updatepost } = postInput
            const postM = await Post.findByIdAndUpdate(postInput._id, updatepost, { new: true })

            return postM

        }
    },
    Post: {
        user: async ({ id_user },_,{user}) => {
            return await User.findById(id_user)
        },
        comment: async ({ _id }) =>{
            const postId = _id.toString()
            //console.log(postId);
            const a = await Comments.find({id_post: postId })
            console.log(a);
            return await Comments.find({id_post:postId} )
        }
    }
}