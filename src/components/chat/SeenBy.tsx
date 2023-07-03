import React, { useEffect } from 'react'
import { Avatar, Stack } from '@mui/material'

interface SeenByProps {
    seenBy: any
}

const SeenBy = ({ seenBy }: SeenByProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ width: "99%", justifyContent: "flex-end" }}
    >
      {seenBy.map((person : any) => (
        <Avatar
          key={person._id}
          alt="Remy Sharp"
          src={person.avatar}
          sx={{ width: 15, height: 15 }}
        />
      ))}
    </Stack>
  );
}

export default SeenBy