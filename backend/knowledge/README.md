# Niyom knowledge documents

Place verified SME guidelines, government procedures and financial education
documents here as UTF-8 `.txt` or `.md` files. Subfolders are supported. Include
the issuing authority, title, publication date and source URL in each document.
No legal or government rules are bundled or invented by this project.

This README is excluded from retrieval. Each document is limited to 2 MB.
PDF, DOCX, scanned pages and OCR are not supported yet: export their text first.
Restart the backend or run `backend\.venv\Scripts\python.exe -m backend.ingest`
from the project root after adding, editing or deleting files. Reindexing
atomically replaces the index, removing stale chunks. Inspect warnings in the
command output or `/health`.

The local index uses word TF-IDF vectors and cosine similarity. Bangla text must
share relevant words with the source; this is lexical retrieval, not multilingual
semantic embedding search. In default mode Niyom returns source excerpts and
citations. Optional Ollama mode generates a Bangla answer from those excerpts.
Document content and model answers still require review for applicability.
