import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import imgLogin from '../img/login.jpg'
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

const theme = createTheme();

export const LoginPage = () => {
    const auth = useContext(AuthContext)
    const [isErrorLogin, setIsErrorLogin] = useState(false)
    const [isOkLogin, setIsOkLogin] = useState(false)
    const [isOkMessageLogin, setIsOkMessageLogin] = useState('')
    const [errorMessageLogin, setErrorMessageLogin] = useState('')
    const { loading, request, error, errorClear } = useHttp()
    const [formLogin, setFromLogin] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        setIsErrorLogin(true)
        setErrorMessageLogin(error)
        setTimeout(() => errorClear(), 4000)
    }, [error, errorMessageLogin, isErrorLogin, errorClear])

    const changeLoginHandler = event => {
        setFromLogin({ ...formLogin, [event.target.name]: event.target.value })
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...formLogin})
            auth.login(data.token, data.userId)
            if(data.message) {
                setIsOkLogin(true)
                setIsOkMessageLogin(data.message)
            }
            setTimeout(() => setIsOkLogin(false), 3000)
        } catch (e) {}
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${imgLogin})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                type="text"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={changeLoginHandler}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={changeLoginHandler}
                            />
                            { isOkLogin && <div>{isOkMessageLogin}</div> }
                            { isErrorLogin && <div style={{ color: 'red'}}>{errorMessageLogin}</div>}
                            <Button
                                style={{
                                    backgroundColor: "#21b6ae",
                                }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={loginHandler}
                                disabled={loading}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}