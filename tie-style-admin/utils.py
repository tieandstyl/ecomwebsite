"""
Utility functions for handling JSON data files
"""
import json
import os
from datetime import datetime
from typing import Dict, List, Any, Optional

# Path to the parent directory containing the data folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARENT_DIR = os.path.dirname(BASE_DIR)
DATA_DIR = os.path.join(PARENT_DIR, 'data')
ASSETS_DIR = os.path.join(PARENT_DIR, 'assets')
IMAGE_DIR = os.path.join(PARENT_DIR, 'image')

def read_json_file(filename: str) -> Any:
    """
    Read and parse a JSON file from the data directory.
    
    Args:
        filename: Name of the JSON file (e.g., 'products.json')
        
    Returns:
        Parsed JSON data (list or dict)
    """
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"File not found: {filepath}")
        return [] if filename != 'store.json' else {}
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON from {filepath}: {e}")
        return [] if filename != 'store.json' else {}

def write_json_file(filename: str, data: Any) -> bool:
    """
    Write data to a JSON file in the data directory.
    
    Args:
        filename: Name of the JSON file (e.g., 'products.json')
        data: Data to write (list or dict)
        
    Returns:
        True if successful, False otherwise
    """
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error writing to {filepath}: {e}")
        return False

def get_all_products() -> List[Dict]:
    """Get all products from products.json"""
    return read_json_file('products.json')

def get_product_by_id(product_id: str) -> Optional[Dict]:
    """Get a specific product by ID"""
    products = get_all_products()
    for product in products:
        if product.get('id') == product_id:
            return product
    return None

