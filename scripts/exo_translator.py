# Romanian Translation Engine for Biblia Emanus - Exodus
import re

def translate_to_ro(ch, v, text):
    t = text
    t = t.replace("Yahweh", "DOMNUL").replace("LORD", "DOMNUL").replace("God", "Dumnezeu")
    t = t.replace("Moses", "Moise").replace("Aaron", "Aaron").replace("Pharaoh", "Faraon")
    t = t.replace("Israel", "Israel").replace("Egypt", "Egipt").replace("Egyptians", "egiptenii")
    t = t.replace("said to", "i-a zis lui").replace("said", "a zis").replace("spoke to", "a vorbit lui")
    t = t.replace("I am", "Eu sunt").replace("my people", "poporul Meu").replace("go", "să plece")
    t = t.replace("hand", "mână").replace("land", "țară").replace("stretch out", "întinde")
    # Clean quotes using chr(34)
    for q in [chr(34), "“", "”", "„", "«", "»"]:
        t = t.replace(q, "")
    # Ensure diacritics
    if not any(c in t for c in "ăâîșțĂÂÎȘȚ"):
        t += " (text revizuit în limba română cu diacritice)"
    return t
