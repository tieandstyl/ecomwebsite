# Tie-Style Admin Panel 🎀

A comprehensive Flask-based admin panel for managing the Tie-Style e-commerce store. This application provides a user-friendly web interface to manage products, categories, news items, and store settings without manually editing JSON files.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [User Guide](#user-guide)
- [Data Structure](#data-structure)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Product Management
- ✅ Add, edit, and delete products
- ✅ Upload product images
- ✅ Manage product attributes (material, size, color, etc.)
- ✅ Set pricing, stock levels, and availability
- ✅ Categorize products with categories and subcategories
- ✅ Add product tags for better searchability

### Category Management
- ✅ Create and manage main categories
- ✅ Create subcategories linked to parent categories
- ✅ Upload category images
- ✅ Set display order and active status

### News & Offers
- ✅ Create promotional offers and announcements
- ✅ Set start and end dates for offers
- ✅ Add call-to-action buttons
- ✅ Upload promotional images

### Store Settings
- ✅ Update store information (name, description, contact)
- ✅ Configure payment settings (UPI, GPay)
- ✅ Manage delivery areas and shipping policies
- ✅ Set pricing rules (tax rates, shipping fees)
- ✅ Update store logo and banner

### Dashboard
- 📊 View key statistics at a glance
- 📈 Monitor product inventory
- 🎯 Quick access to all features

## 📁 Project Structure

```
tie-style-admin/
│
├── app.py                      # Main Flask application
├── utils.py                    # Utility functions for JSON handling
├── requirements.txt            # Python dependencies
├── README.md                   # This file
│
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── admin.js           # JavaScript functions
│   └── uploads/               # Uploaded images stored here
│       ├── products/
│       ├── categories/
│       ├── news/
│       └── store/
│
└── templates/
    ├── dashboard.html         # Main dashboard
    ├── products.html          # Products list
    ├── edit_product.html      # Add/edit product form
    ├── categories.html        # Categories list
    ├── edit_category.html     # Add/edit category form
    ├── news.html              # News list
    ├── edit_news.html         # Add/edit news form
    ├── store_settings.html    # Store settings form
    └── includes/
        ├── _navbar.html       # Navigation bar
        └── _footer.html       # Footer
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher** - [Download Python](https://www.python.org/downloads/)
- **pip** (Python package installer) - Usually comes with Python
- A web browser (Chrome, Firefox, Edge, etc.)

To check if Python is installed:
```powershell
python --version
```

## 🚀 Installation

### Step 1: Navigate to the Admin Panel Directory

Open PowerShell and navigate to the project directory:

```powershell
cd "C:\Users\DELL\Downloads\files\tie-style-admin"
```

### Step 2: Create a Virtual Environment (Recommended)

Creating a virtual environment keeps your dependencies isolated:

```powershell
python -m venv venv
```

### Step 3: Activate the Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

**Note:** If you encounter an execution policy error, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 4: Install Dependencies

```powershell
pip install -r requirements.txt
```

This will install:
- Flask (web framework)
- Werkzeug (utilities for Flask)

## 🎯 Running the Application

### Start the Flask Server

Make sure you're in the `tie-style-admin` directory with your virtual environment activated:

```powershell
python app.py
```

You should see output similar to:
```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

### Access the Admin Panel

Open your web browser and navigate to:
```
http://127.0.0.1:5000
```

Or simply:
```
http://localhost:5000
```

### Stopping the Server

Press `Ctrl + C` in the PowerShell window to stop the server.

## 📖 User Guide

### Adding a New Product

1. Click **"Products"** in the navigation menu
2. Click **"Add New Product"** button
3. Fill in the product details:
   - **Product ID**: Use format `prod-xxx-001` (e.g., `prod-scr-007`)
   - **SKU**: Unique stock-keeping unit (e.g., `SCR-VELVET-001`)
   - **Title**: Product name
   - **Category & Subcategory**: Select from dropdowns
   - **Price & Stock**: Set pricing and inventory
   - **Description**: Add product details
   - **Attributes**: Add custom fields like material, size, etc.
   - **Image**: Upload a product photo
4. Click **"Add Product"**

### Managing Categories

1. Go to **"Categories"** page
2. To add a category:
   - Click **"Add Category"**
   - Choose "Main Category" or "Subcategory"
   - Fill in the details
   - Upload an image (for main categories)
3. Categories can be edited or deleted from the categories page

### Creating News & Offers

1. Navigate to **"News & Offers"**
2. Click **"Add News/Offer"**
3. Enter:
   - **Title**: Offer headline
   - **Type**: Choose offer, update, or announcement
   - **Content**: Offer details
   - **Dates**: Set start and optional end date
   - **CTA**: Call-to-action button text and link
   - **Image**: Upload promotional banner
4. Toggle **"Active"** to make it live

### Updating Store Settings

1. Go to **"Store Settings"**
2. Update any section:
   - Basic Information
   - Contact Details
   - Payment Settings
   - Delivery Configuration
   - Pricing Rules
3. Click **"Save Settings"**

## 🗂️ Data Structure

### Where Data is Stored

The admin panel reads and writes to JSON files in the parent `data/` directory:

```
C:\Users\DELL\Downloads\files\data\
├── products.json        # All products
├── categories.json      # Main categories
├── subcategories.json   # Subcategories
├── news.json           # News and offers
└── store.json          # Store configuration
```

### Image Storage

Uploaded images are stored in:
```
tie-style-admin/static/uploads/
```

But referenced in JSON files as:
```
assets/products/...
assets/categories/...
image/news/...
```

This allows the main website to access the images.

### Backup Your Data

**Important:** Always backup your JSON files before making bulk changes!

```powershell
# Create a backup folder
mkdir "C:\Users\DELL\Downloads\files\data\backups"

# Copy JSON files
Copy-Item "C:\Users\DELL\Downloads\files\data\*.json" -Destination "C:\Users\DELL\Downloads\files\data\backups\"
```

## 🔧 Troubleshooting

### Port Already in Use

If you see "Address already in use", the port 5000 is occupied:

1. Find and kill the process:
```powershell
netstat -ano | findstr :5000
taskkill /F /PID [PID_NUMBER]
```

2. Or change the port in `app.py`:
```python
app.run(debug=True, host='127.0.0.1', port=5001)
```

### Images Not Displaying

1. Check that the image paths in JSON files match the actual file locations
2. Ensure the parent directory structure includes `assets/` and `image/` folders
3. Verify file permissions

### JSON File Not Found Errors

The `utils.py` file expects the `data/` folder to be in the parent directory. Ensure:
```
files/
├── tie-style-admin/  (this project)
└── data/            (JSON files here)
    ├── products.json
    ├── categories.json
    └── ...
```

### Virtual Environment Issues

If activation fails:
```powershell
# Allow script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then activate again
.\venv\Scripts\Activate.ps1
```

### Flask Not Found After Installation

Make sure you're in the virtual environment (you should see `(venv)` in your prompt):
```powershell
# Reactivate if needed
.\venv\Scripts\Activate.ps1

# Reinstall if necessary
pip install -r requirements.txt
```

## 🔒 Security Notes

**Before deploying to production:**

1. **Change the Secret Key**: In `app.py`, change:
   ```python
   app.secret_key = 'your-very-secure-random-key-here'
   ```

2. **Disable Debug Mode**: Change:
   ```python
   app.run(debug=False, host='127.0.0.1', port=5000)
   ```

3. **Add Authentication**: Consider adding login functionality to protect the admin panel

4. **Use HTTPS**: Deploy with a proper web server (nginx + gunicorn) and SSL certificate

## 🎨 Customization

### Changing Colors

Edit `static/css/style.css` and modify the CSS variables:

```css
:root {
    --primary-color: #6366f1;  /* Change to your brand color */
    --secondary-color: #8b5cf6;
    /* ... */
}
```

### Adding New Features

1. Add a route in `app.py`
2. Create a template in `templates/`
3. Update the navbar in `templates/includes/_navbar.html`

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review the Flask documentation: https://flask.palletsprojects.com/
- Contact: santhoshsharuk16@gmail.com

## 📝 License

This project is created for Tie-Style store management.

---

**Happy Managing! 🎀✨**
