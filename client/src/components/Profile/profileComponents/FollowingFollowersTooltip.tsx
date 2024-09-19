import React, { useState } from 'react';

export interface User {
  _id: string;
  followers: User[];
  following: User[];
  name: string;
  profile_photo: string;
  username: string;
  posts: any[];
}

interface UserTooltipProps {
  user: User;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ user }) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  // Función para cerrar todos los tooltips
  const closeTooltips = () => {
    setShowFollowers(false);
    setShowFollowing(false);
  };

  const handleFollowersClick = () => {
    setShowFollowers(!showFollowers);
    setShowFollowing(false);
  };

  const handleFollowingClick = () => {
    setShowFollowing(!showFollowing);
    setShowFollowers(false);
  };

  return (
    <div className="flex justify-center items-center gap-4">
      {/* Botón para abrir la lista de followers */}
      <button
        onClick={handleFollowersClick}
        className="text-black dark:text-white duration-300 hover:bg-neutral-400 p-1 rounded-xl"
      >
        <p>{user?.followers?.length}</p>
        <p>Followers</p>
      </button>

      {/* Botón para abrir la lista de following */}
      <button
        onClick={handleFollowingClick}
        className="text-black dark:text-white duration-300 hover:bg-neutral-400 p-1 rounded-xl"
      >
        <p>{user?.following?.length}</p>
        <p>Following</p>
      </button>

      {/* Fondo oscuro y tooltip */}
      {(showFollowers || showFollowing) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 w-screen"
          onClick={closeTooltips}
        >
          {/* Tooltip centrado */}
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black border border-medium-purple-400 shadow-lg p-4 rounded-lg w-64 z-50"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro del tooltip
          >
            {showFollowers && (
              <div>
                <h3 className="font-semibold">Followers</h3>
                <ul className="mt-2 space-y-2">
                  {user?.followers?.map((follower) => (
                    <li key={follower._id} className="flex items-center">
                      <img
                        src={follower?.profile_photo}
                        alt={follower?.username}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>{follower.username}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showFollowing && (
              <div>
                <h3 className="font-semibold">Following</h3>
                <ul className="mt-2 space-y-2">
                  {user?.following?.map((followedUser) => (
                    <li key={followedUser._id} className="flex items-center">
                      <img
                        src={followedUser.profile_photo}
                        alt={followedUser.username}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>{followedUser.username}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTooltip;