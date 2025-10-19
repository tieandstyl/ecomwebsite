# Sequential ID Generation - Update

## Problem
Category IDs were being generated randomly (e.g., `cat-722`) instead of sequentially (e.g., `cat-01`, `cat-02`, `cat-03`, `cat-04`).

## Solution
Created a new function `generate_sequential_id()` that looks at existing IDs and generates the next number in sequence.

## Changes Made

### 1. New Function in utils.py

```python
def generate_sequential_id(prefix: str, existing_ids: list) -> str:
    """
    Generate a sequential ID based on existing IDs.
    
    Args:
        prefix: Prefix for the ID (e.g., 'cat-' for categories)
        existing_ids: List of existing IDs to check
        
    Returns:
        A sequential ID string (e.g., 'cat-04' if last is 'cat-03')
    """
    import re
    
    # Extract numbers from existing IDs with the same prefix
    max_num = 0
    pattern = re.compile(rf'^{re.escape(prefix)}(\d+)$')
    
    for existing_id in existing_ids:
        match = pattern.match(existing_id)
        if match:
            num = int(match.group(1))
            if num > max_num:
                max_num = num
    
    # Generate next sequential number
    next_num = max_num + 1
    return f"{prefix}{next_num:02d}"  # Zero-padded to 2 digits
```

### 2. Updated add_category Function

**Main Categories:**
```python
# Auto-generate sequential category ID
categories = utils.get_all_categories()
existing_ids = [cat['id'] for cat in categories]
category_id = utils.generate_sequential_id('cat-', existing_ids)
```

**Subcategories:**
```python
# Auto-generate sequential subcategory ID
subcategories = utils.get_all_subcategories()
existing_ids = [sc['id'] for sc in subcategories]
subcategory_id = utils.generate_sequential_id(f'subcat-{parent_slug}-', existing_ids)
```

### 3. Fixed Existing Data
Updated `categories.json`:
- Changed `cat-722` → `cat-04`
- Changed `order: 1` → `order: 4`

## How It Works

### Sequential ID Logic:
1. Get all existing category IDs: `['cat-01', 'cat-02', 'cat-03', 'cat-04']`
2. Extract the numbers: `[1, 2, 3, 4]`
3. Find the maximum: `4`
4. Add 1: `5`
5. Format with zero-padding: `cat-05`

### Examples:

**Main Categories:**
- Existing: `cat-01`, `cat-02`, `cat-03`, `cat-04`
- Next: `cat-05`
- Then: `cat-06`
- Then: `cat-07`

**Subcategories for Scrunchies (cat-02):**
- Existing: `subcat-scr-01`, `subcat-scr-02`, `subcat-scr-03`
- Next: `subcat-scr-04`

**Subcategories for Bow Clips (cat-03):**
- Existing: `subcat-bow-01`, `subcat-bow-02`
- Next: `subcat-bow-03`

## Current Categories Status

```
cat-01 → Claw clips
cat-02 → Scrunchies
cat-03 → Bow clips
cat-04 → santhosh (test)
cat-05 → (Next category you add)
cat-06 → (After that)
```

## Benefits

✅ **Sequential Order** - IDs follow natural order (01, 02, 03, 04...)
✅ **Zero-Padded** - Two digits for neat formatting (01, not just 1)
✅ **Smart Detection** - Looks at existing IDs and continues the series
✅ **Works with Gaps** - If you delete `cat-03`, next will still be correct
✅ **Per-Parent Series** - Subcategories have separate series per parent

## Testing

1. Go to Categories page
2. Click "Add Category"
3. Add a new category
4. Check the ID in the database - should be `cat-05`
5. Add another - should be `cat-06`

## Notes

- The function uses regex to extract numbers from IDs
- It finds the HIGHEST number, not the last one
- So even if you have `cat-01`, `cat-03`, `cat-05` (skipping 02 and 04), the next will be `cat-06`
- Zero-padded to 2 digits: `cat-01` to `cat-99`
- After `cat-99`, it becomes `cat-100` (3 digits)

## Status
✅ **COMPLETE** - Sequential ID generation is now active!
