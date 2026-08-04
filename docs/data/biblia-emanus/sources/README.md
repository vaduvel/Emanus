# Surse fixate

`ot-gen-jos-usfm.zip` păstrează copiile exacte ale fișierelor USFM folosite pentru Geneza și Iosua. `../source-lock.json` înregistrează hashul arhivei, hashul fiecărui fișier, proveniența, licența și regulile de versificație.

Snapshotul conține câte un fișier pentru fiecare carte din:

- World English Bible, Protestant Edition: domeniu public;
- Westminster Leningrad Codex: text în domeniul public;
- Open Scriptures Hebrew Bible: adnotări `CC BY 4.0`;
- Cornilescu 1924: domeniu public, script chirilic în distribuția eBible;
- Biblia Traducerea Fidela: domeniu public.

NTR rămâne etalon extern `comparison-only`; textul ei integral nu este stocat în repository.

Snapshotul dovedește proveniența și permite verificări reproductibile. Aprobarea semantică este executată de AI și sigilată pe textul exact; verificările deterministe sunt implementate în `scripts/check-biblia-emanus.py`.
