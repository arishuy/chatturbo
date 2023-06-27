import React from 'react'
import { Grid, Card, CardHeader, Divider, Stack, Typography } from '@mui/material'
import RoomRoundedIcon from '@mui/icons-material/RoomRounded';
import MarkunreadRoundedIcon from '@mui/icons-material/MarkunreadRounded';

const Profile = ({user}: any) => {
    return (
        <>
            <Grid
                container
                spacing={3}
                sx={{
                    width: "auto",
                    marginLeft: "auto",
                }}>
                <Grid item direction="row" xs={12} md={4} lg={4}>
                    <Grid item xs={12}>
                        <Card sx={{ width: "100%", height: "100px", display: "flex" }}>
                            <Stack direction="column" alignItems="center" spacing={1} sx={{ width: "50%" }}>
                                <Typography variant="h5" component="div" sx={{ paddingTop: "20px" }}>
                                    Friends
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                                    {user?.friends.length}
                                </Typography>
                            </Stack>
                            <Divider orientation="vertical" />
                            <Stack direction="column" alignItems="center" spacing={1} sx={{ width: "50%" }}>
                                <Typography variant="h5" component="div" sx={{ paddingTop: "20px" }}>
                                    Followers
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
                                    1095
                                </Typography>
                            </Stack>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sx={{ pt: 2 }}>
                        <Card sx={{ width: "100%"}}>
                            <CardHeader title="About" titleTypographyProps={{
                                fontSize: 22,
                            }} />
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "24px"}}>
                                <Typography variant="h6" noWrap>
                                    {user?.quote}
                                </Typography>
                                <div style={{display: 'flex', flexDirection: 'row', gap: "16px"}}>
                                    <RoomRoundedIcon /> <Typography variant="h6" noWrap>
                                        123 Street, City, Country
                                </Typography>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', gap: "16px"}}>
                                    <MarkunreadRoundedIcon /> <Typography variant="h6" noWrap>
                                        abc@gmail.com
                                </Typography>
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', gap: "16px"}}>
                                    <RoomRoundedIcon /> <Typography variant="h6" noWrap>
                                        123 Street, City, Country
                                </Typography>
                                </div>
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sx={{ pt: 2 }}>
                        <Card sx={{ width: "100%", height: "100px" }}>
                            <CardHeader title="Social" titleTypographyProps={{
                                fontSize: 22,
                            }} />
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>   
                    <Grid item xs={12}>
                        <Card sx={{ width: "100%", height: "100px" }}>
                        <CardHeader title="The feature is in progress!" titleTypographyProps={{
                                fontSize: 22,
                            }} />
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile  