import React from "react";
import { Card, CardContent, Box, Typography, Button, Chip, Stack } from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import { getAudienceLabel } from "../data/courses";

export default function CourseCard({
  slug,
  image = "/CoursesImg/img1.jpg",
  category = "Studiu Biblic",
  audience = "all",
  level = "General",
  lessonsCount = 3,
  durationMinutes = 15,
  priceType = "Gratis",
  title = "An Ancient Dream Reveals the Future",
  subtitle = "A fascinating journey into prophecy.",
}) {
  const navigate = useNavigate();
  const openCourse = () => navigate(slug ? `/cursuri/${slug}` : "/cursuri");

  return (
    <Card
      onClick={openCourse}
      sx={{
        overflow: "hidden",
        background: "#fff",
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        m: "auto",
        cursor: "pointer",
        transition: "transform .2s ease, box-shadow .2s ease, border-color .2s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0px 14px 34px rgba(31, 41, 55, 0.12)",
          borderColor: "rgba(255, 75, 99, 0.35)",
        },
      }}
    >
      <Box sx={{ position: "relative", height: 200, width: "100%", overflow: "hidden" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        <Chip
          label={category}
          sx={{
            position: "absolute",
            top: 18,
            left: 18,
            bgcolor: "rgba(255,255,255,0.86)",
            color: "text.secondary",
            border: "1px solid #e5e7eb",
            fontWeight: 700,
            fontSize: 12,
            px: 1.2,
            py: 0.3,
            letterSpacing: 1,
          }}
        />
      </Box>

      <CardContent sx={{ pt: 2, pb: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 2.2, flexWrap: "wrap", rowGap: 0.8 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <MenuBookOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {lessonsCount} lecții
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccessTimeIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {durationMinutes} min
            </Typography>
          </Stack>
          <Chip
            label={getAudienceLabel(audience)}
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 700 }}
          />
          <Chip
            label={priceType}
            size="small"
            sx={{
              bgcolor: "#eef2ff",
              color: "#312e81",
              fontWeight: 700,
              fontSize: 12,
              boxShadow: "none",
              textTransform: "uppercase",
            }}
          />
        </Stack>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
            fontSize: 18,
            lineHeight: 1.14,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            fontSize: 14,
            mb: 2.2,
            minHeight: 60,
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {subtitle}
        </Typography>

        <Typography sx={{ mb: 2, color: "secondary.main", fontWeight: 700, fontSize: 13 }}>{level}</Typography>

        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              height: 38,
              minWidth: 120,
              px: 2.8,
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
            onClick={(event) => {
              event.stopPropagation();
              openCourse();
            }}
          >
            Vezi cursul
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
