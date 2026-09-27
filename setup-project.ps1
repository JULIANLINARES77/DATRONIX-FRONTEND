$ErrorActionPreference = "Stop"

Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "  DATRONIX - INSTALACION Y VALIDACION DEL PROYECTO" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

Write-Host "\n[1/2] Instalando dependencias..." -ForegroundColor Yellow
npm install

Write-Host "\n[2/2] Validando compilacion..." -ForegroundColor Yellow
npm run build

Write-Host "\nLa instalacion y compilacion terminaron correctamente." -ForegroundColor Green
Write-Host "Ahora puedes arrancar la app con:" -ForegroundColor Green
Write-Host "  npm run dev -- --host 0.0.0.0" -ForegroundColor White
