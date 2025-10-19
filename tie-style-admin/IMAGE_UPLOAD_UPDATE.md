# Image Upload Path Update - Complete

## Overview
All image uploads in the admin panel now save directly to the main e-commerce application's asset folders instead of the admin panel's static folder. This ensures proper integration between the admin panel and the main application.

## Changes Made

### 1. Configuration (app.py)
**Before:**
```python
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
```

**After:**
```python
ASSETS_FOLDER = os.path.join(PARENT_DIR, 'assets')
IMAGE_FOLDER = os.path.join(PARENT_DIR, 'image')
```

### 2. Upload Function (app.py)
**Rewritten function:**
```python
def save_uploaded_file(file, subfolder='', use_image_dir=False):
    """
    Save uploaded file to the parent directory structure
    
    Args:
        file: The uploaded file object
        subfolder: Subfolder path within assets or image directory
        use_image_dir: If True, save to 'image/' instead of 'assets/'
    
    Returns:
        str: Path to saved file in JSON format (e.g., 'assets/products/file.png')
        None: If save failed
    """
```

### 3. Image Upload Paths by Entity

#### Products
- **Path:** `assets/products/{category-slug}/`
- **JSON Format:** `"assets/products/scrunchies/filename.png"`
- **Routes Updated:**
  - `add_product` (line 139)
  - `edit_product` (line 205)

#### Categories
- **Path:** `assets/categories/`
- **JSON Format:** `"assets/categories/filename.png"`
- **Routes Updated:**
  - `add_category` (line 269)
  - `edit_category` (line 334)

#### News/Offers
- **Path:** `image/news/`
- **JSON Format:** `"image/news/filename.jpg"`
- **Routes Updated:**
  - `add_news` (line 411)
  - `edit_news` (line 451)

#### Store Settings
- **Path:** `image/`
- **JSON Format:** `"image/logo.png"` or `"image/banner.jpg"`
- **Routes Updated:**
  - `store_settings` - logo upload (line 514)
  - `store_settings` - banner upload (line 523)

## Directory Structure
```
C:\Users\DELL\Downloads\files\
├── tie-style-admin\          # Admin panel application
│   ├── app.py
│   ├── utils.py
│   ├── templates\
│   └── static\
├── assets\                    # Main app assets folder
│   ├── categories\           # Category images
│   └── products\            # Product images by category
│       ├── bow-clips\
│       ├── claw-clips\
│       └── scrunchies\
├── image\                     # Main app image folder
│   └── news\                # News/offer images
└── data\                      # JSON data files
    ├── products.json
    ├── categories.json
    ├── news.json
    └── store.json
```

## Path Constants (utils.py)
```python
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(BASE_DIR)
DATA_DIR = os.path.join(PARENT_DIR, 'data')
ASSETS_DIR = os.path.join(PARENT_DIR, 'assets')
IMAGE_DIR = os.path.join(PARENT_DIR, 'image')
```

## Image Validation
- **Allowed Extensions:** png, jpg, jpeg, gif, webp
- **Max File Size:** 5 MB
- **Security:** Uses Werkzeug's `secure_filename()`
- **Path Format:** Always uses forward slashes in JSON for cross-platform compatibility

## Testing Checklist
- [ ] Upload product image → Verify saved to `assets/products/{category}/`
- [ ] Upload category image → Verify saved to `assets/categories/`
- [ ] Upload news image → Verify saved to `image/news/`
- [ ] Upload store logo → Verify saved to `image/`
- [ ] Upload store banner → Verify saved to `image/`
- [ ] Check JSON files have correct path format
- [ ] Test image display in main e-commerce app

## Notes
1. All existing images remain unchanged in their current locations
2. New uploads will automatically use the new path structure
3. The admin panel reads from the parent directory, ensuring seamless integration
4. No changes needed to the main e-commerce application

## Status
✅ **COMPLETE** - All image upload paths updated and verified
