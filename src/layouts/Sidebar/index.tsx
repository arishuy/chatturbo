"use client"
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Link from "next/link";
import { Avatar, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
function App() {
  const { data: session } = useSession();
  const router = useRouter();
  const link = `/profile/${session?.user.sub}`
  const logOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };
  if (!session) {
    router.push("/login");
  }
  const { collapseSidebar } = useProSidebar();
  useEffect(() => {
    collapseSidebar();
  }, [])

  return (
    <Sidebar backgroundColor="white" style={{ height: "100vh" }}>
      <Menu>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          {" "}
          <h2 style={{ color: "red" }}>Chat Turbo</h2>
        </MenuItem>
        {session && <Link href={link}><MenuItem
          style={{ textAlign: "center" }}
        >
          <Stack direction="row" alignItems="center" spacing={2} sx={{ padding: "10px 0px 10px 0px" }}>
            <Avatar src={session?.user._doc.avatar} alt="photoURL" />
            {" "}
            <h2>{session?.user._doc.name} {session?.user._doc.surname}</h2>
          </Stack>
        </MenuItem>
        </Link>}
        <Link href="/dashboard">
          <MenuItem icon={<HomeRoundedIcon />}>Home</MenuItem>
        </Link>
        <Link href="/message">
          <MenuItem icon={<ChatBubbleOutlineRoundedIcon />}>Messages</MenuItem>
        </Link>
        <Link href="/people">
          <MenuItem icon={<Groups2RoundedIcon />}>People</MenuItem>
        </Link>
        <Link href="/reminder">
          <MenuItem icon={<CalendarMonthRoundedIcon />}>Reminders</MenuItem>
        </Link>
        <Link href="/setting">
          <MenuItem icon={<SettingsRoundedIcon />}>Settings</MenuItem>
        </Link>
        {session && <MenuItem icon={<LogoutRoundedIcon />} onClick={logOut}>Sign Out</MenuItem>}
      </Menu>
    </Sidebar>
  );
}

export default App;