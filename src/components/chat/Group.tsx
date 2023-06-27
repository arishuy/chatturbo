"use client";
import {
  Box,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  List,
  Divider,
  Badge,
  Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useEffect, useMemo } from "react";
import GroupCard from "./GroupCard";
import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Link from "next/link";
import { timeSince } from "../../utils/changeDate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/libs/pusher";
import AvatarOnline from "./AvatarOnline";

const Group = () => {
  const [initialGroups, setInitialGroups] = React.useState([]);
  const router = useRouter();
  const { data: session } = useSession();
  async function getAllGroups() {
    const groups = await fetch("/api/group", {
      method: "GET",
    });
    const data = await groups.json();
    return data;
  }
   const pusherKey = useMemo(() => {
     return session?.user._doc._id;
   }, [session?.user._doc._id]);
  
  useEffect(() => {
    if (!pusherKey) return;
     pusherClient.subscribe(pusherKey);
    const updateHandler = (conversation: any) => {
      setInitialGroups((current: any) => {
        const index = current.findIndex(
          (group: any) => group._id === conversation._id
        );
        if (index === -1) {
          return current;
        }
        //remove the group by index
        const newGroups = current.filter(
          (group: any) => group._id !== conversation._id
        );
        return [conversation, ...newGroups];
      });
     };
    pusherClient.bind("group:update", updateHandler);
    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("group:update", updateHandler);
    }
  }, [pusherKey]);
  useEffect(() => {
    getAllGroups().then((res) => {
      setInitialGroups(res);
    })
  }, []);
  return (
    <Box sx={{ padding: "35px 15px 50px 15px" }}>
      <Box sx={{ paddingBottom: "15px" }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar
              sx={{
                width: "56px",
                height: "56px",
              }}
              alt="Remy Sharp"
              src={session?.user?._doc.avatar}
            />
          </ListItemAvatar>
          <ListItemText
            sx={{ marginLeft: "15px" }}
            primary={
              <Typography variant="h4">
                {session?.user._doc.name} {session?.user._doc.surname}
              </Typography>
            }
            secondary={
              <Typography sx={{ opacity: "0.5", fontSize: "14px" }}>
                {session?.user._doc.quote}
              </Typography>
            }
          />
        </ListItem>
      </Box>
      <Divider />
      <Box sx={{ paddingTop: "33px" }}>
        <Typography variant="h4"> Online now</Typography>
        <ListItem
          sx={{
            gap: "15px",
            maxWidth: "100%",
            overflowX: "auto",
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
          <AvatarOnline
            isOnline={true}
            avatar={
              "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png"
            }
          />
        </ListItem>
      </Box>
      <Box>
        <Box
          sx={{
            paddingTop: "30px",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4"> Messages</Typography>
          <Button>
            <AddToPhotosOutlinedIcon
              fontSize="medium"
              sx={{ opacity: "0.5", marginRight: "15px" }}
            />
          </Button>
        </Box>
        <Box>
          <FormControl sx={{ width: "90%" }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search"
              sx={{
                marginLeft: "15px",
                "& fieldset": { border: "none" },
                "& .MuiInputBase-root": {
                  height: "50px",
                },
                background: "white",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
              //   onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Box sx={{ width: "100%" }}>
            <List sx={{ width: "100%" }}>
              {initialGroups.map((group: any) => {
                const friend = group?.members.filter(
                  (member: any) => member._id !== session?.user._doc._id
                );
                return (
                  <Link href={`/message/${group._id}`} key={group._id}>
                    <GroupCard
                      key={group.id}
                      url={`/message/${group._id}`}
                      name={friend[0]?.name + " " + friend[0]?.surname}
                      avatar={friend[0]?.avatar}
                      latestMessage={
                        group.latestMessage?.sender === session?.user._doc._id
                          ? "You: " + group.latestMessage?.content
                          :group.latestMessage?.content
                      }
                      seenBy= {group.latestMessage?.seenBy}
                      time={timeSince(new Date(group.latestMessage?.createdAt))}
                      sender= {group.latestMessage?.sender}
                    />
                  </Link>
                );
              })}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Group;
