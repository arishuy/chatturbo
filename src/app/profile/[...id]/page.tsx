import UserBanner from '@/components/profile/UserBanner'
import React from 'react'

const page = () => {
  return (
    <div style={{
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1200px",
      paddingTop: "50px",
    }}>
      <title>Profile</title>
    <UserBanner />
    </div>
  )
}

export default page