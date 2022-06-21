import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { AuthContext } from "../../context/AuthContext";
import Button from "@mui/material/Button";
import {NavLink} from "react-router-dom";

const settings = ['Profile', 'Info'];

const Navbar = () => {
    const auth = useContext(AuthContext);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logoutHandler = () => {
        auth.logout()
    };

    return (
        <>
        <AppBar position="static" style={{ background: '#22272b' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: 20 }}>
                        <Button sx={{ my: 2, color: '#a1b5bf', display: 'block' }}>
                            <NavLink
                                to='/'
                                // onClick={page.handler ? () => page.handler() : null}
                                style={{ color: '#a1b5bf', textDecoration: 'none', padding: 20, textTransform: 'capitalize' }}
                            >
                                All
                            </NavLink>
                        </Button>
                        <Button sx={{ my: 2, color: '#a1b5bf', display: 'block' }}>
                            <NavLink
                                to='/new'
                                // onClick={page.handler ? () => page.handler() : null}
                                style={{ color: '#a1b5bf', textDecoration: 'none', padding: 20, textTransform: 'capitalize' }}
                            >
                                New
                            </NavLink>
                        </Button>
                        <Button sx={{ my: 2, color: '#a1b5bf', display: 'block' }}>
                            <NavLink
                                to='/hot'
                                // onClick={page.handler ? () => page.handler() : null}
                                style={{ color: '#a1b5bf', textDecoration: 'none', padding: 20, textTransform: 'capitalize' }}
                            >
                                Hot
                            </NavLink>
                        </Button>
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
        </>
    );
};
export default Navbar;