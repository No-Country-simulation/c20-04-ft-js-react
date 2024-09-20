import { Comment as CommentProps, Post as PostType } from "@/types";
import { Avatar, Box, styled, Typography } from "@mui/material";
import Post from "./Post";
import { stringAvatar } from "@/utils/avatar";

const StyledBox = styled(Box)(({ theme }) => ({
    overflow: 'auto',
    padding: '1em',
    width: '100%',
    scrollbarWidth: 'thin',
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#8C52FF',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#6b3db8',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: '#1d1d1d',
        borderRadius: '10px',
    },
}));

const PostDetail = ({ selectedPost, setPost }: { selectedPost: PostType, setPost: React.Dispatch<React.SetStateAction<PostType[]>> }) => {

    return (
        <StyledBox className="bg-white dark:bg-neutral-900" gap={2}>
            <h2 className="text-xl font-semibold mb-4">Detalles de la publicación</h2>
            <Post post={selectedPost} setPost={setPost} menu={false} className="bg-white dark:bg-neutral-900 border-none !p-0" />
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
        </StyledBox>
    );
};


const Comment = ({ comment }: { comment: CommentProps }) => {

    return (
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
    )
}

export default PostDetail;