# 📈 Analytics Dashboard - Complete Guide

## Overview

The **Analytics Dashboard** is a comprehensive business intelligence tool that provides deep insights into your Tie-Style e-commerce store's performance, inventory, customer behavior, and sales trends.

---

## 📍 Location

**URL**: `http://localhost:5000/analytics`  
**Navigation**: Admin Panel → **Analytics** (in top navigation bar)

---

## 🎯 Features

### 1. **Key Performance Indicators (KPIs)**

Four main metric cards at the top:

#### 💰 Total Revenue
- Shows total revenue from all confirmed payments
- Displays trend comparison with previous period
- **Purple gradient** background
- Example: `₹12,500.00` with `↑ 15.3% vs last period`

#### 📦 Total Orders
- Count of all orders in selected time period
- Shows growth trend
- **Blue gradient** background
- Example: `156 orders` with `↑ 8.7% vs last period`

#### 👥 Total Customers
- Unique customer count
- Shows new customers added
- **Green gradient** background
- Example: `156 customers` with `12 new this period`

#### 🛍️ Products Sold
- Total quantity of products sold
- Shows average order value
- **Pink gradient** background
- Example: `450 units` with `₹285.50 avg order value`

---

### 2. **Revenue Over Time Chart**

**Type**: Line Chart (Area fill)  
**Purpose**: Visualize revenue trends over selected period  
**Features**:
- 30-day revenue trend by default
- Smooth curve visualization
- Purple gradient fill
- Y-axis shows currency (₹)
- Responsive and interactive

**Data Points**: Daily revenue for last 30 days

---

### 3. **Top Selling Products**

**Format**: Ranked list with performance metrics  
**Shows Top 5 Products**:

Each item displays:
- **Rank Badge**: #1, #2, #3, etc. (purple circle)
- **Product Name**: e.g., "Printed Scrunchie"
- **Category**: e.g., "Scrunchies"
- **Revenue**: Total earnings from product
- **Sales Count**: Number of units sold

**Example**:
```
#1 Printed Scrunchie
   Scrunchies
   ₹9,600.00
   120 sales
```

**Sorted By**: Revenue (highest to lowest)

---

### 4. **Category Performance**

**Format**: Progress bars with revenue  
**Shows All Categories**:

Each category displays:
- **Category Name**: e.g., "Scrunchies"
- **Revenue**: Total earnings
- **Visual Bar**: Percentage of total revenue
- **Purple gradient** progress bar

**Example**:
```
Scrunchies                    ₹15,000.00
[████████████████░░░░░] 60%
```

**Sorted By**: Revenue (highest to lowest)

---

### 5. **Sales by Source**

**Type**: Doughnut Chart  
**Purpose**: Show where orders come from  
**Sources**:
- **Direct**: Website visits
- **WhatsApp**: Orders via WhatsApp
- **Instagram**: Social media sales
- **Facebook**: Social media sales

**Colors**: Purple, pink, blue gradients  
**Interactive**: Hover to see percentages

---

### 6. **Order Status Distribution**

**Type**: Pie Chart  
**Purpose**: Visualize order fulfillment status  
**Statuses**:
- 🟡 **Pending**: Orders awaiting processing
- 🔵 **Processing**: Orders being prepared
- 🟢 **Completed**: Fulfilled orders

**Interactive**: Click segments for details

---

### 7. **Inventory Alerts**

**Format**: Alert cards with color coding  
**Alert Types**:

#### 🔴 Critical (Red)
- **Stock**: 0 units
- **Message**: "Out of stock! Reorder immediately."
- **Background**: Light red

#### 🟡 Warning (Orange)
- **Stock**: 1-10 units
- **Message**: "Low stock! Consider reordering soon."
- **Background**: Light orange

#### 🟢 OK (Green)
- **Stock**: >10 units
- **Message**: "Stock levels healthy"
- **Background**: Light green

