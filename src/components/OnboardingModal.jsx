import React, { useState } from "react";
import {
  Modal, Box, Typography, Stepper, Step, StepLabel, TextField, Button,
  MenuItem, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Checkbox, FormGroup, IconButton, Paper
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../theme/colors";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const CATEGORII = [
  "Single", "Adolescent", "Soț", "Soție", "Cuplu", "Părinte", "Bunici"
];
const INTERESE = [
  "Să studiez Biblia",
  "Să cresc spiritual",
  "Să găsesc o echipă",
  "Să accesez cursuri video",
  "Să găsesc un mentor",
  "Să mă implic într-o comunitate"
];
const STEPS = ["Despre tine", "Relația ta cu Dumnezeu", "Interese și scopuri"];

export default function OnboardingModal({ email, onClose, onSubmit }) {
  const [user] = useAuthState(auth);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nume: "",
    varsta: "",
    categorie: "",
    casatorit: "",
    copii: "",
    relatieDumnezeu: "",
    citireBiblie: "",
    rogaciune: "",
    interese: [],
    feedback: ""
  });

  // Validare pas cu pas
  const validStep1 = formData.nume && formData.varsta && formData.categorie && formData.casatorit && formData.copii;
  const validStep2 = formData.relatieDumnezeu && formData.citireBiblie && formData.rogaciune;
  const validStep3 = formData.interese.length > 0;

  // Handlers
  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleCheckbox = val => {
    setFormData(f => ({
      ...f,
      interese: f.interese.includes(val)
        ? f.interese.filter(i => i !== val)
        : [...f.interese, val]
    }));
  };

  const handleChange = e => setFormData(f => ({
    ...f,
    [e.target.name]: e.target.value
  }));

  // SALVARE ÎN FIREBASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Trebuie să fii logat pentru a salva datele!");
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: email || user.email,
        ...formData,
        completedOnboarding: true,
        onboardingAt: new Date(),
      }, { merge: true });
      onSubmit && onSubmit(formData);
      onClose && onClose();
    } catch (err) {
      alert("Eroare la salvare: " + err.message);
    }
  };

  return (
    <Modal open onClose={onClose} sx={{ zIndex: 1300 }}>
      <Paper sx={{
        maxWidth: 480,
        bgcolor: colors.bg,
        mx: "auto",
        my: 6,
        p: 4,
        borderRadius: 4,
        boxShadow: 24,
        position: "relative"
      }}>
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16, color: colors.accent }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight={700} mb={2} color={colors.text}>
          Despre tine
        </Typography>

        <Stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
          {STEPS.map((label, idx) => (
            <Step key={label}>
              <StepLabel>
                <span style={{
                  color: step === idx + 1 ? colors.accent : colors.textSecondary
                }}>
                  {label}
                </span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* PASUL 1 */}
        {step === 1 && (
          <Box component="form" autoComplete="off">
            <TextField
              label="Nume complet *"
              name="nume"
              fullWidth
              margin="normal"
              value={formData.nume}
              onChange={handleChange}
              sx={{ bgcolor: colors.inputBg }}
            />
            <TextField
              label="Vârstă *"
              name="varsta"
              fullWidth
              margin="normal"
              type="number"
              value={formData.varsta}
              onChange={handleChange}
              sx={{ bgcolor: colors.inputBg }}
            />
            <TextField
              select
              label="Categoria *"
              name="categorie"
              fullWidth
              margin="normal"
              value={formData.categorie}
              onChange={handleChange}
              SelectProps={{
                MenuProps: { sx: { zIndex: 1501 } }
              }}
              sx={{ bgcolor: colors.inputBg }}
            >
              <MenuItem value=""><em>Alege categoria</em></MenuItem>
              {CATEGORII.map(opt => (
                <MenuItem value={opt} key={opt}>{opt}</MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <FormControl sx={{ mr: 4 }}>
                <FormLabel sx={{ color: colors.text }}>Ești căsătorit?</FormLabel>
                <RadioGroup
                  row
                  name="casatorit"
                  value={formData.casatorit}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Da" control={<Radio sx={{ color: colors.accent }} />} label="Da" />
                  <FormControlLabel value="Nu" control={<Radio sx={{ color: colors.accent }} />} label="Nu" />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <FormLabel sx={{ color: colors.text }}>Ai copii?</FormLabel>
                <RadioGroup
                  row
                  name="copii"
                  value={formData.copii}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Da" control={<Radio sx={{ color: colors.accent }} />} label="Da" />
                  <FormControlLabel value="Nu" control={<Radio sx={{ color: colors.accent }} />} label="Nu" />
                </RadioGroup>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: colors.accent,
                color: "#fff",
                "&:hover": { bgcolor: colors.accentHover }
              }}
              disabled={!validStep1}
              fullWidth
              onClick={handleNext}
            >
              Continuă
            </Button>
          </Box>
        )}

        {/* PASUL 2 */}
        {step === 2 && (
          <Box>
            <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
              <FormLabel sx={{ color: colors.text }}>Cum ai descrie relația ta cu Dumnezeu?</FormLabel>
              <RadioGroup
                name="relatieDumnezeu"
                value={formData.relatieDumnezeu}
                onChange={handleChange}
              >
                <FormControlLabel value="nu_am" control={<Radio sx={{ color: colors.accent }} />} label="Nu am o relație cu Dumnezeu" />
                <FormControlLabel value="caut" control={<Radio sx={{ color: colors.accent }} />} label="Îl caut pe Dumnezeu" />
                <FormControlLabel value="personala" control={<Radio sx={{ color: colors.accent }} />} label="Am o relație personală cu Dumnezeu" />
                <FormControlLabel value="biserica" control={<Radio sx={{ color: colors.accent }} />} label="Sunt implicat activ în biserică" />
                <FormControlLabel value="altceva" control={<Radio sx={{ color: colors.accent }} />} label="Altceva" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
              <FormLabel sx={{ color: colors.text }}>Cât de des citești Biblia?</FormLabel>
              <RadioGroup
                name="citireBiblie"
                value={formData.citireBiblie}
                onChange={handleChange}
              >
                <FormControlLabel value="zilnic" control={<Radio sx={{ color: colors.accent }} />} label="Zilnic" />
                <FormControlLabel value="saptamanal" control={<Radio sx={{ color: colors.accent }} />} label="Săptămânal" />
                <FormControlLabel value="rar" control={<Radio sx={{ color: colors.accent }} />} label="Rar" />
                <FormControlLabel value="niciodata" control={<Radio sx={{ color: colors.accent }} />} label="Niciodată" />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3, width: "100%" }}>
              <FormLabel sx={{ color: colors.text }}>Te rogi regulat?</FormLabel>
              <RadioGroup
                name="rogaciune"
                value={formData.rogaciune}
                onChange={handleChange}
              >
                <FormControlLabel value="da" control={<Radio sx={{ color: colors.accent }} />} label="Da" />
                <FormControlLabel value="nu" control={<Radio sx={{ color: colors.accent }} />} label="Nu" />
                <FormControlLabel value="uneori" control={<Radio sx={{ color: colors.accent }} />} label="Uneori" />
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{ color: colors.accent }}
                onClick={handleBack}
              >Înapoi</Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.accent,
                  color: "#fff",
                  "&:hover": { bgcolor: colors.accentHover }
                }}
                disabled={!validStep2}
                onClick={handleNext}
              >
                Continuă
              </Button>
            </Box>
          </Box>
        )}

        {/* PASUL 3 */}
        {step === 3 && (
          <Box component="form" onSubmit={handleSubmit}>
            <FormLabel sx={{ mb: 2, display: "block", color: colors.text }}>
              Ce te interesează cel mai mult pe platformă?
            </FormLabel>
            <FormGroup sx={{ mb: 2 }}>
              {INTERESE.map(opt => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={formData.interese.includes(opt)}
                      onChange={() => handleCheckbox(opt)}
                      sx={{ color: colors.accent }}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>

            <TextField
              label="Ai un scop sau feedback pentru noi?"
              multiline
              minRows={2}
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2, bgcolor: colors.inputBg }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                sx={{ color: colors.accent }}
                onClick={handleBack}
              >Înapoi</Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.accent,
                  color: "#fff",
                  "&:hover": { bgcolor: colors.accentHover }
                }}
                type="submit"
                disabled={!validStep3}
              >
                Trimite
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Modal>
  );
}
