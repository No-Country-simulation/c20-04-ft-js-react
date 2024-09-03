"use client";
import Post from "@/components/Posts/Post";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { useAppSelector } from "@/redux/hooks";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// tuve que pasar a use client para que funcione el useTheme y al ser un hook de mui no se puede importar
//import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Home",
// };

export default function Home() {
  const theme = useTheme();
  const user = useAppSelector(state => state.userReducer.user)
  const username = user?.username

  return (
    <Box
      p={5}
      gap={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100% ",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <ThemeSwitcher />
      <Post content="Holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" username={username || "defaultuser"} comments={123} likes={1} />
      <Post content="Tengo un camello, solo lo comentaba jajaja" username={username || "defaultuser"} comments={20000} likes={1000000} />
      <Post content="Los quiero admiradores.." username={username || "defaultuser"} comments={2} likes={10} />
      <Post content="Hola mundo" username={username || "defaultuser"} comments={20} likes={100} />
    </Box>
  );
}