**Example**:
```
⚠️ Skinny Scrunchie
   Current Stock: 5 units - Low stock! Consider reordering soon.
```

---

### 8. **Recent Activity**

**Format**: Timeline list  
**Shows Last 5 Activities**:

Each activity includes:
- **Icon**: 🛍️ (Products), 📁 (Categories), 📰 (News)
- **Title**: Action description
- **Details**: Relevant information
- **Timestamp**: "2 hours ago", "1 day ago"

**Example**:
```
🛍️ Product Updated: Printed Scrunchie
    Stock: 120 units, Price: ₹80
    2 hours ago
```

---

### 9. **Customer Insights**

**Metrics**:

#### Repeat Customers
- **Percentage** of customers who ordered multiple times
- **Progress bar** visualization
- **Purple gradient** bar

#### Average Order Value
- **Average** amount spent per order
- **Currency** format: ₹XXX.XX
- **Green** color

#### Customer Lifetime Value
- **Average** total revenue per customer
- **Currency** format: ₹XXX.XX
- **Orange** color

**Example**:
```
Repeat Customers        35%
[███████░░░░░░░░░░░]

Average Order Value     ₹285.50

Customer Lifetime Value ₹1,250.00
```

---

### 10. **Payment Status**

**Type**: Bar Chart  
**Purpose**: Show payment collection status  
**Categories**:
- 🟡 **Pending**: Awaiting payment
- 🟢 **Confirmed**: Payment received
- 🔴 **Failed**: Payment failed/declined

**Y-Axis**: Number of orders  
**Interactive**: Hover for exact counts

---

## 🎛️ Controls

### Date Range Selector

**Location**: Top right of page  
**Options**:
- **Today**: Current day only
- **Last 7 Days**: Past week
- **Last 30 Days**: Past month (default)
- **Last Year**: Annual view
- **All Time**: Complete history

**How to Use**:
1. Click dropdown menu
2. Select desired time period
3. Page automatically reloads with new data

---

### Export Report Button

**Location**: Top right corner  
**Icon**: 📥 Download  
**Function**: Export analytics as PDF  
**How to Use**:
1. Click "Export Report"
2. Browser print dialog opens
3. Save as PDF or print

---

## 📊 Data Calculations

### Revenue Calculation
```python
Total Revenue = Sum of all CONFIRMED payments
(Excludes pending and failed payments)
```

### Average Order Value
```python
AOV = Total Revenue ÷ Number of Orders
```

### Customer Lifetime Value
```python
CLV = Total Revenue ÷ Number of Customers
```

### Repeat Customer Rate
```python
Repeat Rate = (Customers with >1 order ÷ Total Customers) × 100
```

### Category Performance
```python
Category % = (Category Revenue ÷ Total Revenue) × 100
```

---

## 🎨 Visual Design

### Color Scheme

**Gradient Cards**:
- Revenue: Pink to Red (`#f093fb → #f5576c`)
- Orders: Blue to Cyan (`#4facfe → #00f2fe`)
- Customers: Green to Cyan (`#43e97b → #38f9d7`)
- Products: Pink to Yellow (`#fa709a → #fee140`)

**Charts**:
- Primary: Purple (`#667eea`)
- Secondary: Pink (`#764ba2`)
- Success: Green (`#10b981`)
- Warning: Orange (`#f59e0b`)
- Danger: Red (`#ef4444`)

**Backgrounds**:
- White cards with subtle shadows
- Light gray placeholders (`#f9fafb`)

---

## 📱 Responsive Design

### Desktop (>1200px)
- 4-column KPI grid
- 2-column chart grid
- Full-width revenue chart

### Tablet (768px - 1200px)
- 2-column KPI grid
- 1-2 column chart grid
- Responsive charts

### Mobile (<768px)
- Single column layout
- Stacked cards
- Touch-friendly charts

---

## 🔄 Real-Time Updates

### Auto-Refresh
Currently manual refresh. To enable auto-refresh:

