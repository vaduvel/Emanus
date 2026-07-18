import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import MainHeader from "../components/navigation/MainHeader";
import MainFooter from "../components/navigation/MainFooter";

export default function MainLayout({ user, onLogout }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <MainHeader user={user} onLogout={onLogout} />
      <Container component="main" maxWidth="xl" sx={{ py: { xs: 2.5, md: 4 }, flex: 1 }}>
        <Outlet />
      </Container>
      <MainFooter />
    </Box>
  );
}
