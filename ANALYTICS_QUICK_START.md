# 🚀 Quick Start - Analytics Dashboard

## How to Access

### Step 1: Start Flask Server
```powershell
cd c:\Users\DELL\Downloads\files\tie-style-admin
.\run.bat
```

**Wait for**:
```
 * Running on http://127.0.0.1:5000
```

### Step 2: Open Analytics Page
**Open browser and go to**:
```
http://localhost:5000/analytics
```

**OR** click **"Analytics"** in navigation menu from any page

---

## What You'll See

### ✅ 4 Metric Cards
- Total Revenue (Pink)
- Total Orders (Blue)
- Total Customers (Green)
- Products Sold (Orange)

### ✅ 5 Interactive Charts
1. Revenue Over Time (Line)
2. Sales by Source (Doughnut)
3. Order Status (Pie)
4. Payment Status (Bar)
5. Category Performance (Progress bars)

### ✅ 4 Data Lists
1. Top 5 Selling Products
2. Category Revenue Breakdown
3. Inventory Alerts (Low stock warnings)
4. Recent Activity Timeline

### ✅ 3 Customer Insights
- Repeat Customer Rate
- Average Order Value
- Customer Lifetime Value

### ✅ 2 Controls
- Date Range Selector (Today/Week/Month/Year/All)
- Export Report Button (PDF)

---

## Navigation Path

```
Homepage
   ↓
Admin Panel (http://localhost:5000)
   ↓
Click "Analytics" in top menu
   ↓
Analytics Dashboard
```

---

## First Time Setup

### If Server Not Running:
```powershell
# Navigate to admin folder
cd c:\Users\DELL\Downloads\files\tie-style-admin

# Run the server
.\run.bat
```

### If Port 5000 Busy:
Edit `app.py`, change last line:
```python
app.run(debug=True, port=5001)  # Use 5001 instead
```

Then access: `http://localhost:5001/analytics`

---

## Data Sources

Currently shows data from:
- ✅ `data/products.json` (Product inventory)
- ✅ `data/categories.json` (Category info)
- ✅ Calculated metrics (Revenue, stock levels)

**Future**: Will integrate with Firebase orders for real-time data

---

## Common Actions

### View Today's Performance
1. Click "Analytics"
2. Select "Today" from date dropdown
3. View today's revenue and orders

### Check Low Stock Items
1. Scroll to "Inventory Alerts" section
2. Look for red/orange alerts
3. Click product name to reorder

### Export Monthly Report
1. Select "Last 30 Days"
2. Click "Export Report" button
3. Save as PDF or print

### Find Best Sellers
1. Check "Top Selling Products" list
2. Note top 5 products
3. Plan inventory accordingly

---

## Keyboard Shortcuts

- `Ctrl + P` - Print/Export report
- `F5` - Refresh data
- `Ctrl + R` - Reload page

---

## Troubleshooting

### Page Not Loading?
**Check**:
1. Flask server running? (see terminal)
2. Correct URL? (`http://localhost:5000/analytics`)
3. Any errors in browser console? (F12)

### Charts Not Showing?
**Check**:
1. Internet connection (Chart.js loads from CDN)
2. Browser console for errors (F12)
3. Try hard refresh (Ctrl + Shift + R)

### No Data Showing?
**Check**:
1. `data/products.json` exists and has products
2. `data/categories.json` exists
3. Check terminal for Python errors

### Export Not Working?
**Solution**:
- Click "Export Report"
- Browser print dialog opens
- Select "Save as PDF" destination
- Click "Save"

---

## Next Steps After Viewing

### Daily Routine:
1. ✅ Check Today's Revenue
2. ✅ Review Inventory Alerts
3. ✅ Monitor Payment Status
4. ✅ Check Recent Activity

### Weekly Review:
1. ✅ Set date to "Last 7 Days"
2. ✅ Review Revenue Trend
3. ✅ Identify Top Products
4. ✅ Plan Reorders
5. ✅ Export Weekly Report

### Monthly Analysis:
1. ✅ Set date to "Last 30 Days"
2. ✅ Analyze Revenue Chart
3. ✅ Review Category Mix
4. ✅ Check Customer Metrics
5. ✅ Export Monthly Report

---

## Screenshot Checklist

When viewing analytics, you should see:

✅ Navigation bar with "Analytics" highlighted  
✅ Page header: "📈 Analytics Dashboard"  
✅ Date range selector with current period  
✅ 4 colored gradient metric cards  
✅ Large revenue line chart  
✅ Top products list with rankings  
✅ Category progress bars  
✅ Colorful pie/doughnut charts  
✅ Inventory alerts (red/orange)  
✅ Recent activity timeline  
✅ Customer insights section  
✅ Payment status bar chart  
✅ Export button (top right)  

---

## Files to Check

### If Issues Occur:

**Backend**:
- `tie-style-admin/app.py` (Line 103-106: analytics route)
- `tie-style-admin/utils.py` (Line 291+: get_analytics_data)

**Frontend**:
- `tie-style-admin/templates/analytics.html` (Full page)
- `tie-style-admin/templates/includes/_navbar.html` (Analytics link)

**Data**:
- `data/products.json` (Product data)
- `data/categories.json` (Category data)
- `data/store.json` (Store settings)

---

## Support

### Error Messages?
Check terminal output for Python errors

### Charts Not Rendering?
Ensure Chart.js CDN is accessible:
```
https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js
```

### Data Incorrect?
Verify JSON files in `data/` folder

---

**Ready to Use**: Yes ✅  
**Status**: Complete  
**URL**: http://localhost:5000/analytics  
**Date**: October 18, 2025
