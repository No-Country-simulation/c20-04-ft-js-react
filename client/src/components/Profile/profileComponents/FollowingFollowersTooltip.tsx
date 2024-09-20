import React, { useState } from 'react';

import ShowFollowersBtn from './ShowFollowersBtn';
import ShowFollowingBtn from './ShowFollowingBtn';

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
        <ShowFollowersBtn followersLength={user?.followers?.length}/>

      {/* Botón para abrir la lista de following */}

        <ShowFollowingBtn followingsLength={user?.following?.length}/>

      {/* Fondo oscuro y tooltip */}
      
    </div>
  );
};

export default UserTooltip;