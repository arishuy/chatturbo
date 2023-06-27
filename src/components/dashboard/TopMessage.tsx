import React from 'react'
import { Card, Typography, Stack, Avatar } from '@mui/material'
const data = [
    {
        id: 1,
        name: 'John Doe',
        ammount: 1000,
    },
    {
        id: 2,
        name: 'John Doe',
        ammount: 979,
    },
    {
        id: 3,
        name: 'John Doe',
        ammount: 773,
    }
]
const TopMessage = () => {
    return (
        <Card sx={{ flexGrow: 1,
            backgroundColor: "#fff",
            borderRadius: "10px",
            }} >
            <Typography variant="h5" component="div" sx={{marginLeft: "20px", paddingTop:"20px"}}>
                Top Message
            </Typography>
            {data.map((item) => (
                <Stack key={item.id} direction="row" alignItems="center" spacing={2} sx={{padding: "10px 0px 10px 20px"}}>
                <Avatar src="https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png" alt="photoURL" />
                <Typography variant="subtitle2" noWrap>
                    {item.name}
                </Typography>
                <Typography variant="subtitle2" noWrap sx={{marginLeft: "auto"}}>
                    {item.ammount} Messages
                </Typography>
            </Stack>
            ))}
        </Card>
    )
}

export default TopMessage