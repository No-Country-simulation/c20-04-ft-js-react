"use client";
import React, { useEffect, useMemo, useState } from "react";

//? redux
import { useAppSelector } from "@/redux/hooks";
import { useGetUserFollowersQuery } from "@/redux/apiSlices/userQueryApi";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "@/redux/apiSlices/userApi";

interface Props {
  dataUsername: string;
  dataId: string;
}

export default function FollowOrUnfollowBtn({ dataUsername, dataId }: Props) {
  const localUserId = useAppSelector((state) => state.userReducer?.user?.id);
  const { data, isLoading, error, refetch } =
    useGetUserFollowersQuery(dataUsername);

  // follow mutations
  const [followUser] = useFollowUserMutation();
  const [unFollowUser] = useUnFollowUserMutation();

  // Obtener los followers del usuario
  const followers = data?.data?.getUserByUsername?.followers ?? [];

  // Verificar si el usuario local sigue al perfil actual
  const isFollowing = useMemo(() => {
    return followers.some((followerId: string) => followerId === localUserId);
  }, [followers, localUserId]);

  // Estado para mostrar la tarjeta de confirmación
  const [showConfirmation, setShowConfirmation] = useState(false);

  const onFollow = async () => {
    try {
      const response = await followUser(dataId).unwrap();
      console.log(response);
      refetch();
    } catch (error) {
      console.log(error);
      window.alert("Error when following this user");
    }
  };

  const onUnfollow = async () => {
    try {
      const response = await unFollowUser(dataId).unwrap();
      console.log(response);
      refetch();
      setShowConfirmation(false); // Oculta la tarjeta de confirmación
    } catch (error) {
      window.alert("Error when unfollowing this user");
      console.log(error);
    }
  };

  // Maneja la confirmación de unfollow
  const handleUnfollowClick = () => {
    setShowConfirmation(true);
  };

  if (isLoading) return <button>Loading...</button>;
  if (error) return <button>Error loading data</button>;

  return (
    <>
      {!isFollowing ? (
        <button
          className="w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300 hover:bg-[#e2e5e9]"
          onClick={onFollow}
        >
          Follow
        </button>
      ) : (
        <button
          className="w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300 hover:bg-[#e2e5e9]"
          onClick={handleUnfollowClick}
        >
          Unfollow
        </button>
      )}

      {/* Tarjeta de confirmación para Unfollow */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r z-50">
          <div className="bg-white p-8 rounded-lg w-[90%] mx-auto max-w-[300px] shadow-lg text-center animate-fadeIn border-4 border-pink-400">
            <p className="text-lg font-semibold text-[#8c52ff] mb-2 font-poppins">
              Are you sure you want to unfollow{" "}
              <span className="font-bold">{dataUsername}</span>?
            </p>
            <p className="text-sm text-gray-500 mb-4 font-poppins">
              Your furry friend might miss you!
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition font-bold"
                onClick={onUnfollow}
              >
                Yes, unfollow
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition font-bold border-2 border-[#8c52ff]"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
