"use client";
import React, { useEffect, useState, useRef } from "react";
import { theme } from "../../../theme";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Stack,
  AvatarGroup,
  Skeleton,
  Button,
} from "@mui/material";
import DuoOutlinedIcon from "@mui/icons-material/DuoOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import GroupBody from "@/components/chat/GroupBody";
import GroupInfo from "@/components/chat/GroupInfo";
import AvatarOnline from "@/components/chat/AvatarOnline";
import NewReminder from "@/components/calendar/NewReminder";

const Page = () => {
  const { data: session } = useSession();
  const { id } = useParams();
  const [groupInfo, setGroupInfo] = useState();
  const isGroup = useRef(false);
  if (groupInfo?.members?.length > 2) {
    isGroup.current = true;
  }
  async function getGroupInfo() {
    const res = await fetch(`/api/group/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  }
  useEffect(() => {
    getGroupInfo().then((data) => {
      setGroupInfo(data);
    });
  }, []);
  const updateData = () => {
    getGroupInfo().then((data) => {
      setGroupInfo(data);
    });
  };

  return (
    <>
      <title>Message</title>
      <div
        style={{
          background: theme.palette.background.paper,
          height: "100vh",
          maxHeight: "100vh",
          overflowX: "hidden",
          overflowY: "hidden",
          display: "grid",
          gridTemplateColumns: "5fr 2px 2fr",
          gridTemplateRows: "1fr",
          gridTemplateAreas: "'main divider sidebar'",
        }}
      >
        <div
          style={{
            borderRight: "rgba(145, 158, 171, 0.24) solid",
            borderWidth: "1px",
            gridArea: "main",
            display: "flex",
            flexDirection: "column",
            background: groupInfo?.theme,
          }}
          >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 20px",
            }}
            >
            <Stack
              direction={"row"}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AvatarOnline
                isOnline={true}
                avatar={
                  groupInfo
                    ? isGroup.current
                      ? groupInfo?.avatar
                      : groupInfo?.members?.filter(
                          (member) => member._id !== session?.user?._doc._id
                        )[0]?.avatar
                    : ""
                }
              />
              <Typography variant="h6" style={{ paddingLeft: "20px" }}>
                {groupInfo ? (
                  isGroup.current ? (
                    groupInfo?.name
                  ) : (
                    groupInfo?.members?.filter(
                      (member) => member._id !== session?.user?._doc._id
                    )[0]?.name +
                    " " +
                    groupInfo?.members?.filter(
                      (member) => member._id !== session?.user?._doc._id
                    )[0]?.surname
                  )
                ) : (
                  <Skeleton variant="text" width="100px" />
                )}
              </Typography>
            </Stack>
            <Stack direction="row" style={{ display: "flex" }}>
              <Button sx={{ minWidth: "0px" }}>
                <DuoOutlinedIcon fontSize="small" style={{ opacity: "0.6" }} />
              </Button>
              <Button sx={{ minWidth: "0px" }}>
                <CallOutlinedIcon fontSize="small" style={{ opacity: "0.6" }} />
              </Button>
              <Button sx={{ minWidth: "0px" }}>
                <ImageOutlinedIcon
                  fontSize="small"
                  style={{ opacity: "0.6" }}
                />
              </Button>
              {/* <TextSnippetOutlinedIcon
                fontSize="small"
                style={{ opacity: "0.7" }}
              /> */}
              <NewReminder groupId={`${id}`}></NewReminder>
            </Stack>
            {isGroup.current && (
              <AvatarGroup max={3}>
                {groupInfo?.members?.map((member) => (
                  <Avatar
                    key={member._id}
                    alt={member.name + " " + member.surname}
                    src={member.avatar}
                  />
                ))}
              </AvatarGroup>
            )}
          </div>
          <Divider />
          <div
            style={{
              maxHeight: "100vh",
              overflow: "auto",
              flexGrow: 1,
            }}
          >
            <GroupBody id={id} />
          </div>
        </div>
        <div
          style={{
            gridArea: "divider",
            backgroundColor: "rgba(0, 0, 0, 0.12)",
          }}
        />
        <div
          style={{
            gridArea: "sidebar",
            borderLeft: "rgba(145, 158, 171, 0.24) solid",
            borderWidth: "1px",
          }}
        >
          <GroupInfo groupInfo={groupInfo} isGroup={isGroup.current} updateData={updateData} />
        </div>
      </div>
    </>
  );
};

export default Page;
