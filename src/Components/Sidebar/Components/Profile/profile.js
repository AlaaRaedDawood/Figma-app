import React, { useEffect, useState } from 'react';
import './profile.css'
import avatarImage from '../../../../Assets/avatar/profile_photo.png'
import avatarImageHover from '../../../../Assets/avatar/profile_photo-active.png'
function Profile() {
  
  return (
    <div className='profile'>
      <div>
           {/* <img src={avatarImage} /> */}
           <img
            src={avatarImage}
            onMouseOver={e => (e.currentTarget.src = avatarImageHover)}
            onMouseOut={e => (e.currentTarget.src = avatarImage)}
           />
      </div>
      <div>
           <p className='profile-name'>Ahmed Reda</p>
           <p className='profile-id'>#1253724</p>
      </div>

    </div>
  );
}

export default Profile;