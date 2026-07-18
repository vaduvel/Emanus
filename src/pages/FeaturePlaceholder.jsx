import React from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";

export default function FeaturePlaceholder({
  title,
  description,
  status = "Planned",
  primaryActionLabel = "Vezi cursurile",
  primaryActionTo = "/cursuri",
}) {
  return (
    <Box sx={{ maxWidth: 880, mx: "auto", pt: { xs: 2, md: 4 } }}>
      <Paper sx={{ p: { xs: 3, md: 4 }, border: "1px solid #e5e7eb" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Typography variant="h3" sx={{ fontSize: { xs: 30, md: 42 } }}>
            {title}
          </Typography>
          <Chip label={status} color={status === "MVP" ? "primary" : "secondary"} variant={status === "MVP" ? "filled" : "outlined"} />
        </Stack>
        <Typography sx={{ color: "text.secondary", lineHeight: 1.8, mb: 3 }}>{description}</Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button component={RouterLink} to={primaryActionTo} variant="contained" endIcon={<ArrowForwardRoundedIcon />}>
            {primaryActionLabel}
          </Button>
          <Button component={RouterLink} to="/cursuri" variant="outlined">
            Înapoi la platformă
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
