import User from "../../models/user.models.js"
import Comment from "../../models/comments.models.js"

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
            return Comment.find({id_user:user.payload})
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
            const co = new Comment({
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
            if (!Comment.findById(_id).id_user == {id_user:user.payload}) {
                throw new Error("Not authenticated");
            }
            const co = new Comment({
                ...CommentInput,
                id_user: {id_user:user.payload}
            })
            const CommentCread = await co.save()

            return CommentCread
        },
    },
    Comment: {
        user: async ({ id_user }) => {
            return  await User.find(id_user)
        },
        post: async ({ id_user }) => {
            return await Comment.find(id_user)
        }
    }
}