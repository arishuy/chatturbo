"use client";
import React from "react";
import {
  Stack,
  Typography,
  AvatarGroup,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";
import { ReminderInfoType } from "./Calendar";
import { useSession } from "next-auth/react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useRouter } from "next/navigation";
import { theme } from "@/theme";
interface ReminderCardProps {
  reminder: ReminderInfoType;
}

const ReminderCard = ({ reminder }: ReminderCardProps) => {
  const { data: session } = useSession();
  const color = theme.palette.reminder[reminder.color];
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
  const handleDelete = async () => {
    const response = await fetch(`/api/reminder/delete/${reminder._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if (res.success) {
      router.refresh();
    }
  };
  return (
    <div
      key={reminder._id}
      className="h-full mb-2.5"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-bewteen",
        borderRadius: "10px",
        backgroundColor: color,
      }}
    >
      <ListItemText
        sx={{ marginLeft: "15px" }}
        primary={
          <>
            <Typography
              variant="h4"
              sx={{ fontSize: "14px", color: reminder.color }}
            >
              {reminder.title}
            </Typography>
            <Typography
              sx={{ opacity: "0.5", fontSize: "12px", color: reminder.color }}
            >
              {reminder.creator === session?.user._doc._id ? "by me" : ""}
            </Typography>
          </>
        }
        secondary={
          <Typography
            sx={{ opacity: "0.5", fontSize: "12px", color: reminder.color }}
          >
            {start + " - " + end}
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
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: "20px",
              height: "20px",
              fontSize: "10px",
            },
          }}
        >
          {reminder.group?.members.map((member: any) => (
            <Avatar key={member._id} alt="Remy Sharp" src={member.avatar} sx={{ width: 20, height: 20 }} />)
          )}
        </AvatarGroup>
        <Button onClick={handleDelete}>
          <DeleteOutlineOutlinedIcon
            sx={{ width: 16, height: 16, color: reminder.color }}
          />
        </Button>
      </Stack>
    </div>
  );
};

export default ReminderCard;
