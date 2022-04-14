import React, {useEffect, useState} from "react";
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
import imgRegister from "../img/register.jpg";
import {useHttp} from "../hooks/http.hook";

const theme = createTheme();

export const RegisterPage = () => {
    const [isError, setIsError] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [isOkMessage, setIsOkMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const { loading, request, error, errorClear } = useHttp()
    const [form, setFrom] = useState({
        email: '', password: '', name: ''
    })

    useEffect(() => {
        setIsError(true)
        setErrorMessage(error)
        setTimeout(() => errorClear(), 4000)
    }, [error, errorMessage, isError, errorClear])

    const changeHandler = event => {
        setFrom({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            if(data.message) {
                setIsOk(true)
                setIsOkMessage(data.message)
            }
            setTimeout(() => setIsOk(false), 3000)
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
                        backgroundImage: `url(${imgRegister})`,
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
                            Registration
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="First name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                onChange={changeHandler}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={changeHandler}
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
                                onChange={changeHandler}
                            />
                            { isOk && <div>{isOkMessage}</div> }
                            { isError && <div style={{ color: 'red'}}>{errorMessage}</div>}
                            <Button
                                style={{
                                    backgroundColor: "#21b6ae",
                                }}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Registration
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Have an account? Sign In"}
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