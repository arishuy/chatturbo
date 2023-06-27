/* eslint-disable @next/next/no-img-element */
// @mui
'use client'
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, TextField, Checkbox, FormControlLabel } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import image from '@/assets/images/register.gif';
import Image from 'next/image';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const register = async () => {
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
            return;
        }
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                name: name,
                surname: surname,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.status === 201) {
            router.push('/login');
        }
        else {
            const result = await res.json();
            console.log(result);
        }
    }

    const mdUp = useResponsive('up', 'md');
    if (session) {
        router.push('/dashboard');
    }
    else
        return (
            <>
                <title> Register </title>
                <StyledRoot>
                    {mdUp && (
                        <StyledSection>
                            <Image src={image} alt="Picture of the author" />
                        </StyledSection>
                    )}
                    <Container maxWidth="sm">
                        <StyledContent>
                            <Typography variant="h4" gutterBottom>
                                Sign up to Chat Turbo
                            </Typography>
                            <Stack spacing={3}>
                                <TextField name="username" label="Username" required onChange={(e) => { setUsername(e.target.value) }} />
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                                    <TextField name="name" label="Name" required onChange={(e) => { setName(e.target.value) }} />
                                    <TextField name="surname" label="Surname" required onChange={(e) => { setSurname(e.target.value) }} />

                                </Stack>
                                <TextField name="email" label="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                                <TextField
                                    name="password"
                                    label="Password"
                                    type='password'
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                                <TextField
                                    name="passwordconfirm"
                                    label="Password Confirm"
                                    type='password'
                                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                                />
                            </Stack>
                            <Button size="large" color="inherit" variant="outlined" sx={{my: 2}} onClick={register}>
                                Register
                            </Button>
                            <Typography variant="body2" sx={{ mb: 5 }}>
                                Already a member? {' '}
                                <Link variant="subtitle2" href='/login'>Sign In</Link>
                            </Typography>

                        </StyledContent>
                    </Container>
                </StyledRoot>
            </>
        );
}