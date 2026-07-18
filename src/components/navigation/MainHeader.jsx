import React, { useMemo, useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Acasă", to: "/" },
  { label: "Cursuri", to: "/cursuri" },
  { label: "Mentorat", to: "/mentorat" },
  { label: "Consiliere", to: "/consiliere" },
  { label: "Comunitate", to: "/comunitate" },
];

function NavLinks({ onItemClick }) {
  const location = useLocation();

  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 0.5, md: 1 }}>
      {NAV_ITEMS.map((item) => {
        const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);

        return (
          <Button
            key={item.to}
            component={RouterLink}
            to={item.to}
            onClick={onItemClick}
            sx={{
              color: active ? "primary.main" : "text.primary",
              fontWeight: active ? 800 : 600,
              px: 1.5,
              justifyContent: { xs: "flex-start", md: "center" },
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Stack>
  );
}

export default function MainHeader({ user, onLogout }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const initials = useMemo(() => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [user?.name]);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255,255,255,0.82)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 72 }, px: { xs: 1, sm: 2, md: 3 } }}>
        <Stack direction="row" alignItems="center" spacing={1.3} sx={{ mr: 2 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            <img src="/logo.svg" alt="EMANUS" style={{ width: 36, height: 36 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              letterSpacing: 0.8,
              color: "text.primary",
              display: { xs: "none", sm: "block" },
            }}
          >
            EMANUS
          </Typography>
        </Stack>

        <Box sx={{ display: { xs: "none", md: "block" }, flex: 1 }}>
          <NavLinks />
        </Box>

        <Stack direction="row" spacing={1.2} alignItems="center">
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FavoriteRoundedIcon sx={{ fontSize: 16 }} />}
            sx={{ display: { xs: "none", sm: "inline-flex" }, borderRadius: 999 }}
          >
            Donează
          </Button>

          {user ? (
            <>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ display: { xs: "none", sm: "flex" } }}>
                <Avatar
                  src={user.avatar || undefined}
                  sx={{ width: 34, height: 34, bgcolor: "secondary.main", fontSize: 13, fontWeight: 700 }}
                >
                  {initials}
                </Avatar>
                <Typography sx={{ fontWeight: 700, color: "text.primary", maxWidth: 120 }} noWrap>
                  {user.name || "Utilizator"}
                </Typography>
              </Stack>
              <IconButton color="primary" onClick={onLogout} aria-label="logout">
                <LogoutRoundedIcon />
              </IconButton>
            </>
          ) : (
            <Button component={RouterLink} to="/auth" variant="contained" sx={{ borderRadius: 2 }}>
              Sign in
            </Button>
          )}

          <IconButton
            aria-label="menu"
            onClick={() => setOpenDrawer(true)}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Stack>
      </Toolbar>

      <Drawer anchor="right" open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Box sx={{ width: 280, p: 2.2 }}>
          <Typography variant="h6" sx={{ mb: 1.2, fontWeight: 900 }}>
            Meniu
          </Typography>
          <List disablePadding>
            {NAV_ITEMS.map((item) => (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setOpenDrawer(false)}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          {!user && (
            <Button
              component={RouterLink}
              to="/auth"
              onClick={() => setOpenDrawer(false)}
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
            >
              Intră în cont
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
