"use client"
import React from 'react'
import { Grid } from "@mui/material";
import TopMessage from '@/components/dashboard/TopMessage';
import Reminder from '@/components/dashboard/Reminder';
import RandomPeople from '@/components/dashboard/RandomPeople';
import FriendRequest from '@/components/dashboard/FriendRequest';
import RequestTo from '@/components/dashboard/RequestTo';
const Dashboard = (props) =>{
  return (
    <Grid
        container
        spacing={3}
        sx={{
          width: "auto",
          marginLeft: "auto",
        }}>
        <Grid item xs={12} md={4} lg={4}>
        {/* <TopMessage /> */}
        {props.TopMessage}
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          {/* <Reminder />
           */}
        {props.Reminder}
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
        {/* <RandomPeople randomPeople={randomPeople}  /> */}
        {props.RandomPeople}
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
        {/* <FriendRequest friendRequest={friendRequest} /> */}
        {props.FriendRequest}
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
        {/* <RequestTo requestTo={requestTo} /> */}
        {props.RequestTo}
        </Grid>
      </Grid>
  )
}

export default Dashboard
