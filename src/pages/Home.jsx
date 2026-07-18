import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoStoriesRoundedIcon from "@mui/icons-material/AutoStoriesRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { Link as RouterLink } from "react-router-dom";
import { EDUCATIONAL_PATHS, MVP_NOTE, PLATFORM_PILLARS } from "../data/platformBlueprint";
import heroImage from "../Hero.jpeg";

const VALUE_CARDS = [
  {
    title: "Învățătură biblică aplicată",
    description: "Conținut clar, structurat și adaptat contextului real al vieții de zi cu zi.",
    icon: <AutoStoriesRoundedIcon color="secondary" />,
  },
  {
    title: "Formare pe trasee de viață",
    description: "De la copii la bunici, fiecare categorie primește ghidare relevantă și practică.",
    icon: <SchoolRoundedIcon color="secondary" />,
  },
  {
    title: "Comunitate + sprijin",
    description: "Mentorat, consiliere și spații de dialog pentru creștere în adevăr și responsabilitate.",
    icon: <FavoriteBorderRoundedIcon color="secondary" />,
  },
];

export default function HomePage() {
  return (
    <Stack spacing={6}>
      <Paper
        className="fade-in-up"
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          color: "#fff",
          minHeight: { xs: 340, md: 460 },
          backgroundImage: `linear-gradient(90deg, rgba(5,7,16,0.80) 0%, rgba(5,7,16,0.45) 70%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: { xs: 3, md: 6 },
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ maxWidth: 760 }}>
          <Chip
            label="Platformă creștină educațională"
            sx={{
              mb: 2,
              bgcolor: "rgba(255,255,255,0.15)",
              color: "#fff",
            }}
          />
          <Typography variant="h1" sx={{ fontSize: { xs: 34, md: 60 }, mb: 2.2, lineHeight: 1.1 }}>
            Formare biblică matură pentru familie, comunitate și slujire
          </Typography>
          <Typography sx={{ maxWidth: 650, color: "rgba(255,255,255,0.9)", fontSize: { xs: 16, md: 20 }, mb: 3 }}>
            Construim o platformă în stilul course-based modern, cu parcursuri pe etape de viață, lecții aplicative
            și mentorat în jurul adevărului Scripturii.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              component={RouterLink}
              to="/cursuri"
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                py: 1.2,
                px: 3,
                background: "linear-gradient(90deg, #ff6235 0%, #ff2f74 100%)",
              }}
            >
              Vezi cursurile
            </Button>
            <Button component={RouterLink} to="/mentorat" variant="outlined" sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)" }}>
              Explorează mentoratul
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Container maxWidth="lg">
        <Grid container spacing={2.2}>
          {VALUE_CARDS.map((item) => (
            <Grid key={item.title} item xs={12} md={4}>
              <Card className="fade-in-up" sx={{ height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1.2 }}>
                    {item.icon}
                    <Typography variant="h6">{item.title}</Typography>
                  </Stack>
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.7 }}>{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 2.5 }}>
          Structura platformei
        </Typography>
        <Grid container spacing={2}>
          {PLATFORM_PILLARS.map((pillar) => (
            <Grid key={pillar.id} item xs={12} md={6}>
              <Paper sx={{ p: 2.5, border: "1px solid #e5e7eb", height: "100%" }}>
                <Stack direction="row" justifyContent="space-between" spacing={1.5} alignItems="flex-start">
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {pillar.title}
                  </Typography>
                  <Chip
                    size="small"
                    label={pillar.status}
                    color={pillar.status === "MVP" ? "primary" : "secondary"}
                    variant={pillar.status === "MVP" ? "filled" : "outlined"}
                  />
                </Stack>
                <Typography sx={{ mt: 1.2, color: "text.secondary", lineHeight: 1.7 }}>{pillar.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg">
        <Paper sx={{ p: 3.2, borderRadius: 3, border: "1px solid #f2c7cf", background: "#fff7f8" }}>
          <Typography variant="h5" sx={{ mb: 1.2 }}>
            Notă MVP
          </Typography>
          <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>{MVP_NOTE}</Typography>
        </Paper>
      </Container>

      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 2 }}>
          Trasee educaționale planificate
        </Typography>
        <Grid container spacing={1.2}>
          {EDUCATIONAL_PATHS.map((path) => (
            <Grid key={path} item xs={12} sm={6} md={4} lg={3}>
              <Paper sx={{ px: 2, py: 1.5, border: "1px solid #e5e7eb" }}>
                <Typography sx={{ fontWeight: 600 }}>{path}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Stack>
  );
}
