import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Badge,
  Chip,
  Stack,
} from "@mui/material";
import { theme } from "../../theme"
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {useSession} from "next-auth/react";

interface GroupCardProps {
  name: string;
  latestMessage: string;
  avatar: string;
  time: string;
  url: string;
  seenBy: any;
  sender: any;
}

const GroupCard = ({ name, latestMessage,seenBy, avatar, time, url, sender }: GroupCardProps) => {
  const [isActive, setIsActive] = React.useState(false);
  const isSeenBy = useRef(false);
  const {data: session} = useSession()
  const pathname = usePathname();
  useEffect(() => {
  if (seenBy.includes(session?.user._doc._id)) {
    isSeenBy.current = true;
  } else {
    isSeenBy.current = false;
  }
  return () => {
    seenBy = [];
  };
  }, [seenBy, session?.user._doc._id, sender]);
  useEffect(() => {
    if (pathname === url) {
      setIsActive(true);
      // dispatch({ type: MENU_OPEN, id: item.id });
    } else {
      setIsActive(false);
    }
    // eslint-disable-next-line
  }, [pathname]);
  
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        width: "100%",
        borderRadius: "10px",
        "&:hover": {
          background: theme.palette.background.paper,
          transition: "0.3s ease-in-out",
        },
      }}
      selected={isActive}
    >
      <ListItemAvatar>
        <Badge
          color="success"
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
      </ListItemAvatar>
      <ListItem alignItems="flex-start">
        <ListItemText
          sx={{ width: "70%" }}
          primary={<Typography variant="h6">{name}</Typography>}
          secondary={
            <React.Fragment>
              <Typography noWrap 
        
              sx={{ marginTop: "10px", opacity: "0.5", color: !isSeenBy.current ? "black" : "",
              fontWeight: !isSeenBy.current ? "bold" : "",

}}>
                {latestMessage}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItem
          sx={{
            paddingTop: "10px",
            marginLeft: "auto",
            paddingLeft: "0px",
            paddingRight:"0px",
            justifyContent: "flex-end",
            width: "30%",
            marginRight: "15px",
          }}
        >
          <Stack
            direction="column"
            gap="15px"
            sx={{ justifyContent: "center", alignItems: "center", marginRight:"15px" }}
          >
            <Typography sx={{ fontSize: "12px", opacity: "0.7" }}>
              {time}
            </Typography>
            { !isSeenBy.current ? (<div
              style={{
                width: "5px",
                height: "5px",
                display: "flex",
                background: "#2065D1",
                borderRadius: "50%",
                color: "#fff",
                fontSize: "12px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
            </div>
            )
            : null
              }
            
          </Stack>
        </ListItem>
      </ListItem>
    </ListItem>
  );
};

export default GroupCard;
