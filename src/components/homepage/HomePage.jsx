"use client"
import React from 'react'
import { Grid, Card, Typography, CardContent, Stack } from '@mui/material'
import { Carousel } from 'antd';
import chatwithfriend from "@/assets/images/chatwithfriend.png"
import chatwithfriend1 from "@/assets/images/chatwithfriend1.png"
import makenewfriend from "@/assets/images/makenewfriend.png"
import makenewfriend1 from "@/assets/images/makenewfriend1.png"
import calendar from "@/assets/images/calendar.png"
import calendar1 from "@/assets/images/calendar1.png"
import group from "@/assets/images/group.png"
import group1 from "@/assets/images/group1.png"
import Image from "next/image"
const HomePage = () => {
  return (
    <Carousel autoplay>
        <div>
          <Card sx={{
            padding: "20px",
            margin: "50px",
          }} >
            <CardContent>
              <Typography variant="h4" component="div" sx={{ paddingBottom: "20px" }}>
                Chat with your friends
              </Typography>
              <Stack direction="row" spacing={2}>
              <Image src={chatwithfriend} alt="chat" width={800} height={800} />
              <Image src={chatwithfriend1} alt="chat" width={800} height={800} />
              </Stack>
            </CardContent>
          </Card>
        </div>
        <div>
        <Card sx={{
            padding: "20px",
            margin: "50px",
          }} >
        <CardContent>
              <Typography variant="h4" component="div" sx={{ paddingBottom: "20px" }}>
                Make new friends
              </Typography>
              <Stack direction="row" spacing={2}>
              <Image src={makenewfriend} alt="chat" width={800} height={800} />
              <Image src={makenewfriend1} alt="chat" width={800} height={800} />
              </Stack>
            </CardContent>
          </Card>
        </div>
        <div>
        <Card sx={{
            padding: "20px",
            margin: "50px",
          }} >
        <CardContent>
              <Typography variant="h4" component="div" sx={{ paddingBottom: "20px" }}>
                Create your reminders
              </Typography>
              <Stack direction="row" spacing={2}>
              <Image src={calendar} alt="chat" width={800} height={800} />
              <Image src={calendar1} alt="chat" width={800} height={800} />
              </Stack>
            </CardContent>
          </Card>
        </div>
        <div>
        <Card sx={{
            padding: "20px",
            margin: "50px",
          }} >
        <CardContent>
              <Typography variant="h4" component="div" sx={{ paddingBottom: "20px" }}>
                Create your own groups
              </Typography>
              <Stack direction="row" spacing={2}>
              <Image src={group} alt="chat" width={800} height={800} />
              <Image src={group1} alt="chat" width={800} height={800} />
              </Stack>
            </CardContent>
          </Card>
        </div>
      </Carousel>
  )
}

export default HomePage