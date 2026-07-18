// src/components/DashboardLayout.jsx
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function DashboardLayout({ user, team, children }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f7f7f7' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: "#f7f7f7" }}>
        <Topbar
          teamName={team?.name || ""}
          plan={user.plan}
          notifications={(user.notifications || []).filter(n => !n.read).length}
          user={user}
        />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
