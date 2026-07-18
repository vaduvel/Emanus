// src/components/Topbar.jsx
import React from "react";
import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Chip
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

const PLAN_COLORS = {
  Free: "#f1f5f9",
  Single: "#dcfce7",
  Family: "#e0f2fe",
  Premium: "#fef9c3"
};

export default function Topbar({
  teamName = "Team 1",
  plan = "Free",
  notifications = 3
}) {
  const handleNotifClick = () => alert("Ai dat click pe notificări!");
  const handleProfileClick = () => alert("Profil / Setări / Meniu dropdown");
  const handleSearch = (e) => {
    if (e.key === "Enter") alert("Căutare: " + e.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 64,
        bgcolor: "#fff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        px: 3,
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      {/* Stânga: Team info + badge plan */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "8px",
            background: "linear-gradient(135deg,#7f53f0,#5ce1e6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 1
          }}
        >
          <GroupOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
        </Box>
        <Typography fontWeight={600} color="#18181b" sx={{ fontSize: 17 }}>
          {teamName}
        </Typography>
        <Chip
          label={plan}
          sx={{
            ml: 1,
            bgcolor: PLAN_COLORS[plan] || "#f1f5f9",
            color: "#64748b",
            fontWeight: 700,
            fontSize: 13,
            height: 26,
            borderRadius: "7px"
          }}
          size="small"
        />
        <KeyboardArrowDownIcon sx={{ ml: 0.3, color: "#bdbdbd", fontSize: 20 }} />
      </Box>

      {/* Centru: Search bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          maxWidth: 360
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#f1f5f9",
            px: 2,
            py: 0.7,
            borderRadius: "8px",
            width: "100%",
            maxWidth: 320
          }}
        >
          <SearchIcon sx={{ color: "#94a3b8", mr: 1 }} />
          <InputBase
            placeholder="Caută..."
            onKeyDown={handleSearch}
            sx={{
              width: "100%",
              fontSize: 16,
              color: "#374151"
            }}
          />
        </Box>
      </Box>

      {/* Dreapta: Notificări și nume user */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconButton sx={{ color: "#64748b" }} onClick={handleNotifClick}>
          <Badge badgeContent={notifications} color="error">
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 26 }} />
          </Badge>
        </IconButton>
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer", pl: 1 }}
          onClick={handleProfileClick}
        >
          <Typography sx={{ fontWeight: 600, color: "#374151", mr: 0.5 }}>
            Daniel
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: "#94a3b8" }} />
        </Box>
      </Box>
    </Box>
  );
}
