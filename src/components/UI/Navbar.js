import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

const settings = ['Profile', 'Info'];
// const pages = ['All', 'New', 'Hot'];
const pages = [
    {name: 'All', link: '/'},
    {name: 'New', link: '/new'},
    {name: 'Hot', link: '/hot'}
]

const Navbar = () => {
    const auth = useContext(AuthContext)
    // const { token } = auth;
    // const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const handleHealthCheck = () => {
    //     fetch('http://localhost:5000/health-check')
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             console.log(data)
    //         })
    // }
    //
    // const handleAuthheathcheck = () => {
    //     fetch('http://localhost:5000/api/auth/authheathcheck', {
    //         method: 'POST',
    //         mode: 'cors',
    //         cache: 'no-cache',
    //         credentials: 'same-origin',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization' : `Bearer ${token}`
    //         },
    //         redirect: 'follow',
    //         referrerPolicy: 'no-referrer'
    //     })
    //         .then((res) => {
    //             return res.json();
    //         })
    //         .then((data) => {
    //             console.log(data)
    //         })
    // }

    const logoutHandler = () => {
        auth.logout()
    };

    return (
        <>
        <AppBar position="static" style={{ background: '#22272b' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 20 }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                // onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#a1b5bf', display: 'block' }}
                            >
                                <NavLink
                                    to={page.link}
                                    style={{ color: '#a1b5bf', textDecoration: 'none', padding: 20, textTransform: 'capitalize' }}
                                >
                                    {page.name}
                                </NavLink>
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{
                        flexGrow: 1,
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'flex-end',
                        marginRight: 20
                    }}>
                        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                            <NavLink to="/upload"
                                     style={{
                                         color: '#a1b5bf',
                                         textDecoration: 'none',
                                         padding: 30,
                                         textTransform: 'capitalize'
                                    }}
                            >
                                Upload
                            </NavLink>
                            {/*Upload*/}
                        </Button>

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
            {/*<div style={{ display: 'flex', margin: '0 auto', justifyContent: 'center'}}>*/}
            {/*    <Button*/}
            {/*        style={{*/}
            {/*            backgroundColor: "#21b6ae",*/}
            {/*            marginRight: '20px'*/}
            {/*        }}*/}
            {/*        type="submit"*/}
            {/*        variant="contained"*/}
            {/*        sx={{ mt: 3, mb: 2 }}*/}
            {/*        onClick={handleHealthCheck}*/}
            {/*    >*/}
            {/*        health-check*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        style={{*/}
            {/*            backgroundColor: "#21b6ae",*/}
            {/*        }}*/}
            {/*        type="submit"*/}
            {/*        variant="contained"*/}
            {/*        sx={{ mt: 3, mb: 2 }}*/}
            {/*        onClick={handleAuthheathcheck}*/}
            {/*    >*/}
            {/*        authheathcheck*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </>
    );
};
export default Navbar;