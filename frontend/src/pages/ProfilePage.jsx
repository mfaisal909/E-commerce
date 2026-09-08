import React from 'react'
import Header from '../components/Login/Layout/Header'
import ProfileSideBar from '../components/Profile/ProfileSideBar'
import ProfileContent from '../components/Profile/ProfileContent'
import { useState } from 'react'
const ProfilePage = () => {
    const [active, setActive] = useState(1);
  return (
    <div>
        <Header/>
        <div>
            <div>
                <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
        </div>
    </div>
  )
}

export default ProfilePage