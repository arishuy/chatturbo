"use client";
import { Grid } from "@mui/material";
import Group from "../../components/chat/Group";
import { theme } from "../../theme";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={3}
        lg={3}
        sx={{
          background: theme.palette.background.neutral,
          height: "100vh",
          maxHeight: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Group />
      </Grid>
      <Grid
        item
        xs={12}
        md={9}
        lg={9}
        sx={{
          background: theme.palette.background.neutral,
          height: "100vh",
          maxHeight: "100vh",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <div>{children}</div>
      </Grid>
    </Grid>
  );
}
