// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoImg from "../Logo.png"; // adaptează calea dacă Sidebar.jsx e direct în src/components

const NAV_GROUPS = [
  {
    heading: "GENERAL",
    items: [
      { label: "Home", path: "/", icon: <HomeIcon /> },
      { label: "Cursuri", path: "/cursuri", icon: <MenuBookOutlinedIcon /> },
      { label: "Progress", path: "/progress", icon: <ShowChartOutlinedIcon /> }
    ]
  },
  {
    heading: "RESURSE",
    items: [
      { label: "Lecții biblice", path: "/lectii-biblice", icon: <ImportContactsOutlinedIcon /> },
      { label: "Mentorat", path: "/mentorat", icon: <PeopleAltOutlinedIcon /> }
    ]
  },
  {
    heading: "COMUNITATE",
    items: [
      { label: "Comunitate", path: "/comunitate", icon: <ChatBubbleOutlineOutlinedIcon /> }
    ]
  },
  {
    heading: "PROFILE",
    items: [
      { label: "Setări / Profil", path: "/profil", icon: <SettingsOutlinedIcon /> }
    ]
  }
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#fff",
        minHeight: "100vh",
        borderRight: "1px solid #e5e7eb",
        px: 2,
        pt: 2,
        pb: 3
      }}
    >
      {/* Logo EMANUS (acum cu imagine) */}
      <Box display="flex" alignItems="center" mb={4} pl={1}>
        <img
          src={LogoImg}
          alt="Logo EMANUS"
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            boxShadow: "0 2px 10px #16b1b115",
            objectFit: "cover",
            background: "#fff",
            marginRight: 12
          }}
        />
        <Typography variant="h6" fontWeight={900} color="#16b1b1" letterSpacing={2}>
          EMANUS
        </Typography>
      </Box>

      {NAV_GROUPS.map((group, idx) => (
        <Box key={group.heading} mb={2}>
          <Typography
            sx={{
              fontSize: 13,
              color: "#94a3b8",
              fontWeight: 700,
              pl: 2,
              mb: 0.5,
              mt: idx === 0 ? 0 : 2,
              letterSpacing: 1.5
            }}
          >
            {group.heading}
          </Typography>
          <List sx={{ py: 0 }}>
            {group.items.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: "12px",
                  my: 0.5,
                  color: "#374151",
                  fontWeight: 500,
                  fontSize: 16,
                  "&.active": {
                    bgcolor: "#e6f6f6",
                    color: "#16b1b1",
                    fontWeight: 700,
                    "& .MuiListItemIcon-root": {
                      color: "#16b1b1"
                    }
                  },
                  "&:hover": {
                    bgcolor: "#f1f5f9",
                    color: "#16b1b1",
                    "& .MuiListItemIcon-root": {
                      color: "#16b1b1"
                    }
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 38,
                    color: "#94a3b8", // icon default gri
                    fontSize: 24
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          {idx < NAV_GROUPS.length - 1 && <Divider sx={{ my: 1.2, borderColor: "#e5e7eb" }} />}
        </Box>
      ))}
    </Box>
  );
}
