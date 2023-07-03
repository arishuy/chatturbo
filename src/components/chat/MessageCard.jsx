import React from "react";
import "react-chat-elements/dist/main.css";
import {
  MessageBox,
  ITextMessageProps,
  IMessageBoxProps,
} from "react-chat-elements";
import { Avatar, ListItem, ListItemAvatar, Box, Stack } from "@mui/material";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { useSession } from "next-auth/react";
const MessageCard = ({
  avatar,
  title,
  position,
  type,
  text,
  date,
  seenBy
}) => {
  const { data: session } = useSession();
  // loai bo id cua minh ra khoi seenBy
  if (seenBy?.length > 0) {
    seenBy = seenBy.filter((person) => person._id !== session?.user._doc._id);
  }
  return (
    <Box>
      {position === "left" ? (
        <>
          <ListItem sx={{ padding: "0 15px" }}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  width: "56px",
                  height: "56px",
                }}
                alt="Remy Sharp"
                src={avatar}
              />
            </ListItemAvatar>
            <MessageBox
              position={position}
              title={title}
              type={type}
              text={type === "text" ? text : ""}
              date={date}
              replyButton={true}
              data={{
                uri: text,
              }}
            />
          </ListItem>
          <>
            {seenBy?.length ? (
              // <CheckCircleRoundedIcon
              //   sx={{
              //     color: "green",
              //     position: "absolute",
              //     fontSize: "15px",
              //     right: "8px",
              //     bottom: "12px",
              //   }}
              // />
              <Stack
                direction="row"
                spacing={1}
                sx={{ width: "99%", justifyContent: "flex-end" }}
              >
                {seenBy.map((person) => (
                  <Avatar
                    key={person._id}
                    alt="Remy Sharp"
                    src={person.avatar}
                    sx={{ width: 15, height: 15 }}
                  />
                ))}
              </Stack>
            ) : null}
          </>
        </>
      ) : (
        <div style={{ position: "relative" }}>
          <MessageBox
            position="right"
            type={type}
            text={type === "text" ? text : ""}
            date={date}
            replyButton={true}
            data={{
              uri: text,
            }}
          />
          {seenBy?.length ? (
            // <CheckCircleRoundedIcon
            //   sx={{
            //     color: "green",
            //     position: "absolute",
            //     fontSize: "15px",
            //     right: "8px",
            //     bottom: "12px",
            //   }}
            // />
            <Stack
              direction="row"
              spacing={1}
              sx={{ width: "99%", justifyContent: "flex-end" }}
            >
              {seenBy.map((person) => (
                <Avatar
                  key={person._id}
                  alt="Remy Sharp"
                  src={person.avatar}
                  sx={{ width: 15, height: 15 }}
                />
              ))}
            </Stack>
          ) : null}
        </div>
      )}
    </Box>
  );
};

export default MessageCard;
