import React from "react";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  Divider,
  ListItem,
} from "@mui/material";
import { useSession } from "next-auth/react";
export type GroupInfoProps = {
  _id: string;
  name: string;
  avatar: string;
  members: {
    _id: string;
    name: string;
    surname: string;
    avatar: string;
    quote: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
const GroupInfo = ({
  groupInfo,
  isGroup,
}: {
  groupInfo: GroupInfoProps;
  isGroup: boolean;
}) => {
  const { data: session } = useSession();
  return (
    <>
      <Box sx={{ padding: "40px 15px" }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isGroup ? (
            <>
              <Avatar
                sx={{
                  width: "60px",
                  height: "60px",
                }}
                alt="Remy Sharp"
                src={groupInfo?.avatar}
              />
              <Typography variant="h6">{groupInfo?.name}</Typography>
              <Typography
                sx={{ opacity: "0.5", fontSize: "14px" }}
                variant="h6"
              >
                {groupInfo?.members?.length} members
              </Typography>
            </>
          ) : (
            <>
              <Avatar
                sx={{
                  width: "60px",
                  height: "60px",
                }}
                alt="Remy Sharp"
                src={
                  groupInfo?.members?.filter(
                    (member) => member._id !== session?.user?._doc._id
                  )[0]?.avatar
                }
              />
              <Typography variant="h6">
                {groupInfo
                  ? groupInfo?.members?.filter(
                      (member) => member._id !== session?.user?._doc._id
                    )[0]?.name +
                    " " +
                    groupInfo?.members?.filter(
                      (member) => member._id !== session?.user?._doc._id
                    )[0]?.surname
                  : "Loading..."}
              </Typography>
              <Typography
                sx={{ opacity: "0.5", fontSize: "14px" }}
                variant="h6"
              >
                {groupInfo
                  ? groupInfo?.members?.filter(
                      (member) => member._id !== session?.user?._doc._id
                    )[0]?.quote
                  : "Loading..."}
              </Typography>
            </>
          )}
        </Stack>
      </Box>
      <Divider />
      <Box>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Reminders</Typography>
          <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
            See all
          </Typography>
        </ListItem>
      </Box>
      <Box>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Shared Media</Typography>
          <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
            See all
          </Typography>
        </ListItem>
      </Box>
    </>
  );
};

export default GroupInfo;
