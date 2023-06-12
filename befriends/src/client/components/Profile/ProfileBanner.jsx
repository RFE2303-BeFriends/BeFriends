import React, { useState } from 'react';

const ProfileBanner = () => {
  //dummy image
  const profileImg = "https://picsum.photos/id/237/300/300"

  return (
    <div className="profile-banner">
      <p>Banner here</p>
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={profileImg} alt="Profile image" />
        </div>
      </div>
    </div>
  )
}

export default ProfileBanner