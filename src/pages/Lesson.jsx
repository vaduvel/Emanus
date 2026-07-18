import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { getCourseBySlug, getLessonById } from "../data/courses";
import { getLessonScript } from "../data/lessonScripts";
import LogoImg from "../Logo.png";
import UserAvatarImg from "../user.png";

const CHAT_COLUMN_MAX_WIDTH = 780;

function ChatBubble({ isUser, children, footer }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ width: "100%", maxWidth: "100%" }}>
        {!isUser && (
          <Avatar
            src={LogoImg}
            alt="Emanus"
            sx={{
              width: 34,
              height: 34,
              bgcolor: "background.paper",
              border: "1px solid #d1d5db",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
            }}
          />
        )}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.35, md: 1.55 },
            px: { xs: 1.6, md: 1.8 },
            borderRadius: 2.25,
            maxWidth: { xs: "calc(100% - 46px)", md: 620 },
            width: "fit-content",
            border: "1px solid",
            borderColor: isUser ? "rgba(59, 130, 246, 0.35)" : "#e5e7eb",
            bgcolor: isUser ? "#e8f2ff" : "#fff9e8",
            boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
          }}
        >
          {children}
          {footer ? (
            <Typography sx={{ mt: 0.75, fontSize: 11.5, letterSpacing: 0.2, color: "text.secondary" }}>
              {footer}
            </Typography>
          ) : null}
        </Paper>

        {isUser && (
          <Avatar
            src={UserAvatarImg}
            alt="Utilizator"
            sx={{
              width: 34,
              height: 34,
              border: "1px solid #d1d5db",
              boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
            }}
          />
        )}
      </Stack>
    </Box>
  );
}

function TypingBubble() {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Avatar
          src={LogoImg}
          alt="Emanus"
          sx={{
            width: 34,
            height: 34,
            bgcolor: "background.paper",
            border: "1px solid #d1d5db",
          }}
        />
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 999,
            px: 1.35,
            py: 0.95,
            display: "flex",
            alignItems: "center",
            gap: 0.65,
            bgcolor: "#fff",
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#9ca3af",
              animation: "pulseDot 1s infinite ease-in-out",
            }}
          />
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#9ca3af",
              animation: "pulseDot 1s 0.2s infinite ease-in-out",
            }}
          />
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              bgcolor: "#9ca3af",
              animation: "pulseDot 1s 0.4s infinite ease-in-out",
            }}
          />
        </Paper>
      </Stack>
    </Box>
  );
}

function buildStepText(step) {
  if (step.type === "bible") {
    return step.content.join("\n");
  }

  if (typeof step.content === "string") {
    return step.content;
  }

  return "";
}

function LessonContainer({ children }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 1.5, md: 2.5 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: 940 },
          mx: "auto",
        }}
      >
        {children}
      </Box>
    </Container>
  );
}

