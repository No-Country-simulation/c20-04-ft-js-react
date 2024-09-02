import User from "../../models/user.models.js"
import Comment from "../../models/comments.models.js"

export const commentResolves={
    Mutation:{
        async CommentC(_, { CommentInput:{text,id_post} },{user}){
            if (!user) {
                throw new Error("Not authenticated");
            }
            const CUser = await User.findById(user.payload)
            if (!CUser) {
                throw new Error("Not authenticated");
            }
            const co = new Comment({
                text,
                id_post,
                id_user: user.payload
            })
            const CommentCread= await co.save()
            
            return CommentCread
        },
    },

}