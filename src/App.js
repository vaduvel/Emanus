import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Box, CircularProgress } from "@mui/material";
import LoginPage from "./components/LoginPage";
import CoursesPage from "./pages/Courses";
import CourseDetailsPage from "./pages/CourseDetails";
import LessonPage from "./pages/Lesson";
import HomePage from "./pages/Home";
import FeaturePlaceholder from "./pages/FeaturePlaceholder";
import MainLayout from "./layouts/MainLayout";
import { auth } from "./firebase";

function AuthPage({ onLogin, user }) {
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginPage
      onLogin={(payload) => {
        onLogin(payload);
        navigate("/", { replace: true });
      }}
    />
  );
}

function LoadingScreen() {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <CircularProgress />
    </Box>
  );
}

function AppRoutes({ user, onLogout, onLogin }) {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage onLogin={onLogin} user={user} />} />
      <Route path="/lesson/:courseSlug/:lessonId" element={<LessonPage />} />

      <Route element={<MainLayout user={user} onLogout={onLogout} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cursuri" element={<CoursesPage />} />
        <Route path="/cursuri/:courseSlug" element={<CourseDetailsPage />} />

        <Route
          path="/mentorat"
          element={
            <FeaturePlaceholder
              title="Mentorat 1-la-1"
              description="Modulul de mentorat este pregătit în arhitectură și va fi activat într-o fază următoare împreună cu mesagerie și programări."
              status="Phase 2"
            />
          }
        />
        <Route
          path="/consiliere"
          element={
            <FeaturePlaceholder
              title="Consiliere creștină"
              description="Fluxul de consiliere va include triere, context spiritual și conectare rapidă cu specialiști validați."
              status="Phase 2"
            />
          }
        />
        <Route
          path="/comunitate"
          element={
            <FeaturePlaceholder
              title="Comunitate creștină"
              description="Forum și grupuri tematice moderate pentru familie, credință, viață profesională și întrebări doctrinare."
              status="Phase 2"
            />
          }
        />
        <Route
          path="/criza"
          element={
            <FeaturePlaceholder
              title="Intervenție în criză"
              description="Butonul de urgență și fluxul de suport imediat sunt planificate în sprintul dedicat de siguranță."
              status="Phase 2"
              primaryActionLabel="Mergi la cursuri"
              primaryActionTo="/cursuri"
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function mapFirebaseUser(firebaseUser) {
  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Utilizator",
    email: firebaseUser.email || "",
    avatar: firebaseUser.photoURL || "",
  };
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(mapFirebaseUser(firebaseUser));
      setAuthReady(true);
    });

    return () => unsubscribe();
  }, []);

  const actions = useMemo(
    () => ({
      onLogin: (payload) => setUser(payload),
      onLogout: async () => {
        await signOut(auth);
        setUser(null);
      },
    }),
    []
  );

  if (!authReady) {
    return <LoadingScreen />;
  }

  return <AppRoutes user={user} onLogout={actions.onLogout} onLogin={actions.onLogin} />;
}
