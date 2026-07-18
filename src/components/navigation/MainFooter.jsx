import React from "react";
import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import { Link as RouterLink } from "react-router-dom";

const QUICK_LINKS = [
  { label: "Cursuri", to: "/cursuri" },
  { label: "Mentorat", to: "/mentorat" },
  { label: "Consiliere", to: "/consiliere" },
  { label: "Ajutor urgent", to: "/criza" },
];

export default function MainFooter() {
  return (
    <Box component="footer" sx={{ mt: 10, bgcolor: "#e5e7eb", borderTop: "1px solid #d1d5db" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={5} justifyContent="space-between">
          <Box sx={{ maxWidth: 580 }}>
            <img src="/logo.svg" alt="Emanus logo" style={{ width: 46, marginBottom: 16 }} />
            <Typography sx={{ color: "#374151", lineHeight: 1.8, mb: 2 }}>
              Emanus este o platformă de formare creștină orientată pe maturitate spirituală, viață de familie și
              ucenicie practică. Conținutul este structurat pe etape de viață și contexte reale.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <FacebookRoundedIcon sx={{ color: "#2563eb" }} />
              <InstagramIcon sx={{ color: "#db2777" }} />
              <AlternateEmailRoundedIcon sx={{ color: "#111827" }} />
            </Stack>
          </Box>

          <Stack spacing={1.5}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Navigare rapidă
            </Typography>
            {QUICK_LINKS.map((link) => (
              <Typography key={link.to} component={RouterLink} to={link.to} sx={{ color: "text.secondary" }}>
                {link.label}
              </Typography>
            ))}
            <Button
              component={RouterLink}
              to="/cursuri"
              variant="contained"
              sx={{
                mt: 1,
                alignSelf: "flex-start",
                background: "linear-gradient(90deg, #ff6235 0%, #ff2f74 100%)",
              }}
            >
              Start course now
            </Button>
          </Stack>
        </Stack>
      </Container>

      <Divider />
      <Container maxWidth="lg" sx={{ py: 2.2 }}>
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Copyright {new Date().getFullYear()} © EMANUS. Toate drepturile rezervate.
        </Typography>
      </Container>
    </Box>
  );
}
