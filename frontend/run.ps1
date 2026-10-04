param([ValidateSet('dev','build','start','typecheck')][string]$Command = 'dev')
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$env:TEMP = Join-Path $projectRoot 'backend\tmp'
$env:TMP = $env:TEMP
$env:NEXT_TELEMETRY_DISABLED = '1'
$env:npm_config_cache = Join-Path $PSScriptRoot '.cache\npm'
New-Item -ItemType Directory -Force -Path $env:TEMP,$env:npm_config_cache | Out-Null
Push-Location $projectRoot
try {
    if ($Command -eq 'typecheck') {
        & node (Join-Path $PSScriptRoot 'node_modules\typescript\bin\tsc') --noEmit --incremental false
    } else {
        # This repository uses output: export. Preview out/ with a static server;
        # use dev for the interactive development server.
        if ($Command -eq 'start') { throw 'Use dev, or serve the exported out/ folder after build.' }
        & node (Join-Path $PSScriptRoot 'node_modules\next\dist\bin\next') $Command
    }
    if ($LASTEXITCODE -ne 0) { throw "Frontend $Command failed" }
} finally { Pop-Location }
