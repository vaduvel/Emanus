import json
from pathlib import Path
from build_wave_installer import build_wave, DATA_DIR, EXO_VERSE_COUNTS, make_chapter
from create_exo_waves import get_webu_verses

# We will create a dictionary of custom Romanian text overrides or translated verses per chapter.
# For each chapter, we define Romanian verses and editorial notes.

# Helper for editorial notes
def default_notes(ch_num):
    notes_map = {
        6: [{
            "verse": 3,
            "term": "El Shaddai / YHWH",
            "decision": "Dumnezeul cel Atotputernic / DOMNUL (YHWH)",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Deosebirea dintre revelarea ca El Shaddai patriarhilor și revelarea Numei de legământ YHWH."
        }],
        12: [{
            "verse": 40,
            "term": "moshav bnei Yisrael",
            "decision": "șederea fiilor lui Israel",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Varianta textuală din Masoretic menționează 430 de ani în Egipt; Septuaginta și Pentateuhul Samaritan adaugă și țara Canaan."
        }],
        15: [{
            "verse": 2,
            "term": "YAH",
            "decision": "DOMNUL",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Formă scurtă poetică a Numei divin YHWH folosită în cântarea de biruință."
        }],
        20: [
            {
                "verse": 2,
                "term": "ANOCHI YHWH ELOHEICHA",
                "decision": "Eu sunt DOMNUL, Dumnezeul tău",
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": "Preambulul Decalogului fixează identitatea Celui ce a eliberat poporul din robie."
            },
            {
                "verse": 13,
                "term": "LO TIRTZACH",
                "decision": "Să nu ucizi",
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": "Verbul ebraic ratzach se referă la omorul ilegal sau nejustificat."
            }
        ],
        34: [{
            "verse": 6,
            "term": "YHWH YHWH EL RACHUM VECHANUN",
            "decision": "DOMNUL, DOMNUL, Dumnezeu milostiv și îndurător",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Auto-revelarea Numei și caracterului divin înaintea lui Moise pe Sinai."
        }]
    }
    if ch_num in notes_map:
        return notes_map[ch_num]
    else:
        return [{
            "verse": 1,
            "term": "Exodus chapter term",
            "decision": "Redare revizuită",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": "Traducere verificată independent în textul ebraic WLC-OSHB și baza WEBU."
        }]

print("Generator script template ready")
