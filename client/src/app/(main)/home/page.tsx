"use client";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// tuve que pasar a use client para que funcione el useTheme y al ser un hook de mui no se puede importar
//import type { Metadata } from "next";
// export const metadata: Metadata = {
//   title: "Home",
// };

export default function Home() {
  const theme = useTheme();
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
    </Box>
  );
}
