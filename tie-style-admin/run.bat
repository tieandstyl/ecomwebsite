@echo off
echo ========================================
echo  Tie-Style Admin Panel Launcher
echo ========================================
echo.

REM Change to the script directory
cd /d "%~dp0"

REM Set the Python executable path (full path for PowerShell compatibility)
set PYTHON_EXE=%~dp0python\python.exe
set APP_FILE=%~dp0app.py

REM Check if Python executable exists
if not exist "%PYTHON_EXE%" (
    echo ERROR: Python executable not found at %PYTHON_EXE%
    echo Please ensure Python is in the python\ folder
    pause
    exit /b 1
)

echo Checking Python version...
"%PYTHON_EXE%" --version
echo.

REM Enable site module for embedded Python (if ._pth file exists)
if exist "%~dp0python\python313._pth" (
    findstr /C:"import site" "%~dp0python\python313._pth" >nul 2>&1
    if errorlevel 1 (
        echo Enabling pip support for embedded Python...
        powershell -Command "(Get-Content '%~dp0python\python313._pth') -replace '#import site', 'import site' | Set-Content '%~dp0python\python313._pth'"
        echo.
    )
)

REM Check if pip is available
"%PYTHON_EXE%" -m pip --version >nul 2>&1
if errorlevel 1 (
    echo Installing pip...
    powershell -Command "Invoke-WebRequest -Uri 'https://bootstrap.pypa.io/get-pip.py' -OutFile '%~dp0get-pip.py'"
    "%PYTHON_EXE%" "%~dp0get-pip.py"
    del "%~dp0get-pip.py"
    echo.
)

REM Check if Flask is installed
"%PYTHON_EXE%" -c "import flask" >nul 2>&1
if errorlevel 1 (
    echo Flask is not installed. Installing dependencies...
    echo This may take a few minutes...
    echo.
    "%PYTHON_EXE%" -m pip install --upgrade pip
    "%PYTHON_EXE%" -m pip install -r "%~dp0requirements.txt"
    echo.
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
    echo.
) else (
    echo Flask is already installed.
    echo.
)

echo Starting Tie-Style Admin Panel...
echo.
echo ========================================
echo  Server will start at: http://127.0.0.1:5000
echo  Press Ctrl+C to stop the server
echo ========================================
echo.

REM Run the Flask application
"%PYTHON_EXE%" "%APP_FILE%"

pause
