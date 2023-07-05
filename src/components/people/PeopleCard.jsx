'use client';
import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/navigation';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
const useStyles = makeStyles((theme) => ({
    card: {
        position: 'relative',
        width: '500px',
        height: '650px',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: theme.shadows[3],
        backgroundColor: theme.palette.background.paper
    },
    media: {
        height: '500px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    content: {
        padding: theme.spacing(2),
        backgroundColor: '#fff',
        textAlign: 'center',
    },
    name: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    description: {
        fontSize: '14px',
        color: '#666',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: theme.spacing(2),
    },
    button: {
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
    },
    skipButton: {
        backgroundColor: '#fff',
        color: '#000',
        '&:hover': {
            backgroundColor: '#ddd',
        },
    },
    connectButton: {
        backgroundColor: '#000',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#333',
        },
    },
}));

const TinderCard = ({ data }) => {
    const classes = useStyles();
    const router = useRouter();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const handleSkip = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const { _id, avatar, name, quote, surname } = data[currentCardIndex];

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={avatar} title={name} />
            <CardContent className={classes.content}>
                <Typography variant="h6" className={classes.name}>
                    {name} {surname}
                </Typography>
                <Typography variant="body2" className={classes.description}>
                    {quote}
                </Typography>
                <div className={classes.buttonsContainer}>
                    <Button
                        className={`${classes.button} ${classes.skipButton}`}
                        onClick={handleSkip}
                    >
                        <CloseRoundedIcon />
                    </Button>
                    <Button
                        className={`${classes.button} ${classes.connectButton}`}
                        onClick={(e) => {
                            e.preventDefault();
                            router.push(`/profile/${_id}`);
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
