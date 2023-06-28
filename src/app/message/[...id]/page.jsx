"use client";
import React from "react";
import { theme } from "../../../theme";
import { Grid } from "@mui/material";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Stack,
  AvatarGroup,
} from "@mui/material";
import DuoOutlinedIcon from "@mui/icons-material/DuoOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import GroupInfo from "@/components/chat/GroupInfo";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRef } from "react";
import GroupBody from "@/components/chat/GroupBody";
import AvatarOnline from "@/components/chat/AvatarOnline";

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
  return (
    <>
      <title>Message</title>
      <Grid
        container
        sx={{
          background: theme.palette.background.paper,
          height: "100vh",
          maxHeight: "100vh",
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          md={9}
          lg={9}
          sx={{
            borderRight: "rgba(145, 158, 171, 0.24) solid",
            borderWidth: "1px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 20px",
            }}
          >
            <Stack
              direction={"row"}
              sx={{
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
              <Typography variant="h6" sx={{ paddingLeft: "20px" }}>
                {groupInfo
                  ? isGroup.current
                    ? groupInfo?.name
                    : groupInfo?.members?.filter(
                        (member) => member._id !== session?.user?._doc._id
                      )[0]?.name +
                      " " +
                      groupInfo?.members?.filter(
                        (member) => member._id !== session?.user?._doc._id
                      )[0]?.surname
                  : "Loading..."}
              </Typography>
            </Stack>
            <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>
              <DuoOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
              <CallOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
              <ImageOutlinedIcon fontSize="small" sx={{ opacity: "0.6" }} />
              <TextSnippetOutlinedIcon
                fontSize="small"
                sx={{ opacity: "0.7" }}
              />
            </Stack>
            {isGroup.current && (
              <AvatarGroup max={3}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png"
                />
                <Avatar
                  alt="Travis Howard"
                  src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png"
                />
                <Avatar
                  alt="Cindy Baker"
                  src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png"
                />
                <Avatar
                  alt="Agnes Walker"
                  src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png"
                />
                <Avatar
                  alt="Trevor Henderson"
                  src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png"
                />
              </AvatarGroup>
            )}
          </Box>
          <Divider />
          <Box sx={{ maxHeight: "100vh", overflow: "auto" }}>
            <GroupBody id={id} />
          </Box>
        </Grid>
        <Divider />
        <Grid item xs={12} md={3} lg={3}>
          <GroupInfo groupInfo={groupInfo} isGroup={isGroup.current} />
        </Grid>
      </Grid>
    </>
  );
};

export default Page;
