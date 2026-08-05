#!/usr/bin/env python3
from __future__ import annotations

from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, MarianMTModel, MarianTokenizer

source = "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."

marian_name = "Helsinki-NLP/opus-mt-en-ro"
marian_tokenizer = MarianTokenizer.from_pretrained(marian_name)
marian_model = MarianMTModel.from_pretrained(marian_name)
marian_batch = marian_tokenizer([source], return_tensors="pt", padding=True, truncation=True)
marian_output = marian_model.generate(**marian_batch, max_new_tokens=128, num_beams=5)
print("MARIAN:", marian_tokenizer.batch_decode(marian_output, skip_special_tokens=True)[0])

nllb_name = "facebook/nllb-200-distilled-600M"
nllb_tokenizer = AutoTokenizer.from_pretrained(nllb_name, src_lang="eng_Latn")
nllb_model = AutoModelForSeq2SeqLM.from_pretrained(nllb_name)
nllb_batch = nllb_tokenizer([source], return_tensors="pt", padding=True, truncation=True)
nllb_output = nllb_model.generate(
    **nllb_batch,
    forced_bos_token_id=nllb_tokenizer.convert_tokens_to_ids("ron_Latn"),
    max_new_tokens=128,
    num_beams=5,
)
print("NLLB:", nllb_tokenizer.batch_decode(nllb_output, skip_special_tokens=True)[0])
print("OFFLINE_MODELS_OK")
