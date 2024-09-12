"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Link,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "@mui/material/styles";
import PawPalIcon from "@/icons/PawPal";
import { useAppSelector } from "@/redux/hooks";
import SearchIcon from "@/icons/Search";
import { stringAvatar } from "@/utils/avatar";

export default function Header() {
  const theme = useTheme();
  const user = useAppSelector(state => state.userReducer.user)

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
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
            sx={{ color: theme.palette.primary.main }}
            className="font-bold text-2xl md:text-3xl"
          >
            PawPal <span className="hidden md:inline">Community</span>
          </Typography>
        </Box>

        {user && user.username ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" className='md:hidden'>
              <SearchIcon />
            </IconButton>
            <Avatar
              alt={user?.username.toUpperCase()}
              /* Cambiar por user.name */
              {...stringAvatar("luciano repetti".toUpperCase())}
              className="hidden md:flex"
            />
            <Box sx={{ flexDirection: "column" }} className="hidden md:flex">
              <Typography
                variant="body1"
                noWrap
                component="div"
                sx={{ fontSize: "1.1em" }}
              >
                {user.username?.toLowerCase()}
              </Typography>
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{ fontSize: ".8em" }}
              >
                {/* Cambiar por user.name */}
                {user?.name ? user?.name : ""}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1em", height: "100%", flexWrap: "wrap" }}>
            <Link href={"/login"}>
              Iniciar Sesión
            </Link>
            <Link href={"/register"}>
              Registrarse
            </Link>
          </Box>
        )}

        {/* <Box className='flex items-center gap-x-2 md:gap-x-4'>
          <IconButton color="inherit">
            <NotificationsIcon className='size-8' />
          </IconButton>
          <IconButton color="inherit" className='md:hidden'>
            <SearchIcon />
          </IconButton>
          <Box className='items-center gap-x-3 hidden md:flex'>
            <Avatar
              {...stringAvatar('Nombre nombre')}
              alt={user?.username.toUpperCase()}
              className='size-12'
            />
            <Box>
              <Typography
                variant="body1"
                noWrap
                className='text-end font-semibold'
              >
                User Name
              </Typography>
              <Typography
                variant="body1"
                noWrap
                className="text-neutral-700 dark:text-neutral-300 text-sm text-end"
              >
                @{user?.username.toLowerCase()}
              </Typography>
            </Box>
          </Box>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
}
