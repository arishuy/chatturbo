import React from 'react'
import { Avatar, Badge } from '@mui/material'

interface AvatarOnlineProps {
    avatar: string
    isOnline: boolean
}
const AvatarOnline = ({ avatar, isOnline }: AvatarOnlineProps) => {

  return (
    <>
      <Badge
        color={isOnline ? "success" : "error"}
        overlap="circular"
        badgeContent=" "
        variant="dot"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 56, height: 56, marginTop: "7px" }}
          src={avatar}
        />
      </Badge>
    </>
  );
}

export default AvatarOnline