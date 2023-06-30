"use client"
import React from 'react'
import { Avatar, Card, Stack, Typography } from '@mui/material'

const data = [
    {
        id: 1,
        content: "Do somthing",
        time: "9:30 AM",
    },
    {
        id: 2,
        content: "Do somthing",
        time: "9:30 AM",
    },
    {
        id: 3,
        content: "Do somthing",
        time: "9:30 AM",
    }
]
const Reminder = () => {
  return (
    <Card sx={{ flexGrow: 1,
        backgroundColor: "#fff",
        borderRadius: "10px",
        }} >
        <Typography variant="h5" component="div" sx={{marginLeft: "20px", paddingTop:"20px"}}>
            Reminder
        </Typography>
        {data.map((item) => (
            <Stack key={item.id} direction="row" alignItems="center" spacing={2} sx={{padding: "10px 0px 10px 20px"}}>
            <Typography variant="subtitle2" noWrap> 
                {item.content}
            </Typography>
            <Typography variant="subtitle2" noWrap sx={{marginLeft: "auto"}}>
                {item.time}
            </Typography>
        </Stack>
        ))}
    </Card>
  )
}

export default Reminder