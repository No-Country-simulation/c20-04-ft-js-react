import User from "../../models/user.models.js"
import Comments from "../../models/comments.models.js"
import Post from "../../models/post.models.js";

export const commentResolves={
    Query:{
        async getMyComment(_,__,{ user }) {
            if (!user) {
                throw new Error("Not authenticated");
            }
            const CUser = await User.findById({id_user:user.payload})
            if (!CUser) {
                throw new Error("Not authenticated");
            }
            return Comments.find({id_user:user.payload})
        },
        async getComment(_, {id_post}) {
            console.log(id_post);
            
            return Comments.find({ id_post: id_post })
        }
    },
    Mutation:{
        async CommentC(_, { commentInput},{user}){
            if (!user) {
                throw new Error("Not authenticated");
            }
            const CUser = await User.findById(user.payload)
            if (!CUser) {
                throw new Error("Not authenticated");
            }
            const co = new Comments({
                ...commentInput,
                id_user:user.payload
            })
            console.log(co)
            const CommentCread= await co.save()
            
            return CommentCread
        },
        async CommentM(_, { commentInput }, { user }) {
            if (!user) {
                throw new Error("Not authenticated");
            }
            const CUser = await User.findById({id_user:user.payload})
            if (!CUser) {
                throw new Error("Not authenticated");
            }
            if (!Comments.findById(_id).id_user == {id_user:user.payload}) {
                throw new Error("Not authenticated");
            }
            const co = new Comments({
                ...commentInput,
                id_user: {id_user:user.payload}
            })
            const CommentCread = await co.save()

            return CommentCread
        },
    },
    Comment: {
        user: async ({ id_user }) => {
            return  await User.findById(id_user)
        },
        post: async ({ id_post }) => {
            return await Post.findById(id_post)
        }
    }
}