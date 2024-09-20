"use client";
import React, { useEffect, useMemo, useState } from "react";

//? redux
import { useAppSelector } from "@/redux/hooks";
import { useGetUserFollowersQuery } from "@/redux/apiSlices/userQueryApi";
import {
  useFollowUserMutation,
  useUnFollowUserMutation,
} from "@/redux/apiSlices/userApi";

import Alert from "@/components/shared/Alert";

interface Props {
  dataUsername: string;
  dataId: string;
}

export default function FollowOrUnfollowBtn({ dataUsername, dataId }: Props) {
  const localUserId = useAppSelector((state) => state.userReducer?.user?.id);
  const { data, isLoading, error, refetch } =
    useGetUserFollowersQuery(dataUsername);

  //state to controll loading btn when following and unfollowing
  const [onload, setOnLoad] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

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
      setOnLoad(true);
      const response = await followUser(dataId).unwrap();
      console.log(response);
      refetch();
      setOnLoad(false);
    } catch (error) {
      console.log(error);
      setAlertMessage("Error when following this user");
      setAlertVisible(true);
      setOnLoad(false);
    }
  };

  const onUnfollow = async () => {
    try {
      setOnLoad(true);
      const response = await unFollowUser(dataId).unwrap();
      console.log(response);
      refetch();
      setShowConfirmation(false); // Oculta la tarjeta de confirmación
      setOnLoad(false);
    } catch (error) {
      console.log(error);
      setAlertMessage("Error when unfollowing this user");
      setAlertVisible(true);
      setOnLoad(false);
      setShowConfirmation(false);
    }
  };

  // Maneja la confirmación de unfollow
  const handleUnfollowClick = () => {
    setShowConfirmation(true);
  };

  if (isLoading) return <button>Loading...</button>;
  if (error) return <button>Error loading data</button>;

  return (
    <div className="relative">
      {alertVisible && (
        <div className="absolute z-10 bottom-[-30%] left-[-50%] lg:left-[-45%]">
          <Alert
            type="danger"
            title="action failed"
            message={alertMessage}
            onClose={() => setAlertVisible(false)}
          />
        </div>
      )}
      {!isFollowing ? (
        <button
          className="w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300 hover:bg-[#e2e5e9]"
          onClick={onFollow}
          disabled={onload}
        >
          {onload ? "loading" : "Follow"}
        </button>
      ) : (
        <button
          className="w-[100%] px-2 h-[2.4rem] rounded justify-self-start border border-gray-300 hover:bg-[#e2e5e9]"
          onClick={handleUnfollowClick}
          disabled={onload}
        >
          {onload ? "loading" : "Unfollow"}
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
    </div>
  );
}
