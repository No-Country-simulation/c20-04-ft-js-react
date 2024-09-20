'use client'
import React, { useEffect, useMemo, useState } from 'react';

//? redux
import { useAppSelector } from '@/redux/hooks';
import { useGetUserFollowersQuery } from '@/redux/apiSlices/userQueryApi';
import { useFollowUserMutation, useUnFollowUserMutation } from '@/redux/apiSlices/userApi';

interface Props {
  dataUsername: string;
  dataId: string;
}

export default function FollowOrUnfollowBtn({ dataUsername, dataId }: Props) {
  const localUserId = useAppSelector((state) => state.userReducer?.user?.id);
  const { data, isLoading, error, refetch } = useGetUserFollowersQuery(dataUsername);

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
      window.alert('Error when following this user');
    }
  };

  const onUnfollow = async () => {
    try {
      const response = await unFollowUser(dataId).unwrap();
      console.log(response);
      refetch();
      setShowConfirmation(false); // Oculta la tarjeta de confirmación
    } catch (error) {
      window.alert('Error when unfollowing this user');
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
        <div className="fixed inset-0 flex items-center  justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] mx-auto max-w-[240px] shadow-lg text-center animate-fadeIn border-2 [border-color:#8c52ff]">
            <p className="text-lg font-semibold">
              Are you sure you want to unfollow {dataUsername}?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition "
                onClick={onUnfollow}
              >
                Yes, unfollow
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition border-2 [border-color:#8c52ff]"
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
