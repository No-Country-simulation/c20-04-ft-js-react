import React, { useState } from 'react';

import ShowFollowersBtn from './ShowFollowersBtn';
import ShowFollowingBtn from './ShowFollowingBtn';

export interface User {
  _id: string;
  followers: string[];
  following: string[];
  name: string;
  profile_photo: string;
  username: string;
  posts: any[];
}

interface UserTooltipProps {
  user: User;
}

const UserTooltip: React.FC<UserTooltipProps> = ({ user }) => {

  return (
    <div className="flex justify-center items-center gap-4">
      {/* Botón para abrir la lista de followers */}
        <ShowFollowersBtn followersLength={user?.followers?.length} followers={user?.followers}/>

      {/* Botón para abrir la lista de following */}

        <ShowFollowingBtn followingsLength={user?.following?.length} following={user?.following}/>

      {/* Fondo oscuro y tooltip */}
      
    </div>
  );
};

export default UserTooltip;