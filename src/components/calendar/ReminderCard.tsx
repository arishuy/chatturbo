"use client"
import React from 'react'
import {
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";
import { ReminderInfoType } from './Calendar';
import { useSession } from 'next-auth/react';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRouter } from 'next/navigation';
interface ReminderCardProps {
    reminder: ReminderInfoType
}

const reminderCard = ({ reminder }: ReminderCardProps) => {
  const [textColor, setTextColor] = React.useState<string>(`text-${reminder.color}-700`);
  const { data: session } = useSession();
  const router = useRouter();
  const startTime = new Date(reminder.startTime);
  const start = startTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
   const endTime = new Date(reminder.endTime);
   const end = endTime.toLocaleTimeString([], {
     hour: "numeric",
     minute: "2-digit",
   });
  console.log(textColor)
  const handleDelete = async () => {
    const response = await fetch(`/api/reminder/delete/${reminder._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    console.log(res);
    if (res.success) {
      router.refresh();
    }
  };
  return (
    <div
      key={reminder._id}
      className={`!bg-${reminder.color}-100 h-full mb-2.5`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-bewteen",
        borderRadius: "10px",
      }}
    >
       <ListItemText
  sx={{ marginLeft: '15px' }}
  primary={
    <>
      <Typography
        variant="h4"
        className={textColor}
        sx={{ fontSize: '14px' }}
      >
        {reminder.title}
      </Typography>
      <Typography
        className={textColor}
        sx={{ opacity: '0.5', fontSize: '12px' }}
      >
        {reminder.creator === session?.user._doc._id ? 'by me' : ''}
      </Typography>
    </>
  }
  secondary={
    <Typography className={textColor} sx={{ opacity: '0.5', fontSize: '12px' }}>
      {start + ' - ' + end}
    </Typography>
  }
/>
      <Stack
        sx={{
          paddingLeft: "5px",
          flexDirection: "initial",
          paddingBottom: "6px",
          justifyContent: "space-between",
        }}
      >
       <AvatarGroup
          total={5}
          sx={{
            "& .css-fjw5v6-MuiAvatar-root-MuiAvatarGroup-avatar": {
              width: "20px",
              height: "20px",
              fontSize: "10px",
            },
          }}
        >
          <Avatar alt="Remy Sharp" src="" sx={{ width: 20, height: 20 }} />
          <Avatar alt="Travis Howard" src="" sx={{ width: 20, height: 20 }} />
          <Avatar alt="Agnes Walker" src="" sx={{ width: 20, height: 20 }} />
          <Avatar
            alt="Trevor Henderson"
            src=""
            sx={{ width: 20, height: 20 }}
          />
        </AvatarGroup>
        <Button onClick ={handleDelete}>
          <DeleteOutlineOutlinedIcon sx={{ width: 16, height: 16 }}
           />
        </Button>
      </Stack>
    </div>
  );
}

export default reminderCard