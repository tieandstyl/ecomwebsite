# 🚀 Quick Start Guide - Tie-Style Admin Panel

## Get Started in 3 Minutes!

### Step 1: Open PowerShell
Press `Win + X` and select "Windows PowerShell"

### Step 2: Navigate to the Project
```powershell
cd "C:\Users\DELL\Downloads\files\tie-style-admin"
```

### Step 3: Install Dependencies (First Time Only)
```powershell
# Create virtual environment
python -m venv venv

# Activate it
.\venv\Scripts\Activate.ps1

# Install Flask
pip install -r requirements.txt
```

**Note:** If you get an execution policy error, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 4: Run the Application
```powershell
python app.py
```

### Step 5: Open Your Browser
Go to: **http://localhost:5000**

---

## 🎯 Quick Actions

### Adding Your First Product
1. Click **Products** → **Add New Product**
2. Fill in: ID, SKU, Title, Category, Price, Stock
3. Upload an image
4. Click **Add Product**

### Creating a Category
1. Go to **Categories** → **Add Category**
2. Choose "Main Category"
3. Enter name, description, and upload image
4. Click **Add Category**

### Publishing an Offer
1. Navigate to **News & Offers** → **Add News/Offer**
2. Set type to "Offer"
3. Enter title, content, and dates
4. Upload banner image
5. Click **Add News**

---

## 💡 Tips

- **Backup Before Editing**: Always backup your `data/*.json` files
- **Image Formats**: Use PNG, JPG, or WEBP (max 5MB)
- **Product IDs**: Follow format `prod-xxx-001` for consistency
- **Stop Server**: Press `Ctrl + C` in PowerShell

---

## 🆘 Common Issues

**Port 5000 busy?**
```powershell
netstat -ano | findstr :5000
taskkill /F /PID [NUMBER]
```

**Can't activate venv?**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Images not showing?**
- Check file paths in JSON
- Ensure uploads folder exists
- Verify parent directory structure

---

## 📁 File Locations

- **Admin Panel**: `C:\Users\DELL\Downloads\files\tie-style-admin\`
- **Data Files**: `C:\Users\DELL\Downloads\files\data\`
- **Uploaded Images**: `tie-style-admin\static\uploads\`

---

## 📞 Need Help?

Check the full **README.md** for detailed documentation!

**Happy Managing! 🎀**
