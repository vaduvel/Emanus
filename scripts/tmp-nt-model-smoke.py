#!/usr/bin/env python3
from __future__ import annotations

from transformers import MarianMTModel, MarianTokenizer

model_name = "Helsinki-NLP/opus-mt-en-ro"
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)
source = "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."
batch = tokenizer([source], return_tensors="pt", padding=True, truncation=True)
translated = model.generate(**batch, max_new_tokens=128, num_beams=5)
print("OFFLINE_MODEL_OK")
print(tokenizer.batch_decode(translated, skip_special_tokens=True)[0])
