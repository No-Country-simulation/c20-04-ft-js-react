import { Comment as CommentProps, Post as PostType, User } from "@/types";
import { Avatar, Box, Button, styled, TextField, Typography } from "@mui/material";
import Post from "./Post";
import { stringAvatar } from "@/utils/avatar";
import { useState } from "react";
import { useCreateCommentMutation } from "@/redux/apiSlices/postApi";

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

const PostDetail = ({ selectedPost, setPost, user }: { selectedPost: PostType, setPost: React.Dispatch<React.SetStateAction<PostType[]>>, user: User }) => {
    const [commentText, setCommentText] = useState<string>(""); // Estado para manejar el texto del comentario

    const [createComment, { isLoading, isSuccess, error }] = useCreateCommentMutation();

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;

        try {
            const response = await createComment({ id_post: selectedPost._id, text: commentText }).unwrap();

            setPost(prevState => {
                return prevState.map(post => {
                    if (post._id === selectedPost._id) {
                        return {
                            ...post,
                            comment: [...post.comment, response.data]
                        };
                    }
                    return post;
                });
            });

            setCommentText("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <StyledBox className="bg-white dark:bg-neutral-900" gap={2}>
            <h2 className="text-xl font-semibold mb-4">Detalles de la publicación</h2>
            <Post post={selectedPost} setPost={setPost} menu={false} className="bg-white dark:bg-neutral-900 border-none !p-0" />
            <div className="mt-2 space-y-4">
                {selectedPost.comment.length > 0 ? (
                    <p className="font-semibold">Comentarios</p>
                ) : (
                    <p className="font-semibold">No hay comentarios.</p>
                )}

                {user.id && (
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                        <TextField
                            label="Comenta aquí"
                            fullWidth
                            multiline
                            rows={4}
                            value={commentText}
                            onChange={handleCommentChange}
                            autoComplete="off"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCommentSubmit}
                            disabled={!commentText.trim()}
                        >
                            Enviar comentario
                        </Button>
                    </Box>
                )}

                {selectedPost?.comment.toReversed().map((comment: CommentProps, index: number) => (
                    <Comment key={index} comment={comment} />
                ))}
            </div>
        </StyledBox>
    );
};


const Comment = ({ comment }: { comment: CommentProps }) => {
    return (
        <div className="flex items-start space-x-2">
            <Avatar
                {...stringAvatar(comment?.user.name?.toUpperCase() || comment?.user.username?.toUpperCase())}
                alt={comment?.user?.username.toUpperCase()}
                src={comment?.user?.profile_photo}
            />
            <Box>
                <Typography>@{comment?.user?.username}</Typography>
                <Box className='space-y-4'>
                    <Typography
                        color='text.primary'
                        sx={{ wordBreak: 'break-word' }}
                        className='px-4 sm:px-0'
                    >
                        {comment?.text}
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}

export default PostDetail;