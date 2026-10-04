$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path $PSScriptRoot -Parent
$fontDir = Join-Path $projectRoot 'public\fonts'
New-Item -ItemType Directory -Force -Path $fontDir | Out-Null
$agent = 'Mozilla/5.0 AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
$urls = @(
  'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
)
$styles = ''
$fontIndex = 0
$downloaded = @{}
foreach ($url in $urls) {
  $response = Invoke-WebRequest -Uri $url -UserAgent $agent -UseBasicParsing -TimeoutSec 45
  $css = $response.Content
  foreach ($match in [regex]::Matches($css, 'https://fonts\.gstatic\.com/[^)\s]+')) {
    $fontUrl = $match.Value
    if (-not $downloaded.ContainsKey($fontUrl)) {
      $fontIndex++
      $extension = if ($fontUrl.Contains('.woff2')) { '.woff2' } else { '.ttf' }
      $name = 'arthopilot-' + $fontIndex + $extension
      Invoke-WebRequest -Uri $fontUrl -UseBasicParsing -TimeoutSec 45 -OutFile (Join-Path $fontDir $name)
      $downloaded[$fontUrl] = '/fonts/' + $name
    }
    $css = $css.Replace($fontUrl, $downloaded[$fontUrl])
  }
  $styles += $css + "`n"
}
$styles | Set-Content -Encoding utf8 (Join-Path $projectRoot 'app\local-fonts.css')
Write-Host "Stored $fontIndex font files in $fontDir"
