'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import {theme} from '@/theme';

const TinderCard = ({ data }) => {
    const router = useRouter();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleSkip = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const { _id, avatar, name, quote, surname } = data[currentCardIndex];

    return (
        <Card
            sx={{
                position: 'relative',
                width: '500px',
                height: '650px',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: theme.shadows[3],
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <CardMedia
                sx={{
                    height: '500px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
                image={avatar}
                title={name}
            />
            <CardContent
                sx={{
                    padding: theme.spacing(2),
                    backgroundColor: '#fff',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 'bold',
                        marginBottom: theme.spacing(1),
                    }}
                >
                    {name} {surname}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: '14px',
                        color: '#666',
                    }}
                >
                    {quote}
                </Typography>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        marginTop: theme.spacing(2),
                    }}
                >
                    <Button
                        onClick={handleSkip}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: 'auto',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            backgroundColor: '#fff',
                            color: '#000',
                            '&:hover': {
                                backgroundColor: '#ddd',
                            },
                        }}
                    >
                        <CloseRoundedIcon />
                    </Button>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`/profile/${_id}`);
                        }}
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            minWidth: 'auto',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#333',
                            },
                        }}
                    >
                        <CheckRoundedIcon />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default TinderCard;
