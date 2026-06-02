@echo off
title SmartGym Totem

cd /d "%~dp0smartgym-admin"

:: Verifica se o servidor ja esta rodando na porta 3000
powershell -Command "try { Invoke-WebRequest http://localhost:3000 -UseBasicParsing -TimeoutSec 1 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 (
    echo Servidor ja esta rodando, abrindo totem...
    start "" "http://localhost:3000/totem"
    exit /b
)

:: Inicia o servidor em uma nova janela
echo Iniciando servidor Next.js...
start "SmartGym - Servidor" cmd /k "cd /d "%~dp0smartgym-admin" && npm run dev"

:: Aguarda o servidor ficar disponivel
echo Aguardando servidor iniciar...
:WAIT
timeout /t 2 /nobreak >nul
powershell -Command "try { Invoke-WebRequest http://localhost:3000 -UseBasicParsing -TimeoutSec 1 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>&1
if errorlevel 1 goto WAIT

echo Servidor pronto! Abrindo totem...
start "" "http://localhost:3000/totem"
