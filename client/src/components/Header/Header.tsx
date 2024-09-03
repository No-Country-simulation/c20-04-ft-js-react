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
import Link from '@mui/material/Link';
import { useAppSelector } from "@/redux/hooks";

export default function Header() {
  const theme = useTheme();
  const user = useAppSelector(state => state.userReducer.user)
  const username = user?.username

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: "100",
        height: "7svh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderTop: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Box>Imagen del logo de PawPañ Community</Box> */}
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{
              fontSize: { xs: "1.5em", sm: "1.8em" },
              display: "block",
              color: theme.palette.primary.main,
            }}
          >
            PawPal Community
          </Typography>
        </Box>

        {user && username ? (
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
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <Link href={"/login"}>
              Iniciar Sesión
            </Link>
            <Link href={"/register"}>
              Registrarse
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
