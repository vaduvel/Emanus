# WLC archive drift — 2026-08-08

Current upstream archive SHA-256:
`0b0b9416b941550ef780b8fb8efd114c3ba141a4e9c094a43da70d1458122ded`

Previous pinned archive SHA-256:
`da7b33af7a23e0e9fce8a8adf3cb5bcb035a513f44b83865b390c52dc3dd2ce3`

The fresh-source capture gate compared all 12 in-scope WLC USFM payloads
(HOS–MAL) against the previous per-book lock and proved them byte-identical.
Therefore the observed difference is archive packaging/metadata drift for this
scope, not a change to the biblical source text used by the minor-prophet audit.

Promotion scripts were updated to the currently verified archive hash only after
that per-book proof. Any future archive drift remains a hard failure until the
payloads are checked again.
