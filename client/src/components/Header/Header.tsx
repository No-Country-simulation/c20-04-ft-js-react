"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  ThemeProvider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from '@mui/material/Link';
import PawPalIcon from "@/icons/PawPal";

export default function Header() {
  const theme = useTheme();
  const user = useSelector((state: RootState) => state.userReducer.user)
  const username = user?.username

  return (
    <AppBar
      position="sticky"
      // color="default"
      elevation={0}
      sx={{
        // position: "sticky",
        top: 0,
        zIndex: "100",
        display: "flex",
        justifyContent: "center",
        border: `1px solid ${theme.palette.divider}`,
        borderTop: "none",
      }}
    >
      <Toolbar className="justify-between py-3 px-5">
        <Box className='flex items-center gap-x-3'>
          <PawPalIcon className="size-10 md:size-auto" />
          <Typography
            variant="h1"
            className="font-bold text-2xl md:text-3xl"
          >
            PawPal <span className="hidden md:inline">Community</span>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <NotificationsIcon />
          </IconButton>
          <Avatar
            alt={username?.toUpperCase()}
            src="/placeholder.svg?height=32&width=32"
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: 40,
              height: 40,
              mr: 1,
            }}
          />
          <Typography
            variant="body1"
            noWrap
            component="div"
            sx={{ fontSize: "1.2em", display: { xs: "none", sm: "block" } }}
          >
            @{username?.toLowerCase()}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
