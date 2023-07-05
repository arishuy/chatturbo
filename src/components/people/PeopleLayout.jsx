"use client"
import React from 'react'
import { Grid, Typography } from "@mui/material";
const PeopleLayout = (props) =>{
  return (
    <Grid
        container
        spacing={3}
        sx={{
          width: "auto",
          marginLeft: "auto",
        }}>
        <Grid item xs={12} md={5} lg={5} sx={{
            borderRight: "1px solid #ccc",
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh"
            }}>
        {props.PeopleCard}
                </div>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
        {props.SearchPeople}
        </Grid>
      </Grid>
  )
}

export default PeopleLayout
