"use client"

import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Box, ThemeProvider } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTheme } from '@mui/material/styles';

export default function Header() {
    const theme = useTheme();

    return (
        <AppBar position="static" color="default" elevation={0} sx={{ height: "7svh", display: 'flex', justifyContent: "center", backgroundColor: "#fff", border: '1px solid #e0e0e0', borderTop: "none" }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Box>Imagen del logo de PawPañ Community</Box> */}
                    <Typography variant="h1" noWrap component="div" sx={{ fontSize: { xs: "1.5em", sm: "1.8em" }, display: "block" }}>
                        PawPal Community
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton color='inherit' sx={{ mr: 1 }}>
                        <NotificationsIcon />
                    </IconButton>
                    <Avatar alt="Luucianorepetti" src="/placeholder.svg?height=32&width=32" sx={{ backgroundColor: theme.palette.primary.main, width: 40, height: 40, mr: 1 }} />
                    <Typography variant="body1" noWrap component="div" sx={{ fontSize: "1.2em", display: { xs: 'none', sm: 'block' } }}>
                        @luucianorepetti
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}