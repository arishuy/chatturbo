'use client';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import {
    Typography,
    TextField,
    FormControl,
    InputAdornment,
    Box,
    Grid,
    Link,
    Card,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: 'column',
        padding: theme.spacing(3),
        maxHeight: '100vh',
        overflow: 'auto',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    searchInput: {
        marginBottom: theme.spacing(2),
    },
    searchButton: {
        marginBottom: theme.spacing(2),
    },
    results: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const SearchPeople = () => {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = async () => {
        const res = await fetch(`/api/search/${searchTerm}`);
        const data = await res.json();
        setSearchResults(data);
    };
    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.title}>
                Find Someone
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FormControl sx={{ width: '90%' }}>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Input name or surname"
                        sx={{
                            marginLeft: '15px',
                            '& .MuiInputBase-root': {
                                height: '50px',
                            },
                            background: 'white',
                            borderRadius: '15px',
                            marginBottom: '15px',
                        }}
                        onChange={handleSearchChange}
                        onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                handleSearchClick();
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
            </div>
            <div className={classes.results}>
                <Typography
                    variant="h5"
                    component="div"
                    style={{ padding: '10px' }}
                >
                    Result
                </Typography>
                <Grid container spacing={2}>
                    {searchResults?.map((people) => (
                        <Grid key={people._id} item xs={12} md={4}>
                            <Link
                                href={`/profile/${people._id}`}
                                passHref
                                sx={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <Card sx={{ display: 'flex', padding: '10px' }}>
                                    <Image
                                        src={people.avatar}
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
                                        <Typography
                                            variant="h6"
                                            component="div"
                                        >
                                            {people.name} {people.surname}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default SearchPeople;
