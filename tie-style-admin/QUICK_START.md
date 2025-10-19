# Quick Start - Tie-Style Admin Panel ⚡

## ✅ Setup Complete!

Your admin panel is now ready to use. Flask has been successfully installed.

## 🚀 How to Run

**Simply double-click `run.bat`**

That's it! The batch file will:
- ✅ Check if Flask is installed (already done!)
- ✅ Start the server automatically
- ✅ Open at: http://127.0.0.1:5000

## 📱 Access the Admin Panel

Once the server starts, open your browser and go to:

```
http://127.0.0.1:5000
```

or

```
http://localhost:5000
```

## ⏸️ Stop the Server

Press `Ctrl+C` in the command window to stop the server.

## ✨ Current Status

```
✅ Python 3.13.6 - Installed
✅ Flask 3.0.0 - Installed  
✅ Werkzeug 3.0.1 - Installed
✅ Pip - Enabled
✅ Site Module - Enabled
```

## 📋 What's Available

- **Products Management** - Add, edit, delete products
- **Categories Management** - Organize your product categories
- **Subcategories** - Create subcategory hierarchy
- **News & Offers** - Manage promotional content
- **Store Settings** - Configure store information
- **Image Management** - Upload and manage images with automatic cleanup

## 🔧 Troubleshooting

### Problem: Port already in use
**Solution:** Close any other programs using port 5000 or change the port in `app.py`:
```python
app.run(debug=True, host='127.0.0.1', port=5001)
```

### Problem: Can't access from phone/other device
**Solution:** Change `app.py` line 692 to:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```
Then access using your computer's IP address: `http://192.168.x.x:5000`

## 📂 File Locations

### Data Files (JSON)
```
../data/
├── products.json
├── categories.json
├── subcategories.json
├── news.json
└── store.json
```

### Image Files
```
../assets/
├── categories/      (category images)
└── products/        (product images by category)

../image/
├── news/           (news/offer images)
├── store-logo.png
└── store-banner.jpg
```

## 🎯 Next Steps

1. Double-click `run.bat`
2. Wait for "Running on http://127.0.0.1:5000" message
3. Open browser at http://localhost:5000
4. Start managing your store!

## 📖 More Information

- **HOW_TO_RUN.md** - Detailed running instructions
- **IMAGE_MANAGEMENT_GUIDE.md** - Image handling documentation
- **ADMIN_PANEL_GUIDE.md** - Complete feature documentation

---

**🎉 Everything is ready! Just double-click `run.bat` to start!**
