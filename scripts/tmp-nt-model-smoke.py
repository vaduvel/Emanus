#!/usr/bin/env python3
from __future__ import annotations

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, MarianMTModel, MarianTokenizer

sources = [
    "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.",
    "Therefore, as sin entered into the world through one man, and death through sin, so death passed to all men because all sinned.",
    "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ.",
]

for model_name, label in [
    ("Helsinki-NLP/opus-mt-en-ro", "MARIAN"),
    ("Helsinki-NLP/opus-mt-tc-big-en-ro", "OPUS_TC_BIG"),
]:
    tokenizer = MarianTokenizer.from_pretrained(model_name)
    model = MarianMTModel.from_pretrained(model_name)
    batch = tokenizer(sources, return_tensors="pt", padding=True, truncation=True)
    output = model.generate(**batch, max_new_tokens=180, num_beams=5)
    for index, text in enumerate(tokenizer.batch_decode(output, skip_special_tokens=True), start=1):
        print(f"{label}_{index}: {text}")

nllb_name = "facebook/nllb-200-distilled-600M"
nllb_tokenizer = AutoTokenizer.from_pretrained(nllb_name, src_lang="eng_Latn")
nllb_model = AutoModelForSeq2SeqLM.from_pretrained(nllb_name)
nllb_batch = nllb_tokenizer(sources, return_tensors="pt", padding=True, truncation=True)
nllb_output = nllb_model.generate(
    **nllb_batch,
    forced_bos_token_id=nllb_tokenizer.convert_tokens_to_ids("ron_Latn"),
    max_new_tokens=180,
    num_beams=5,
)
for index, text in enumerate(nllb_tokenizer.batch_decode(nllb_output, skip_special_tokens=True), start=1):
    print(f"NLLB_{index}: {text}")
print("OFFLINE_MODELS_OK")
