import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Categoriile din formular
const categories = [
  { value: "adolescent", label: "Adolescent" },
  { value: "tanar", label: "Tânăr" },
  { value: "single", label: "Single" },
  { value: "cuplu", label: "Cuplu" },
  { value: "sotie", label: "Soție" },
  { value: "sot", label: "Soț" },
  { value: "parinte", label: "Părinte" },
  { value: "bunici", label: "Bunici" }
];

export default function OnboardingForm({ email, onSubmit, onClose }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    age: "",
    category: "",
    married: "",
    hasChildren: "",
    bible: "",
    church: "",
    relation: "",
    denomination: "",
    goals: ""
  });

  // Navigare pași
  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  // Update field
  const update = (field, value) => setData({ ...data, [field]: value });

  // Final submit
  const handleSubmit = e => {
    e.preventDefault();
    // Logica: calculează abonament sugerat (exemplu)
    let suggestedPlan = "Single";
    if ((data.category === "cuplu" || data.married === "da") && data.hasChildren === "da") suggestedPlan = "Family";
    else if (data.category === "cuplu" || data.married === "da") suggestedPlan = "Couple";
    else if (data.category === "bunici") suggestedPlan = "Bunici";
    else if (data.category === "adolescent" || Number(data.age) < 18) suggestedPlan = "Teenager";
    // etc.
    onSubmit({ ...data, email, suggestedPlan });
  };

  // Pașii chestionarului:
  const steps = [
    // Pas 1: Date personale
    <Box key="demografic">
      <Typography variant="h6" mb={2} color="#15304b">Despre tine</Typography>
      <TextField
        label="Nume complet"
        fullWidth required sx={{ mb: 2 }}
        value={data.name}
        onChange={e => update("name", e.target.value)}
      />
      <TextField
        label="Vârstă"
        type="number"
        fullWidth required sx={{ mb: 2 }}
        value={data.age}
        onChange={e => update("age", e.target.value)}
      />
      <TextField
        label="Categoria"
        select
        fullWidth required sx={{ mb: 2 }}
        value={data.category}
        onChange={e => update("category", e.target.value)}
      >
        {categories.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
      <Typography mt={2}>Ești căsătorit?</Typography>
      <RadioGroup row value={data.married} onChange={e => update("married", e.target.value)}>
        <FormControlLabel value="da" control={<Radio color="primary" />} label="Da" />
        <FormControlLabel value="nu" control={<Radio color="primary" />} label="Nu" />
      </RadioGroup>
      <Typography mt={2}>Ai copii?</Typography>
      <RadioGroup row value={data.hasChildren} onChange={e => update("hasChildren", e.target.value)}>
        <FormControlLabel value="da" control={<Radio color="primary" />} label="Da" />
        <FormControlLabel value="nu" control={<Radio color="primary" />} label="Nu" />
      </RadioGroup>
      <Button variant="contained" sx={{ mt: 3 }} onClick={handleNext}>Continuă</Button>
    </Box>,

    // Pas 2: Relația cu Dumnezeu
    <Box key="relatie">
      <Typography variant="h6" mb={2} color="#15304b">Despre relația cu Dumnezeu</Typography>
      <TextField
        label="Cât de des citești Biblia?"
        select fullWidth required sx={{ mb: 2 }}
        value={data.bible}
        onChange={e => update("bible", e.target.value)}
      >
        <MenuItem value="zilnic">Zilnic</MenuItem>
        <MenuItem value="saptamanal">Săptămânal</MenuItem>
        <MenuItem value="rar">Rar</MenuItem>
        <MenuItem value="niciodata">Niciodată</MenuItem>
      </TextField>
      <TextField
        label="Cât de des mergi la biserică?"
        select fullWidth required sx={{ mb: 2 }}
        value={data.church}
        onChange={e => update("church", e.target.value)}
      >
        <MenuItem value="saptamanal">Săptămânal</MenuItem>
        <MenuItem value="ocazional">Ocazional</MenuItem>
        <MenuItem value="rar">Rar</MenuItem>
      </TextField>
      <TextField
        label="Cum ai descrie relația ta cu Dumnezeu?"
        select fullWidth required sx={{ mb: 2 }}
        value={data.relation}
        onChange={e => update("relation", e.target.value)}
      >
        <MenuItem value="puternica">Puternică</MenuItem>
        <MenuItem value="in crestere">În creștere</MenuItem>
        <MenuItem value="slaba">Slabă</MenuItem>
      </TextField>
      <TextField
        label="Denominație (opțional)"
        fullWidth sx={{ mb: 2 }}
        value={data.denomination}
        onChange={e => update("denomination", e.target.value)}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="text" onClick={handleBack}>Înapoi</Button>
        <Button variant="contained" onClick={handleNext}>Continuă</Button>
      </Box>
    </Box>,

    // Pas 3: Scopuri pe platformă
    <Box key="scop">
      <Typography variant="h6" mb={2} color="#15304b">Ce vrei să faci pe platformă?</Typography>
      <RadioGroup
        value={data.goals}
        onChange={e => update("goals", e.target.value)}
      >
        <FormControlLabel value="studiez" control={<Radio color="primary" />} label="Să studiez Biblia singur" />
        <FormControlLabel value="echipa" control={<Radio color="primary" />} label="Să fac parte dintr-o echipă" />
        <FormControlLabel value="mentor" control={<Radio color="primary" />} label="Să devin mentor" />
        <FormControlLabel value="cursuri" control={<Radio color="primary" />} label="Să urmez cursuri tematice" />
        <FormControlLabel value="crestere" control={<Radio color="primary" />} label="Să cresc spiritual" />
        <FormControlLabel value="altceva" control={<Radio color="primary" />} label="Altceva" />
      </RadioGroup>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button variant="text" onClick={handleBack}>Înapoi</Button>
        <Button variant="contained" onClick={handleSubmit}>Trimite</Button>
      </Box>
    </Box>
  ];

  return (
    <Paper sx={{
      p: 4,
      minWidth: 340,
      maxWidth: 480,
      width: "100%",
      borderRadius: 4,
      position: "relative"
    }}>
      {/* Buton de închidere */}
      <IconButton
        sx={{ position: "absolute", top: 8, right: 8, color: "#64748b" }}
        onClick={onClose}
        aria-label="Închide"
      >
        <CloseIcon />
      </IconButton>
      {/* Stepper */}
      <Stepper activeStep={step} alternativeLabel sx={{ mb: 4 }}>
        <Step><StepLabel /></Step>
        <Step><StepLabel /></Step>
        <Step><StepLabel /></Step>
      </Stepper>
      <form>
        {steps[step]}
      </form>
    </Paper>
  );
}