export default function LessonPage() {
  const { courseSlug, lessonId } = useParams();
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const timeoutRef = useRef(null);

  const course = useMemo(() => getCourseBySlug(courseSlug), [courseSlug]);
  const lesson = useMemo(() => getLessonById(course, lessonId || "1"), [course, lessonId]);
  const script = useMemo(() => getLessonScript(lesson?.scriptKey), [lesson?.scriptKey]);

  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(-1);
  const [answers, setAnswers] = useState({});
  const [typing, setTyping] = useState(false);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  useEffect(() => {
    if (!started) {
      return;
    }

    const current = script[stepIndex];
    if (!current || current.type === "question") {
      return;
    }

    setTyping(true);
    const delay = 1100 + Math.min(2200, buildStepText(current).length * 6);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTyping(false);
      setStepIndex((prev) => Math.min(prev + 1, script.length - 1));
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [script, started, stepIndex]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [stepIndex, typing, started]);

  if (!course || !lesson) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
          Lecția nu a fost găsită
        </Typography>
        <Button component={RouterLink} to="/cursuri" variant="contained">
          Înapoi la cursuri
        </Button>
      </Container>
    );
  }

  const visibleSteps = started ? script.slice(0, stepIndex + 1) : [];
  const progress = started && script.length > 0 ? Math.max(8, ((stepIndex + 1) / script.length) * 100) : 0;

  const startLesson = () => {
    if (script.length === 0) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setStarted(true);
    setStepIndex(0);
    setAnswers({});
    setTyping(false);
  };

  return (
    <Box
      sx={{
        py: { xs: 2, md: 3 },
        "@keyframes pulseDot": {
          "0%": { opacity: 0.35, transform: "translateY(0px)" },
          "50%": { opacity: 1, transform: "translateY(-1px)" },
          "100%": { opacity: 0.35, transform: "translateY(0px)" },
        },
      }}
    >
      <LessonContainer>
        <Paper
          sx={{
            mb: 2,
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            minHeight: { xs: 220, md: 300 },
            display: "flex",
            alignItems: "flex-end",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 20px 40px rgba(15, 23, 42, 0.16)",
            backgroundImage: `linear-gradient(0deg, rgba(3, 8, 22, 0.78), rgba(3, 8, 22, 0.48)), url(${lesson.image || course.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate(`/cursuri/${course.slug}`)}
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "rgba(255,255,255,0.45)",
              borderRadius: 999,
              position: "absolute",
              top: 14,
              left: 14,
              px: 1.7,
              py: 0.35,
              backdropFilter: "blur(3px)",
            }}
          >
            Înapoi la curs
          </Button>

          <Box sx={{ width: "100%" }}>
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, fontSize: { xs: 26, md: 42 }, lineHeight: 1.1 }}>
              {lesson.title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1.25, flexWrap: "wrap", rowGap: 0.8 }}>
              <Chip
                icon={<MenuBookOutlinedIcon sx={{ color: "#fff !important", fontSize: 18 }} />}
                label={`Lecția ${lesson.id}`}
                sx={{ bgcolor: "rgba(255,255,255,0.22)", color: "#fff", height: 30 }}
              />
              <Chip
                icon={<AccessTimeOutlinedIcon sx={{ color: "#fff !important", fontSize: 18 }} />}
                label={`${lesson.durationMinutes} min`}
                sx={{ bgcolor: "rgba(255,255,255,0.22)", color: "#fff", height: 30 }}
              />
            </Stack>
            <Button
              onClick={startLesson}
              variant="contained"
              disabled={script.length === 0}
              sx={{
                background: "linear-gradient(90deg, #ff6235 0%, #ff2f74 100%)",
                minWidth: 150,
                height: 40,
                borderRadius: 2.25,
              }}
            >
              {started ? "Restart lecția" : "Începe lecția"}
            </Button>
          </Box>
        </Paper>
      </LessonContainer>

      <LessonContainer>
        <Paper sx={{ p: { xs: 1.5, md: 1.9 }, borderRadius: 2.25, border: "1px solid #e5e7eb" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.7 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14 }}>Progres lecție</Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>{Math.round(progress)}%</Typography>
          </Stack>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 7, borderRadius: 999 }} />
        </Paper>
      </LessonContainer>

      <LessonContainer>
        <Paper
          sx={{
            mt: 2,
            p: { xs: 1.4, md: 2 },
            borderRadius: 2.5,
            border: "1px solid #e5e7eb",
          }}
        >
          <Box sx={{ maxWidth: CHAT_COLUMN_MAX_WIDTH, mx: "auto", width: "100%" }}>
            {!started && (
              <Paper sx={{ p: 2, border: "1px dashed #d1d5db", textAlign: "center", borderRadius: 2.25, mb: 1.5 }}>
                <Typography sx={{ color: "text.secondary", fontSize: 14.5 }}>
                  Apasă „Începe lecția” pentru a porni conversația interactivă.
                </Typography>
              </Paper>
            )}

            <Stack spacing={1.4}>
              {visibleSteps.map((item, idx) => {
                const isQuestion = item.type === "question";
                const isUser = isQuestion || item.from === "right";

                if (isQuestion) {
                  return (
                    <ChatBubble key={idx} isUser>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 23 }, lineHeight: 1.25, mb: 0.7 }}>
                        {item.question}
                      </Typography>
                      <Typography sx={{ color: "text.secondary", mb: 1, fontSize: 14.5 }}>Alege un răspuns:</Typography>
                      <Stack spacing={0.7}>
                        {item.options.map((option, optionIndex) => {
                          const selected = answers[idx] === optionIndex;
                          const answered = answers[idx] != null;

                          return (
                            <Button
                              key={option}
                              fullWidth
                              variant={selected ? "contained" : "outlined"}
                              color={selected ? "success" : "inherit"}
                              disabled={answered && !selected}
                              onClick={() => {
                                if (answered) {
                                  return;
                                }

                                if (timeoutRef.current) {
                                  clearTimeout(timeoutRef.current);
                                }

                                setAnswers((prev) => ({ ...prev, [idx]: optionIndex }));
                                setTyping(true);
                                timeoutRef.current = setTimeout(() => {
                                  setTyping(false);
                                  setStepIndex((prev) => Math.min(prev + 1, script.length - 1));
                                }, 900);
                              }}
                              sx={{
                                justifyContent: "flex-start",
                                textAlign: "left",
                                borderRadius: 1.8,
                                py: 0.72,
                                px: 1.2,
                                minHeight: 41,
                                borderColor: selected ? "success.main" : "#cbd5e1",
                                color: selected ? "#ffffff" : "text.primary",
                                bgcolor: selected ? "success.main" : "#ffffff",
                                "&.Mui-disabled": {
                                  opacity: selected ? 1 : 0.55,
                                  color: selected ? "#fff" : "text.primary",
                                },
                                "&:hover": {
                                  borderColor: selected ? "success.dark" : "#94a3b8",
                                  bgcolor: selected ? "success.dark" : "#f8fafc",
                                },
                              }}
                            >
                              <Typography component="span" sx={{ textTransform: "none", fontSize: 14.5, fontWeight: 600 }}>
                                {option}
                              </Typography>
                              {selected && item.showResults ? (
                                <Typography
                                  component="span"
                                  sx={{ ml: "auto", fontSize: 11.5, fontWeight: 800, letterSpacing: 0.2 }}
                                >
                                  {item.results?.[optionIndex]}%
                                </Typography>
                              ) : null}
                            </Button>
                          );
                        })}
                      </Stack>
                    </ChatBubble>
                  );
                }

                return (
                  <ChatBubble key={idx} isUser={isUser} footer={!isUser ? "EMANUS" : undefined}>
                    {item.type === "bible" ? (
                      <Stack spacing={0.55}>
                        {item.content.map((line) => (
                          <Typography key={line} sx={{ fontStyle: "italic", lineHeight: 1.6, fontSize: 16 }}>
                            {line}
                          </Typography>
                        ))}
                      </Stack>
                    ) : (
                      <Typography sx={{ lineHeight: 1.67, fontSize: 16 }}>{item.content}</Typography>
                    )}
                  </ChatBubble>
                );
              })}

              {typing && started && <TypingBubble />}

              <div ref={bottomRef} />
            </Stack>
          </Box>
        </Paper>
      </LessonContainer>
    </Box>
  );
}
