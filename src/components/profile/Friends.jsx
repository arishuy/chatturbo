import React, { useEffect } from 'react';
import { Grid, Card, Box, Typography, Link } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const Friends = () => {
    const [friends, setFriends] = React.useState([]);
    const { id } = useParams();
    async function getFriends() {
        const res = await fetch(`/api/friend/get/${id}`, {
            method: 'GET',
        });
        const data = await res.json();
        return data;
    }

    useEffect(() => {
        getFriends().then((data) => {
            setFriends(data);
        });
    }, []);
    return (
        <div>
            <Typography
                variant="h5"
                component="div"
                style={{ padding: '10px' }}
            >
                List of Friends
            </Typography>
            <Grid container spacing={2}>
                {friends?.map((friend) => (
                    <Grid key={friend._id}  item xs={12} md={4}>
                        <Link  href={`/profile/${friend._id}`} passHref  sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}>
                        <Card sx={{ display: 'flex', padding: '10px' }}>
                            <Image
                                src={friend.avatar}
                                alt="Picture of the author"
                                width={100}
                                height={100}
                                style={{
                                    borderRadius: '12px',
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                }}
                            >
                                <Typography variant="h6" component="div">
                                    {friend.name} {friend.surname}
                                </Typography>
                            </Box>
                        </Card>
                  </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Friends;
