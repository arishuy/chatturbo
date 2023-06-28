import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { Avatar, Card, Stack, Typography, Link } from '@mui/material';
async function getRandomPeople() {
    const res = await fetch(`/api/people`, {
        method: 'GET',
    });
    const data = await res.json();
    return data;
}

const RandomPeople = () => {
    const [initialPeople, setInitialPeople] = React.useState([]);
    useEffect(() => {
        getRandomPeople().then((res) => {
            setInitialPeople(res);
        });
    }, []);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Card
                sx={{
                    flexGrow: 1,
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                }}
            >
                <Typography
                    variant="h4"
                    component="div"
                    sx={{ marginLeft: '20px', padding: '20px 0px' }}
                >
                    May be you know
                </Typography>
                {initialPeople.map((item) => (
                    <Link
                        key={item._id}
                        href={`/profile/${item._id}`}
                        passHref
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{
                                padding: '10px 0px 10px 35px',
                                margin: '10px',
                                borderRadius: '20px',
                                '&:hover': {
                                    background: 'whitesmoke',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            <Avatar src={item.avatar} alt="photoURL" />
                            <Typography variant="h5" noWrap>
                                {item.name} {item.surname}
                            </Typography>
                        </Stack>
                    </Link>
                ))}
            </Card>
        </Suspense>
    );
};

export default RandomPeople;
