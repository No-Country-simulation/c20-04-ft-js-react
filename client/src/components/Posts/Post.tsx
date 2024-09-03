import CommentIcon from "@/icons/CommentIcon";
import PawIcon from "@/icons/PawIcon";
import { ShareOutlined } from "@mui/icons-material";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface PostProps {
    username: string;
    content: string;
    likes: number;
    comments: number;
}

export default function Post({ username, content, likes, comments }: PostProps) {
    const theme = useTheme();

    return (
        <div className="w-full md:w-[345px] rounded-[8px] border border-neutral-300 dark:border-neutral-700">
            <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                        alt={username?.toUpperCase()}
                        src="/placeholder.svg?height=32&width=32"
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            width: 40,
                            height: 40,
                            mr: 1,
                        }}
                    />
                    <Typography variant="body1" color="text.secondary">
                        @{username}
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.primary" sx={{ mb: 2, wordBreak: "break-word" }}>
                    {content}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton size="small">
                                <PawIcon className="text-black dark:text-white w-[28px] h-[24px]" />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                {likes}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <IconButton size="small">
                                <CommentIcon className="text-black dark:text-white w-[28px] h-[24px]" />
                            </IconButton>
                            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                {comments}
                            </Typography>
                        </Box>
                    </Box>

                    <IconButton size="small">
                        <ShareOutlined fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </div>
    );
}
