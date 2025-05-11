@echo off
echo ==========================================
echo Choose an option:
echo ==========================================
echo 1. Run the project locally
echo 2. Deploy to GitHub Pages
echo ==========================================
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo Running the project locally...
    npm run dev
) else if "%choice%"=="2" (
    echo Deploying the project to GitHub Pages...
    npm run build
    gh-pages -d dist
) else (
    echo Invalid choice! Please choose 1 or 2.
)
pause
