import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from "../context/AuthContext";
import Button from "@mui/material/Button";

const settings = ['Profile', 'Info'];

const Navbar = () => {
    const auth = useContext(AuthContext)
    const { token } = auth;
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleHealthCheck = () => {
        fetch('http://localhost:5000/health-check')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
            })
    }

    const handleAuthheathcheck = () => {
        fetch('http://localhost:5000/api/auth/authheathcheck', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data)
            })
    }

    const logoutHandler = () => {
        auth.logout()
    };

    return (
        <>
        <AppBar position="static" style={{ background: '#2E3B55' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Home page
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting, index) => (
                                <MenuItem key={index} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            <Typography textAlign="center" style={{ cursor: 'pointer' }} onClick={logoutHandler}>Logout</Typography>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
            <div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center'}}>
                <Button
                    style={{
                        backgroundColor: "#21b6ae",
                        marginRight: '20px'
                    }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleHealthCheck}
                >
                    health-check
                </Button>
                <Button
                    style={{
                        backgroundColor: "#21b6ae",
                    }}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleAuthheathcheck}
                >
                    authheathcheck
                </Button>
            </div>
        </>
    );
};
export default Navbar;