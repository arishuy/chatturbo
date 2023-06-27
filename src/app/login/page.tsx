/* eslint-disable @next/next/no-img-element */
// @mui
'use client'
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, IconButton, TextField, Checkbox,FormControlLabel } from '@mui/material';
// hooks
import useResponsive from '@/hooks/useResponsive';
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import image from '@/assets/images/chat.gif';
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

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
    const login = async () => {
        const res = await signIn("credentials", {
            username: username,
            password: password,
        });
    };
  const mdUp = useResponsive('up', 'md');
  if (session) {
    router.push('/dashboard');
  }
  else
  return (
    <>
        <title> Login </title>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography> */}
            <Image src={image} alt="Picture of the author" />
          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Sign in to Chat Turbo
            </Typography>
            <Stack spacing={3}>
        <TextField name="username" label="Username" onChange={(e) => {setUsername(e.target.value)}} />

        <TextField
          name="password"
          label="Password"
          type='password'
          onChange={ (e) => { setPassword(e.target.value) }}
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                login();
              }
            }
          }
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me"  />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
              <Button  size="large" color="inherit" variant="outlined" onClick={login}>
                Login
              </Button>
            <Typography variant="body2" sx={{ mb: 5 }}>
              Don’t have an account? {' '}
              <Link variant="subtitle2" href="/register">Register Here</Link>
            </Typography>

          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
