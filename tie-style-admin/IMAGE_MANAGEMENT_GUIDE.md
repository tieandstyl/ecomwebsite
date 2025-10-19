# Image Management Guide

## Overview
The admin panel now includes comprehensive image lifecycle management with automatic deletion and entity-based naming.

## Features Implemented

### 1. **Automatic Image Deletion**
When you delete a product, category, or news item, all associated images are automatically removed from storage.

**Benefits:**
- No orphaned image files cluttering your storage
- Clean and organized asset folders
- Reduced storage usage

**Applies to:**
- Products: All images in `product['images']` array
- Categories: Image in `category['image']` field
- News/Offers: All images in `news['media']` array
- Store Settings: Logo and banner when updated

### 2. **Entity-Based Image Naming**
Images are now saved with meaningful names based on the entity they belong to, instead of random timestamps.

**Naming Conventions:**

| Entity Type | File Name Pattern | Example |
|------------|-------------------|---------|
| **Category** | `{category-slug}.{ext}` | `scrunchies.png` |
| **Product** | `{product-slug}.{ext}` | `skinny-scrunchie.jpg` |
| **News/Offer** | `{news-slug}.{ext}` | `summer-sale-2024.png` |
| **Store Logo** | `store-logo.{ext}` | `store-logo.png` |
| **Store Banner** | `store-banner.{ext}` | `store-banner.jpg` |

**Benefits:**
- Easy to identify which image belongs to which entity
- Logical file organization
- Better SEO (descriptive filenames)
- Easier manual file management if needed

## How It Works

### Adding New Entities
1. Upload an image when creating a product/category/news
2. The system automatically generates a slug from the entity name
3. Image is saved with the slug as the filename
4. Example: Category "Bow Clips" → saved as `bow-clips.png`

### Editing Entities
1. Upload a new image when editing
2. **Old image is automatically deleted first**
3. New image is saved with the current slug
4. Example: Update "Scrunchies" category image → old `scrunchies.png` deleted, new one saved

### Deleting Entities
1. Click delete on a product/category/news
2. **System retrieves all associated images**
3. **All images are deleted from storage**
4. Entity record is removed from database
5. Example: Delete "Skinny Scrunchie" → both `skinny-scrunchie.jpg` and entity deleted

## File Locations

### Products
- **Location:** `c:\Users\DELL\Downloads\files\assets\products\{category-slug}\`
- **Example:** `assets/products/scrunchies/skinny-scrunchie.jpg`
- **Naming:** Uses product slug

### Categories
- **Location:** `c:\Users\DELL\Downloads\files\assets\categories\`
- **Example:** `assets/categories/bow-clips.png`
- **Naming:** Uses category slug

### News/Offers
- **Location:** `c:\Users\DELL\Downloads\files\image\news\`
- **Example:** `image/news/summer-sale-2024.png`
- **Naming:** Uses news slug

### Store Assets
- **Location:** `c:\Users\DELL\Downloads\files\image\`
- **Example:** `image/store-logo.png`, `image/store-banner.jpg`
- **Naming:** Fixed names (store-logo, store-banner)

## Technical Implementation

### Key Functions

#### `delete_image_file(image_path)`
```python
def delete_image_file(image_path):
    """Delete an image file from the parent directory"""
    if not image_path:
        return
    
    # Convert relative path to absolute
    full_path = os.path.join(PARENT_DIR, image_path)
    
    # Delete the file if it exists
    if os.path.exists(full_path):
        os.remove(full_path)
```

#### `save_uploaded_file(file, subfolder, use_image_dir, custom_filename)`
```python
def save_uploaded_file(file, subfolder='', use_image_dir=False, custom_filename=None):
    """
    Save an uploaded file with optional custom filename
    
    Args:
        file: The uploaded file object
        subfolder: Subfolder within the base directory
        use_image_dir: Use IMAGE_FOLDER instead of ASSETS_FOLDER
        custom_filename: Custom name (without extension) for the file
    """
    # ... validation code ...
    
    if custom_filename:
        # Use custom filename + original extension
        _, ext = os.path.splitext(filename)
        filename = f"{custom_filename}{ext}"
    else:
        # Use timestamp-based filename
        filename = f"{timestamp}_{filename}"
```

### Routes Updated

#### Products
- `add_product()` - Uses product slug as filename
- `edit_product()` - Deletes old images, uses product slug
- `delete_product()` - Deletes all product images before removal

#### Categories
- `add_category()` - Uses category slug as filename
- `edit_category()` - Deletes old image, uses category slug
- `delete_category()` - Deletes category image before removal

#### News/Offers
- `add_news()` - Uses news slug as filename
- `edit_news()` - Deletes old images, uses news slug
- `delete_news()` - Deletes all news images before removal

#### Store Settings
- `store_settings()` - Uses fixed names (store-logo, store-banner)
- Deletes old logo/banner when updating

## Workflow Examples

### Example 1: Add a New Product
```
1. User creates "Velvet Scrunchie" product
2. Slug generated: "velvet-scrunchie"
3. User uploads "IMG_1234.jpg"
4. Saved as: "assets/products/scrunchies/velvet-scrunchie.jpg"
```

### Example 2: Edit Product with New Image
```
1. User edits "Velvet Scrunchie"
2. Uploads new image "IMG_5678.jpg"
3. Old file deleted: "velvet-scrunchie.jpg"
4. New file saved: "velvet-scrunchie.jpg"
```

### Example 3: Delete a Category
```
1. User deletes "Bow Clips" category
2. System retrieves: category['image'] = "assets/categories/bow-clips.png"
3. File deleted: "bow-clips.png" removed from storage
4. Database record deleted: category removed from categories.json
```

## Benefits Summary

✅ **Clean Storage** - No orphaned files
✅ **Meaningful Names** - Easy to identify files
✅ **Automatic Cleanup** - No manual file management needed
✅ **Better Organization** - Logical file structure
✅ **SEO Friendly** - Descriptive filenames
✅ **Developer Friendly** - Easy debugging and maintenance

## Notes

- All image operations use the parent directory structure (main app folders)
- Allowed extensions: png, jpg, jpeg, gif, webp
- Max file size: 5 MB
- Images are validated before upload
- Slugs are automatically generated from entity names
- Old images are always deleted before new ones are saved (on edit)
- All associated images are deleted when entity is removed
