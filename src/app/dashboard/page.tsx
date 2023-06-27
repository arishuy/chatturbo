"use client"
import React from 'react'
import { Grid } from "@mui/material";
import TopMessage from '@/components/dashboard/TopMessage';
import Reminder from '@/components/dashboard/Reminder';
const Page = () => {
  return (
    <div style={{
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: "1200px",
      paddingTop: "50px", 
  }}>
      <title>Dashboard</title>
      <Grid
        container
        spacing={3}
        sx={{
          width: "auto",
          marginLeft: "auto",
        }}>
        <Grid item xs={12} md={4} lg={4}>
          <TopMessage />
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Reminder />
        </Grid>
      </Grid>
    </div>
  )
}

export default Page