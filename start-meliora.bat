@echo off
cd /d "%~dp0meliora-app"
start "" http://localhost:3000
npm run dev
pause
