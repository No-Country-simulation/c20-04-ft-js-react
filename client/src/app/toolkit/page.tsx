"use client"

import { Box, InputBase, styled } from "@mui/material";

const CustomInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        borderRadius: '4px',
        backgroundColor: 'white',
        padding: '8px 12px',
        transition: 'border-color 0.3s',
        border: '1px solid #ced4da',
        '&:focus': {
            borderColor: theme.palette.primary.main,
        },
        '&::placeholder': {
            color: '#6c757d',
            fontSize: '0.875rem',
        },
        '&:hover': {
            borderColor: '#adb5bd',
        },
        '&:hover:focus': {
            borderColor: theme.palette.primary.main,
        },
    }
}));

const Index = () => {

    return (
        <Box p={4}>
            <CustomInput placeholder="Nombre de su mascota" />
        </Box>
    )
}

export default Index;