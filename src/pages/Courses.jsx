import React, { useMemo, useState } from "react";
import { Box, Chip, Grid, Stack, TextField, Typography } from "@mui/material";
import CourseCard from "../components/CourseCard";
import { AUDIENCES, COURSES } from "../data/courses";

export default function CoursesPage() {
  const [activeAudience, setActiveAudience] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchAudience = activeAudience === "all" || course.audience === activeAudience;
      const term = searchTerm.trim().toLowerCase();
      const matchSearch =
        term.length === 0 ||
        course.title.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term) ||
        course.about.toLowerCase().includes(term);

      return matchAudience && matchSearch;
    });
  }, [activeAudience, searchTerm]);

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 1, color: "text.primary" }}>
        Cursuri
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 2.2 }}>
        Parcursuri inspirate de structura `hope.study`, adaptate conceptului EMANUS.
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2.5 }}>
        <TextField
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Caută după titlu, categorie sau subiect..."
          size="small"
          sx={{ width: { xs: "100%", md: 420 }, bgcolor: "background.paper" }}
        />
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", rowGap: 1 }}>
          {AUDIENCES.map((audience) => (
            <Chip
              key={audience.key}
              label={audience.label}
              onClick={() => setActiveAudience(audience.key)}
              color={activeAudience === audience.key ? "primary" : "default"}
              variant={activeAudience === audience.key ? "filled" : "outlined"}
            />
          ))}
        </Stack>
      </Stack>

      <Grid container spacing={2.2}>
        {visibleCourses.map((course) => (
          <Grid key={course.id} item xs={12} sm={6} xl={4}>
            <CourseCard
              slug={course.slug}
              image={course.cardImage}
              category={course.category}
              audience={course.audience}
              level={course.level}
              lessonsCount={course.lessonsCount}
              durationMinutes={course.durationMinutes}
              priceType={course.priceType}
              title={course.title}
              subtitle={course.about}
            />
          </Grid>
        ))}
        {visibleCourses.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ color: "text.secondary", p: 2 }}>
              Nu am găsit cursuri care să corespundă filtrelor selectate.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