def save_product(product_data: Dict, is_new: bool = True) -> bool:
    """
    Save a product (create or update).
    
    Args:
        product_data: Dictionary containing product information
        is_new: True if creating a new product, False if updating
        
    Returns:
        True if successful, False otherwise
    """
    products = get_all_products()
    
    if is_new:
        # Add timestamps
        product_data['createdAt'] = datetime.utcnow().isoformat() + 'Z'
        product_data['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
        products.append(product_data)
    else:
        # Update existing product
        for i, product in enumerate(products):
            if product.get('id') == product_data.get('id'):
                product_data['updatedAt'] = datetime.utcnow().isoformat() + 'Z'
                # Preserve createdAt
                product_data['createdAt'] = product.get('createdAt')
                products[i] = product_data
                break
    
    return write_json_file('products.json', products)

def delete_product(product_id: str) -> bool:
    """Delete a product by ID"""
    products = get_all_products()
    products = [p for p in products if p.get('id') != product_id]
    return write_json_file('products.json', products)

def get_all_categories() -> List[Dict]:
    """Get all categories from categories.json"""
    return read_json_file('categories.json')

def get_category_by_id(category_id: str) -> Optional[Dict]:
    """Get a specific category by ID"""
    categories = get_all_categories()
    for category in categories:
        if category.get('id') == category_id:
            return category
    return None

def save_category(category_data: Dict, is_new: bool = True) -> bool:
    """Save a category (create or update)"""
    categories = get_all_categories()
    
    if is_new:
        categories.append(category_data)
    else:
        for i, category in enumerate(categories):
            if category.get('id') == category_data.get('id'):
                categories[i] = category_data
                break
    
    return write_json_file('categories.json', categories)

def delete_category(category_id: str) -> bool:
    """Delete a category by ID"""
    categories = get_all_categories()
    categories = [c for c in categories if c.get('id') != category_id]
    return write_json_file('categories.json', categories)

def get_all_subcategories() -> List[Dict]:
    """Get all subcategories from subcategories.json"""
    return read_json_file('subcategories.json')

def get_subcategories_by_parent(parent_id: str) -> List[Dict]:
    """Get all subcategories for a specific parent category"""
    subcategories = get_all_subcategories()
    return [sc for sc in subcategories if sc.get('parentCategoryId') == parent_id]

def save_subcategory(subcategory_data: Dict, is_new: bool = True) -> bool:
    """Save a subcategory (create or update)"""
    subcategories = get_all_subcategories()
    
    if is_new:
        subcategories.append(subcategory_data)
    else:
        for i, subcategory in enumerate(subcategories):
            if subcategory.get('id') == subcategory_data.get('id'):
                subcategories[i] = subcategory_data
                break
    
    return write_json_file('subcategories.json', subcategories)

def delete_subcategory(subcategory_id: str) -> bool:
    """Delete a subcategory by ID"""
    subcategories = get_all_subcategories()
    subcategories = [sc for sc in subcategories if sc.get('id') != subcategory_id]
    return write_json_file('subcategories.json', subcategories)

def get_all_news() -> List[Dict]:
    """Get all news items from news.json"""
    return read_json_file('news.json')

def get_news_by_id(news_id: str) -> Optional[Dict]:
    """Get a specific news item by ID"""
    news_items = get_all_news()
    for item in news_items:
        if item.get('id') == news_id:
            return item
    return None

def save_news(news_data: Dict, is_new: bool = True) -> bool:
    """Save a news item (create or update)"""
    news_items = get_all_news()
    
    if is_new:
        news_items.append(news_data)
    else:
        for i, item in enumerate(news_items):
            if item.get('id') == news_data.get('id'):
                news_items[i] = news_data
                break
    
    return write_json_file('news.json', news_items)

def delete_news(news_id: str) -> bool:
    """Delete a news item by ID"""
    news_items = get_all_news()
    news_items = [n for n in news_items if n.get('id') != news_id]
    return write_json_file('news.json', news_items)

def get_store_info() -> Dict:
    """Get store information from store.json"""
    return read_json_file('store.json')

def save_store_info(store_data: Dict) -> bool:
    """Save store information to store.json"""
    return write_json_file('store.json', store_data)

def generate_id(prefix: str) -> str:
    """
    Generate a unique ID with a given prefix.
    
    Args:
        prefix: Prefix for the ID (e.g., 'prod-scr-' for scrunchie products)
        
    Returns:
        A unique ID string
    """
    import random
    import string
    # Generate a random 3-digit number
    suffix = ''.join(random.choices(string.digits, k=3))
    return f"{prefix}{suffix}"

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

def generate_slug(text: str) -> str:
    """
    Generate a URL-friendly slug from text.
    
    Args:
        text: Text to convert to slug
        
    Returns:
        URL-friendly slug string
    """
    import re
    # Convert to lowercase and replace spaces with hyphens
    slug = text.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug

def ensure_directory_exists(directory: str) -> None:
    """Create a directory if it doesn't exist"""
    if not os.path.exists(directory):
        os.makedirs(directory)

def get_dashboard_stats() -> Dict:
    """Get statistics for the dashboard"""
    products = get_all_products()
    categories = get_all_categories()
    subcategories = get_all_subcategories()
    news_items = get_all_news()
    
    total_stock = sum(p.get('stock', 0) for p in products)
    available_products = len([p for p in products if p.get('available', False)])
    active_news = len([n for n in news_items if n.get('active', False)])
    
    return {
        'total_products': len(products),
        'available_products': available_products,
        'total_categories': len(categories),
        'total_subcategories': len(subcategories),
        'total_stock': total_stock,
        'active_news': active_news
    }

def get_analytics_data() -> Dict:
    """
    Get comprehensive analytics data for the analytics dashboard.
    
    Returns:
        Dictionary containing all analytics metrics
    """
    from datetime import datetime, timedelta
    from collections import defaultdict
    
    products = get_all_products()
    categories = get_all_categories()
    
    # Mock data - In production, this would come from order database
    # For now, we'll calculate based on products and categories
    
    # Calculate total inventory value
    total_inventory_value = sum(p.get('price', 0) * p.get('stock', 0) for p in products)
    total_products_count = sum(p.get('stock', 0) for p in products)
    
    # Category performance
    category_lookup = {cat['id']: cat['name'] for cat in categories}
    category_stats = defaultdict(lambda: {'revenue': 0, 'count': 0})
    
    for product in products:
        cat_ids = product.get('categoryIds', [])
        for cat_id in cat_ids:
            if cat_id in category_lookup:
                value = product.get('price', 0) * product.get('stock', 0)
                category_stats[cat_id]['revenue'] += value
                category_stats[cat_id]['count'] += product.get('stock', 0)
                category_stats[cat_id]['name'] = category_lookup[cat_id]
    
    # Sort categories by revenue
    sorted_categories = sorted(
        [{'name': v['name'], 'revenue': f"{v['revenue']:.2f}", 'percentage': (v['revenue'] / total_inventory_value * 100) if total_inventory_value > 0 else 0}
         for k, v in category_stats.items()],
        key=lambda x: float(x['revenue']),
        reverse=True
    )
    
    # Top products by potential value
    top_products = sorted(products, key=lambda p: p.get('price', 0) * p.get('stock', 0), reverse=True)[:5]
    top_products_data = [
        {
            'title': p.get('title', 'Unknown'),
            'category': category_lookup.get(p.get('categoryIds', [''])[0], 'Uncategorized') if p.get('categoryIds') else 'Uncategorized',
            'revenue': f"{p.get('price', 0) * p.get('stock', 0):.2f}",
            'sales': p.get('stock', 0)
        }
        for p in top_products
    ]
    
    # Inventory alerts
    inventory_alerts = []
    for product in products:
        stock = product.get('stock', 0)
        if stock == 0:
            inventory_alerts.append({
                'product': product.get('title', 'Unknown'),
                'stock': stock,
                'type': 'alert',
                'message': 'Out of stock! Reorder immediately.'
            })
        elif stock <= 10:
            inventory_alerts.append({
                'product': product.get('title', 'Unknown'),
                'stock': stock,
                'type': 'warning',
                'message': 'Low stock! Consider reordering soon.'
            })
    
    # Recent activity (based on updatedAt timestamps)
    recent_items = []
    for product in sorted(products, key=lambda p: p.get('updatedAt', ''), reverse=True)[:5]:
        recent_items.append({
            'type': 'product',
            'icon': '🛍️',
            'title': f"Product Updated: {product.get('title', 'Unknown')}",
            'description': f"Stock: {product.get('stock', 0)} units, Price: ₹{product.get('price', 0)}",
            'time': format_time_ago(product.get('updatedAt', ''))
        })
    
    # Generate revenue chart data (last 30 days)
    today = datetime.now()
    revenue_labels = []
    revenue_data = []
    for i in range(29, -1, -1):
        date = today - timedelta(days=i)
        revenue_labels.append(date.strftime('%b %d'))
        # Mock revenue data - would come from actual orders
        revenue_data.append(round(total_inventory_value / 30 * (0.8 + (i % 10) / 20), 2))
    
    return {
        # Overview Stats
        'total_revenue': f"{total_inventory_value:.2f}",
        'revenue_trend': '↑ 15.3%',
        'total_orders': len(products),  # Mock
        'orders_trend': '↑ 8.7%',
        'total_customers': 156,  # Mock
        'customers_trend': '12',
        'products_sold': total_products_count,
        'avg_order_value': f"{(total_inventory_value / max(len(products), 1)):.2f}",
        
        # Charts Data
        'revenue_chart': {
            'labels': revenue_labels,
            'data': revenue_data
        },
        'source_chart': {
            'labels': ['Direct', 'WhatsApp', 'Instagram', 'Facebook'],
            'data': [45, 30, 15, 10]  # Mock percentages
        },
        'order_status_chart': {
            'labels': ['Pending', 'Processing', 'Completed'],
            'data': [25, 15, 60]  # Mock percentages
        },
        'payment_chart': {
            'labels': ['Pending', 'Confirmed', 'Failed'],
            'data': [20, 75, 5]  # Mock counts
        },
        
        # Lists
        'top_products': top_products_data,
        'categories': sorted_categories,
        'inventory_alerts': inventory_alerts[:5],
        'recent_activity': recent_items,
        
        # Customer Insights
        'repeat_customers': 35,  # Mock percentage
        'customer_lifetime_value': f"{(total_inventory_value / 156):.2f}",  # Mock
    }

def format_time_ago(timestamp_str: str) -> str:
    """Convert ISO timestamp to human-readable 'time ago' format"""
    if not timestamp_str:
        return 'Unknown'
    
    try:
        # Parse ISO format timestamp
        if timestamp_str.endswith('Z'):
            timestamp_str = timestamp_str[:-1]
        
        timestamp = datetime.fromisoformat(timestamp_str)
        now = datetime.utcnow()
        diff = now - timestamp
        
        if diff.days > 30:
            return f"{diff.days // 30} months ago"
        elif diff.days > 0:
            return f"{diff.days} days ago"
        elif diff.seconds > 3600:
            return f"{diff.seconds // 3600} hours ago"
        elif diff.seconds > 60:
            return f"{diff.seconds // 60} minutes ago"
        else:
            return "Just now"
    except:
        return "Recently"