```javascript
// Add to analytics.html
setInterval(() => {
    location.reload();
}, 300000); // Refresh every 5 minutes
```

---

## 📋 Use Cases

### Daily Operations
1. **Morning Check**: View today's revenue and orders
2. **Inventory Management**: Check stock alerts
3. **Customer Service**: Monitor order status
4. **Payment Follow-up**: Check pending payments

### Weekly Review
1. **Performance**: Compare week-over-week growth
2. **Top Products**: Identify best sellers
3. **Category Trends**: Analyze category performance
4. **Stock Planning**: Reorder low stock items

### Monthly Analysis
1. **Revenue Goals**: Track monthly targets
2. **Customer Growth**: Analyze customer acquisition
3. **Product Mix**: Optimize product catalog
4. **Marketing ROI**: Evaluate campaign effectiveness

### Business Planning
1. **Trend Analysis**: Identify seasonal patterns
2. **Inventory Planning**: Forecast demand
3. **Pricing Strategy**: Analyze price performance
4. **Customer Retention**: Track repeat purchases

---

## 🛠️ Customization

### Add Custom Metrics

Edit `utils.py` → `get_analytics_data()`:

```python
# Add new metric
'custom_metric': calculate_custom_metric(),
```

Edit `analytics.html`:

```html
<div class="stat-box custom">
    <p>Custom Metric</p>
    <h3>{{ analytics.custom_metric }}</h3>
</div>
```

### Add New Chart

1. **Add data in `utils.py`**:
```python
'new_chart': {
    'labels': ['A', 'B', 'C'],
    'data': [10, 20, 30]
}
```

2. **Add canvas in `analytics.html`**:
```html
<canvas id="newChart"></canvas>
```

3. **Add Chart.js code**:
```javascript
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: {{ analytics.new_chart.labels | tojson }},
        datasets: [...]
    }
});
```

---

## 🔧 Integration with Firebase Orders

To use **real order data** instead of mock data:

### Update `utils.py`:

```python
def get_analytics_data():
    # Import Firebase orders
    from firebase_admin import firestore
    db = firestore.client()
    
    # Get orders
    orders = db.collection('orders').get()
    
    # Calculate real revenue
    total_revenue = sum(
        order.to_dict().get('totals', {}).get('total', 0)
        for order in orders
        if order.to_dict().get('paymentStatus') == 'confirmed'
    )
    
    # ... rest of calculations
```

---

## 📖 Technical Details

### Files Modified
1. ✅ `templates/analytics.html` - Analytics page template
2. ✅ `utils.py` - Analytics data calculation function
3. ✅ `app.py` - Analytics route handler
4. ✅ `templates/includes/_navbar.html` - Navigation menu

### Dependencies
- **Chart.js 4.4.0**: For charts and graphs
- **Flask**: Backend framework
- **Jinja2**: Template engine

### API Endpoints
- `GET /analytics` - Main analytics page
- `GET /analytics?range=week` - Filter by date range

---

## 🎯 Key Benefits

✅ **Comprehensive Insights**: All metrics in one place  
✅ **Visual Analytics**: Easy-to-understand charts  
✅ **Real-Time Alerts**: Instant inventory warnings  
✅ **Performance Tracking**: Monitor growth trends  
✅ **Data-Driven Decisions**: Make informed choices  
✅ **Export Capability**: Share reports with team  
✅ **Responsive Design**: Works on all devices  
✅ **Professional Look**: Modern, clean interface  

---

## 🚀 Next Steps

After viewing analytics:

1. **Low Stock?** → Go to Products → Reorder
2. **Payment Pending?** → Go to Orders → Send payment link
3. **Top Seller?** → Add more variants
4. **Slow Category?** → Review pricing/marketing
5. **High Revenue Day?** → Analyze what worked

---

**Status**: ✅ Complete and Ready to Use  
**Access**: http://localhost:5000/analytics  
**Updated**: October 18, 2025
