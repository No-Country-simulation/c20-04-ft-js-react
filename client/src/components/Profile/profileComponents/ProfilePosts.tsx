"use client";

import React, { useEffect, useState } from "react";
import Post from "@/components/Posts/Post";
//? mui material
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import type { Post as PostType } from "@/types";
import { useGetAllPostByUsernameQuery } from "@/redux/apiSlices/postApi";
import { useParams } from "next/navigation";
import {
  Box,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import PostDetail from "@/components/Posts/PostDetail";
import { IoCloseCircleOutline } from "react-icons/io5";
import CreatePost from "@/components/Posts/CreatePost";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Pets } from "@mui/icons-material";

export default function ProfilePosts() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const params = useParams();
  const username: string = params.userName as string;

  const { data, isError, isLoading } = useGetAllPostByUsernameQuery(username);
  const user = useSelector((state: RootState) => state.userReducer.user);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  useEffect(() => {
    if (!isLoading && data) {
      const fetchedPosts = data.data?.getAllPostByUsername || [];
      setPosts(fetchedPosts);
    }
  }, [data, isLoading]);

  const addNewPost = (newPost: Omit<PostType, "comments" | "likes" | "">) => {
    setPosts((ps) => [...ps, { ...newPost, comments: 0, likes: 0 }]);
  };

  useEffect(() => {
    const idPostSelected = selectedPost?._id;
    if (idPostSelected) {
      const post = posts.find((post) => post._id === idPostSelected);
      setSelectedPost(post || null);
    }
  }, [posts, selectedPost?._id]);

  const handlePostClick = (post: PostType) => {
    setSelectedPost((prevSelectedPost) =>
      prevSelectedPost?._id === post._id ? null : post
    );
  };

  const isSmallScreen = useMediaQuery("(max-width:1200px)");
  const isMediumScreen = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="background.paper" // Fondo blanco para el contenedor de carga
          zIndex="tooltip"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            gap={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: isMediumScreen ? "100%" : "50%",
            }}
          >
            {user?.username === username && (
              <CreatePost addNewPost={addNewPost} />
            )}
            <ul className="space-y-5 transition-colors">
              {posts.toReversed().map((post) => (
                <Post
                  setPost={setPosts}
                  menu={true}
                  key={post._id}
                  post={post}
                  selected={post._id === selectedPost?._id}
                  onClick={() => handlePostClick(post)}
                />
              ))}
            </ul>

            {user?.username !== username && (
              <>
              {posts.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                <Pets style={{ fontSize: 50, color: "#8c52ff" }} />
                <p className="mt-4 text-lg text-gray-700 font-semibold text-center">
                  This user hasn't shared any moments yet!
                </p>
                <p className="text-gray-500 text-center">
                  Stay tuned for some pawsome updates!
                </p>
              </div>
              ): null}
              </>
            ) }
          </Box>

          {/* Overlay */}
          {isSmallScreen && selectedPost && (
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro con opacidad
                zIndex: 9998, // Justo por debajo del modal
              }}
            />
          )}

          {/* Modal */}
          {selectedPost && (
            <Box
              sx={{
                display: "flex",
                flex: "1",
                position: isSmallScreen ? "fixed" : "sticky",
                top: isSmallScreen ? "50%" : 100,
                left: isSmallScreen ? "50%" : "auto",
                transform: isSmallScreen ? "translate(-50%, -50%)" : "none",
                width: isMediumScreen ? "90%" : "auto",
                padding: isSmallScreen ? "2.5em 0 1em 0" : "0",
                maxHeight: "calc(100svh - 110px)",
                zIndex: isSmallScreen ? 9999 : "auto", // Asegura que esté por encima del overlay
              }}
              className="overflow-hidden bg-white dark:bg-neutral-900 rounded-lg border border-neutral-300 dark:border-neutral-700"
            >
              {/* Ícono de cerrar */}
              {isSmallScreen && (
                <IconButton
                  onClick={() => setSelectedPost(null)}
                  className="text-neutral-900 dark:text-white"
                  sx={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                >
                  <IoCloseCircleOutline />
                </IconButton>
              )}

              <PostDetail
                user={user}
                setPost={setPosts}
                selectedPost={selectedPost}
              />
            </Box>
          )}
        </>
        // posts.length > 0 ? (
        //   posts.toReversed().map((post) => (
        //     <Post
        //       key={post._id}
        //       post={post}
        //       menu={true}
        //     />
        //   ))
        // ) : (
        //   <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        //     <p className="mb-[1rem] font-extrabold text-[1rem] lg:text-[1.4rem]">
        //       No hay publicaciones disponibles.
        //     </p>
        //   </Box>
        // )
      )}
    </>
  );
}
