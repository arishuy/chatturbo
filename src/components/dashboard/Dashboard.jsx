"use client"
import React from 'react'
import { Grid } from "@mui/material";
import TopMessage from '@/components/dashboard/TopMessage';
import Reminder from '@/components/dashboard/Reminder';
import RandomPeople from '@/components/dashboard/RandomPeople';
import FriendRequest from '@/components/dashboard/FriendRequest';
import RequestTo from '@/components/dashboard/RequestTo';
const Dashboard = ({randomPeople, friendRequest, requestTo}) =>{
  return (
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
        <Grid item xs={12} md={4} lg={4}>
          <RandomPeople randomPeople={randomPeople}  />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <FriendRequest friendRequest={friendRequest} />
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <RequestTo requestTo={requestTo} />
        </Grid>
      </Grid>
  )
}

export default Dashboard
