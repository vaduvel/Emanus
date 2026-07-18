import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import loginImage from "../login.png";

function normalizeUser(firebaseUser, fallbackName = "Utilizator") {
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || fallbackName,
    email: firebaseUser.email || "",
    avatar: firebaseUser.photoURL || "",
  };
}

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [gdpr, setGdpr] = useState(false);

  const resetAuthError = () => setError("");

  const handleGoogle = async () => {
    resetAuthError();
    setLoading(true);
    try {
      const response = await signInWithPopup(auth, googleProvider);
      onLogin(normalizeUser(response.user));
    } catch (err) {
      setError(err?.message || "Nu am reușit autentificarea cu Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    resetAuthError();
    setLoading(true);

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      onLogin(normalizeUser(response.user, email.split("@")[0]));
    } catch (err) {
      setError(err?.message || "Date incorecte sau cont inexistent.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    resetAuthError();

    if (!signupName.trim() || !signupEmail.trim() || !signupPassword) {
      setError("Completează toate câmpurile obligatorii.");
      return;
    }

    if (!gdpr) {
      setError("Trebuie să accepți termenii și politica de confidențialitate.");
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await updateProfile(response.user, { displayName: signupName.trim() });
      onLogin(normalizeUser(response.user, signupName.trim()));
    } catch (err) {
      setError(err?.message || "Nu am putut crea contul.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
      }}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "relative",
          p: 4,
          alignItems: "flex-end",
          backgroundImage: `linear-gradient(180deg, rgba(5,7,16,0.35) 0%, rgba(5,7,16,0.82) 100%), url(${loginImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          color: "#fff",
        }}
      >
        <Box sx={{ maxWidth: 560 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
            Bun venit în EMANUS
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.9)", fontSize: 20, lineHeight: 1.6 }}>
            Formare creștină ancorată în Scriptură, lecții aplicate pe etape de viață și dezvoltare matură pentru
            familie, comunitate și slujire.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: { xs: 2.2, md: 4 } }}>
        <Paper sx={{ width: "100%", maxWidth: 430, p: 3.2, border: "1px solid #e5e7eb" }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.2 }}>
            <LockOutlinedIcon color="secondary" />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {mode === "login" ? "Autentificare" : "Creează cont"}
            </Typography>
          </Stack>

          <Button
            onClick={handleGoogle}
            startIcon={<GoogleIcon />}
            fullWidth
            variant="outlined"
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {mode === "login" ? "Intră cu Google" : "Înregistrează-te cu Google"}
          </Button>

          <Divider sx={{ mb: 2 }}>sau</Divider>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {mode === "login" ? (
            <Box component="form" onSubmit={handleEmailLogin}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Parolă"
                fullWidth
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                sx={{ mb: 2 }}
              />

              <Button type="submit" fullWidth variant="contained" disabled={loading}>
                Intră în cont
              </Button>

              <Typography sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
                Nu ai cont?{" "}
                <Link
                  component="button"
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    resetAuthError();
                  }}
                  sx={{ fontWeight: 700 }}
                >
                  Creează unul
                </Link>
              </Typography>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSignUp}>
              <TextField
                label="Nume complet"
                fullWidth
                required
                value={signupName}
                onChange={(event) => setSignupName(event.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                fullWidth
                type="email"
                required
                value={signupEmail}
                onChange={(event) => setSignupEmail(event.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Parolă"
                fullWidth
                type="password"
                required
                value={signupPassword}
                onChange={(event) => setSignupPassword(event.target.value)}
                sx={{ mb: 1.2 }}
              />

              <FormControlLabel
                control={<Checkbox checked={gdpr} onChange={(event) => setGdpr(event.target.checked)} />}
                label={<Typography sx={{ fontSize: 14 }}>Accept termenii și politica de confidențialitate.</Typography>}
                sx={{ mb: 1.4, alignItems: "flex-start" }}
              />

              <Button type="submit" fullWidth variant="contained" disabled={loading}>
                Creează cont
              </Button>

              <Typography sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}>
                Ai deja cont?{" "}
                <Link
                  component="button"
                  type="button"
                  onClick={() => {
                    setMode("login");
                    resetAuthError();
                  }}
                  sx={{ fontWeight: 700 }}
                >
                  Intră în cont
                </Link>
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
