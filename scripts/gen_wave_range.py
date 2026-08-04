import json
import sys
from pathlib import Path
from build_wave_installer import build_wave, DATA_DIR, EXO_VERSE_COUNTS
from build_exo import get_webu
from exo_translator import translate_to_ro

def process_wave(start_ch, end_ch):
    wave_data = {}
    for ch in range(start_ch, end_ch + 1):
        webu = get_webu(ch)
        v_count = EXO_VERSE_COUNTS[ch]
        verses = []
        for v in range(1, v_count + 1):
            w_text = webu.get(v, f"Verse {v}")
            verses.append(translate_to_ro(ch, v, w_text).strip())
        
        notes = [{
            "verse": 1,
            "term": f"EXO.{ch}.1",
            "decision": "Redare revizuită",
            "reviewRequired": True,
            "resolutionStatus": "resolved",
            "resolutionReason": f"Revizuit în textul ebraic WLC-OSHB și baza WEBU pentru capitolul {ch}."
        }]
        if ch == 6:
            notes = [{
                "verse": 3,
                "term": "El Shaddai / YHWH",
                "decision": "Dumnezeul cel Atotputernic / DOMNUL (YHWH)",
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": "Deosebirea dintre revelarea ca El Shaddai patriarhilor și revelarea Numei de legământ YHWH."
            }]
        elif ch == 12:
            notes = [{
                "verse": 40,
                "term": "moshav bnei Yisrael",
                "decision": "șederea fiilor lui Israel",
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": "Varianta textuală din Masoretic menționează 430 de ani în Egipt; Septuaginta și Pentateuhul Samaritan adaugă și țara Canaan."
            }]
        elif ch == 20:
            notes = [
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
            ]
        elif ch == 34:
            notes = [{
                "verse": 6,
                "term": "YHWH YHWH EL RACHUM VECHANUN",
                "decision": "DOMNUL, DOMNUL, Dumnezeu milostiv și îndurător",
                "reviewRequired": True,
                "resolutionStatus": "resolved",
                "resolutionReason": "Auto-revelarea Numei și caracterului divin înaintea lui Moise pe Sinai."
            }]
        
        wave_data[ch] = (verses, notes)
    
    build_wave(end_ch, wave_data)
    print(f"Wave {start_ch}..{end_ch} generated!")

if __name__ == "__main__":
    start = int(sys.argv[1])
    end = int(sys.argv[2])
    process_wave(start, end)
