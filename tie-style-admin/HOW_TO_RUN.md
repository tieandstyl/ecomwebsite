# Running Tie-Style Admin Panel

## Quick Start

### Method 1: Using run.bat (Recommended)
Simply double-click `run.bat` - it will automatically:
1. Check if Python is available
2. Install Flask and dependencies if needed
3. Start the admin panel server

### Method 2: Manual Installation
If you prefer to install dependencies manually:

1. Double-click `install-dependencies.bat`
2. Wait for installation to complete
3. Double-click `run.bat` to start the server

## Accessing the Admin Panel

Once the server starts, open your web browser and go to:
```
http://127.0.0.1:5000
```

Or simply:
```
http://localhost:5000
```

## Stopping the Server

Press `Ctrl+C` in the command window to stop the server.

## Troubleshooting

### Problem: "Flask module not found"
**Solution:** The batch file will automatically install Flask. If it fails:
1. Check your internet connection
2. Run `install-dependencies.bat` manually
3. Try running `run.bat` again

### Problem: "Python executable not found"
**Solution:** Make sure the `python` folder exists with `python.exe` inside it.

### Problem: Port 5000 already in use
**Solution:** 
1. Close any other applications using port 5000
2. Or modify `app.py` and change the port number:
   ```python
   app.run(debug=True, port=5001)  # Use a different port
   ```

### Problem: Cannot access from another device
**Solution:** Modify `app.py` to allow external connections:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

## File Structure

```
tie-style-admin/
├── python/              # Python executable folder
│   └── python.exe
├── app.py              # Main Flask application
├── utils.py            # Data management utilities
├── requirements.txt    # Python dependencies
├── run.bat            # Main launcher (auto-installs dependencies)
├── install-dependencies.bat  # Manual dependency installer
├── templates/         # HTML templates
├── static/           # CSS, JS, images
└── data/            # JSON data files (in parent directory)
```

## Dependencies

The application requires:
- Flask 3.0.0
- Werkzeug 3.0.1

These are automatically installed by `run.bat`.

## Features

- ✅ Product Management (Add, Edit, Delete)
- ✅ Category Management
- ✅ Subcategory Management
- ✅ News/Offers Management
- ✅ Store Settings Configuration
- ✅ Image Upload & Management
- ✅ Automatic Image Cleanup
- ✅ Entity-based Image Naming

## Admin Panel Sections

1. **Dashboard** - Overview of store statistics
2. **Products** - Manage product catalog
3. **Categories** - Organize product categories
4. **Subcategories** - Manage subcategory hierarchy
5. **News & Offers** - Create promotional content
6. **Store Settings** - Configure store information

## First Time Setup

1. Run `run.bat` - dependencies will be installed automatically
2. Wait for server to start
3. Open browser at http://localhost:5000
4. Start managing your store!

## Data Files Location

All data is stored in JSON files in the parent directory:
```
../data/
├── products.json
├── categories.json
├── subcategories.json
├── news.json
└── store.json
```

## Image Storage

Images are stored in the parent directory:
```
../assets/
├── categories/       # Category images
└── products/        # Product images
    ├── scrunchies/
    ├── bow-clips/
    └── claw-clips/

../image/
├── news/           # News/offer images
├── store-logo.png  # Store logo
└── store-banner.jpg # Store banner
```

## Support

For issues or questions, refer to:
- `IMAGE_MANAGEMENT_GUIDE.md` - Image handling details
- `ADMIN_PANEL_GUIDE.md` - Complete admin panel documentation
