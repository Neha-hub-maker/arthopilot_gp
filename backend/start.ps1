$ErrorActionPreference = 'Stop'
$env:TEMP = Join-Path $PSScriptRoot 'tmp'
$env:TMP = $env:TEMP
$env:PYTHONDONTWRITEBYTECODE = '1'
New-Item -ItemType Directory -Force -Path $env:TEMP | Out-Null
Push-Location (Split-Path $PSScriptRoot -Parent)
try {
    & (Join-Path $PSScriptRoot '.venv\Scripts\python.exe') -B -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
} finally { Pop-Location }
