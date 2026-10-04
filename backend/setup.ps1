$ErrorActionPreference = 'Stop'
$backendRoot = $PSScriptRoot
$env:TEMP = Join-Path $backendRoot 'tmp'
$env:TMP = $env:TEMP
$env:PIP_CACHE_DIR = Join-Path $backendRoot '.cache\pip'
$env:PIP_CONFIG_FILE = 'NUL'
$env:PIP_DISABLE_PIP_VERSION_CHECK = '1'
$env:PYTHONDONTWRITEBYTECODE = '1'
Remove-Item Env:PIP_TARGET,Env:PIP_PREFIX,Env:PYTHONUSERBASE -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force -Path $env:TEMP,$env:PIP_CACHE_DIR | Out-Null
$pythonPath = Join-Path $backendRoot '.venv\Scripts\python.exe'
Write-Host "Python packages: $backendRoot\.venv"
Write-Host "Installer temporary files: $env:TEMP"
Write-Host "Installer cache: $env:PIP_CACHE_DIR"
if (-not (Test-Path -LiteralPath $pythonPath)) {
    python -B -m venv (Join-Path $backendRoot '.venv')
    if ($LASTEXITCODE -ne 0) { throw 'Virtual environment creation failed' }
}
$requirements = Join-Path $backendRoot 'requirements.lock.txt'
if (-not (Test-Path -LiteralPath $requirements)) { $requirements = Join-Path $backendRoot 'requirements.txt' }
& $pythonPath -B -m pip --require-virtualenv install --only-binary=:all: -r $requirements
if ($LASTEXITCODE -ne 0) { throw 'Local dependency installation failed' }
