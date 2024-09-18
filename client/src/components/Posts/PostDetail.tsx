import { Comment as CommentProps, Post as PostType } from "@/types";
import { Avatar, Box, Typography } from "@mui/material";
import Post from "./Post";
import { relativeTime } from "@/utils/time";
import { stringAvatar } from "@/utils/avatar";

const PostDetail = ({ selectedPost }: { selectedPost: PostType }) => {
    console.log(selectedPost);

    return (
        <Box gap={2} sx={{ overflow: 'auto' }}>
            <h2 className="text-xl font-semibold mb-4">Detalles de la publicación</h2>
            <Post post={selectedPost} className="border-none p-0" />
            <div className="mt-2 space-y-4">
                {selectedPost.comment.length > 0 ? (
                    <>
                        <p className="font-semibold">Comentarios</p>
                        {selectedPost.comment.map((comment: CommentProps, index: number) => (
                            <Comment key={index} comment={comment} />
                        ))}
                    </>
                ) : (
                    <div>
                        <p className="font-semibold">No hay comentarios.</p>
                    </div>
                )}
            </div>
        </Box>
    );
};


const Comment = ({ comment }: { comment: CommentProps }) => {

    return (
        <div className="space-y-4">
            <p className="font-semibold">Comentarios</p>
            <div className="flex items-start space-x-2">
                <Avatar
                    {...stringAvatar(comment.user.name?.toUpperCase() || comment.user.username?.toUpperCase())}
                    alt={comment.user.username.toUpperCase()}
                    src={comment.user.profile_photo}
                />
                <Box>
                    <Typography>@{comment.user.username}</Typography>
                    <Box className='space-y-4'>
                        <Typography
                            color='text.primary'
                            sx={{ wordBreak: 'break-word' }}
                            className='px-4 sm:px-0'
                        >
                            {comment.text}
                        </Typography>
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default PostDetail;