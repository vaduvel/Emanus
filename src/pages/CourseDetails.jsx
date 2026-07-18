import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { getAudienceLabel, getCourseBySlug } from "../data/courses";

function LessonRow({ course, lesson, index }) {
  const startPath = `/lesson/${course.slug}/${lesson.id}`;

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        overflow: "hidden",
        mb: 2.5,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box sx={{ width: { xs: "100%", md: 380 }, minHeight: 210, position: "relative" }}>
          <img
            src={lesson.image}
            alt={lesson.title}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 210,
              objectFit: "cover",
              display: "block",
            }}
          />
          <Chip
            icon={<MenuBookOutlinedIcon sx={{ fontSize: 16 }} />}
            label={`Lesson ${index + 1}`}
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              color: "#e2f6ff",
              bgcolor: "rgba(31, 97, 141, 0.9)",
              fontWeight: 700,
              borderRadius: "999px",
            }}
          />
        </Box>

        <Box sx={{ p: { xs: 2.5, md: 3 }, flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1f2937", mb: 1 }}>
            {lesson.title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.6} sx={{ color: "#6b7280", mb: 2 }}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography>{lesson.durationMinutes} minutes</Typography>
          </Stack>
          <Button
            component={RouterLink}
            to={startPath}
            variant="contained"
            disabled={lesson.locked}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              borderRadius: 2,
              px: 2.5,
              background: "linear-gradient(90deg, #ff6235 0%, #ff2f74 100%)",
              opacity: lesson.locked ? 0.55 : 1,
              boxShadow: "none",
            }}
          >
            {lesson.locked ? "Locked" : "Start lesson"}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}

export default function CourseDetails() {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const course = getCourseBySlug(courseSlug);

  if (!course) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Cursul nu a fost găsit
        </Typography>
        <Button variant="contained" onClick={() => navigate("/cursuri")}>Înapoi la cursuri</Button>
      </Container>
    );
  }

  const firstLesson = course.lessons[0];

  return (
    <Box sx={{ pb: 4 }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          minHeight: { xs: 340, md: 460 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          mb: 3,
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.64), rgba(0,0,0,0.64)), url(${course.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          px: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => navigate("/cursuri")}
          sx={{
            position: "absolute",
            top: 22,
            left: 24,
            color: "#fff",
            borderColor: "rgba(255,255,255,0.35)",
            textTransform: "none",
            borderRadius: 999,
          }}
          variant="outlined"
        >
          Back to courses
        </Button>

        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              maxWidth: 950,
              fontSize: { xs: 34, md: 62 },
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            {course.title}
          </Typography>

          <Stack direction="row" spacing={1.2} justifyContent="center" sx={{ mb: 3, flexWrap: "wrap" }}>
            <Chip label={course.category} sx={{ bgcolor: "rgba(255,255,255,0.14)", color: "#fff" }} />
            <Chip label={getAudienceLabel(course.audience)} sx={{ bgcolor: "rgba(255,255,255,0.14)", color: "#fff" }} />
            <Chip label={course.level} sx={{ bgcolor: "rgba(255,255,255,0.14)", color: "#fff" }} />
          </Stack>

          <Button
            component={RouterLink}
            to={`/lesson/${course.slug}/${firstLesson?.id || "1"}`}
            variant="contained"
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.2,
              fontWeight: 800,
              borderRadius: 2,
              background: "linear-gradient(90deg, #ff6235 0%, #ff2f74 100%)",
              boxShadow: "none",
            }}
          >
            Start course now
          </Button>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ py: 1 }}>
        <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" sx={{ color: "#6b7280", pb: 2 }}>
          <Stack direction="row" spacing={2.5}>
            <Stack direction="row" spacing={0.8} alignItems="center">
              <MenuBookOutlinedIcon sx={{ fontSize: 19 }} />
              <Typography>{course.lessonsCount} lessons</Typography>
            </Stack>
            <Stack direction="row" spacing={0.8} alignItems="center">
              <AccessTimeOutlinedIcon sx={{ fontSize: 19 }} />
              <Typography>{course.durationMinutes} minutes</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Divider sx={{ borderColor: "#e5e7eb", mb: 5 }} />

      <Container maxWidth="lg">
        <Stack direction={{ xs: "column", lg: "row" }} spacing={5}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2.5, color: "#1f2937" }}>
              About the course
            </Typography>
            <Typography sx={{ color: "#374151", fontSize: { xs: 18, md: 22 }, lineHeight: 1.7, mb: 4 }}>
              {course.about}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2.2, color: "#1f2937" }}>
              Course Highlights
            </Typography>
            <Stack spacing={1.8}>
              {course.highlights.map((item) => (
                <Stack key={item} direction="row" spacing={1.3} alignItems="center">
                  <CheckCircleOutlineRoundedIcon sx={{ color: "#ff4b6e" }} />
                  <Typography sx={{ fontSize: { xs: 16, md: 19 }, color: "#1f2937" }}>{item}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Paper
            elevation={0}
            sx={{
              width: { xs: "100%", lg: 320 },
              p: 4,
              height: "fit-content",
              border: "1px solid #e5e7eb",
              borderRadius: 3,
              bgcolor: "#fff",
            }}
          >
            <Typography sx={{ color: "#6b7280", mb: 2.5, fontSize: 17 }}>
              Acest curs este disponibil gratuit în MVP.
            </Typography>
            <Button
              fullWidth
              component={RouterLink}
              to={`/lesson/${course.slug}/${firstLesson?.id || "1"}`}
              sx={{
                textTransform: "none",
                py: 1.4,
                color: "#fff",
                fontWeight: 800,
                borderRadius: 2,
                background: "linear-gradient(90deg, #ff6235 0%, #ff2f74 100%)",
              }}
              variant="contained"
            >
              Start now
            </Button>
          </Paper>
        </Stack>

        <Typography
          variant="h2"
          sx={{ textAlign: "center", fontWeight: 900, mt: { xs: 6, md: 11 }, mb: 4, color: "#1f2937" }}
        >
          Course Program
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: { xs: 8, md: -26 },
              top: 10,
              bottom: 10,
              width: 2,
              bgcolor: "#d1d5db",
              display: { xs: "none", md: "block" },
            }}
          />
          {course.lessons.map((lesson, index) => (
            <Box key={lesson.id} sx={{ position: "relative" }}>
              {index > 0 && lesson.locked && (
                <LockOutlinedIcon
                  sx={{
                    position: "absolute",
                    left: -34,
                    top: 84,
                    color: "#9ca3af",
                    display: { xs: "none", md: "block" },
                  }}
                />
              )}
              <LessonRow course={course} lesson={lesson} index={index} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
