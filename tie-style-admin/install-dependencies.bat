@echo off
echo ========================================
echo  Installing Dependencies for Tie-Style Admin
echo ========================================
echo.

cd /d "%~dp0"

set PYTHON_EXE=%~dp0python\python.exe

if not exist "%PYTHON_EXE%" (
    echo ERROR: Python executable not found at %PYTHON_EXE%
    pause
    exit /b 1
)

echo Installing required packages...
echo This may take a few minutes...
echo.

"%PYTHON_EXE%" -m pip install --upgrade pip
"%PYTHON_EXE%" -m pip install -r "%~dp0requirements.txt"

echo.
if errorlevel 1 (
    echo ERROR: Installation failed!
    echo Please check your internet connection and try again.
) else (
    echo SUCCESS: All dependencies installed successfully!
)

echo.
pause
