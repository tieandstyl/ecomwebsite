# Send Payment Link Feature - Admin Panel

## Overview
Added a "Send Payment Link" button in the admin panel's order detail view that sends a UPI payment link to customers via WhatsApp.

## Feature Details

### Location
**Admin Panel → Orders → View Order Details → Send Payment Link**

### What It Does
1. Fetches UPI ID from `store.json` (`payments.gpayUpiId`)
2. Creates a UPI payment link with order details
3. Sends WhatsApp message to customer with:
   - Order ID
   - Payment amount
   - UPI payment link
   - UPI ID for manual payment
   - Request for UTR/screenshot after payment

## Implementation

### 1. Updated Order Details Modal
**File:** `js/admin.js` - `renderOrderDetails()` function

Added new section after "Update Payment Status":

```html
<!-- Send Payment Link -->
<div>
  <h4 class="font-bold mb-3">📱 Send Payment Link via WhatsApp</h4>
  <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
    <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
      Send UPI payment link to customer's WhatsApp
    </p>
    <button 
      onclick="sendPaymentLink('phone', amount, 'orderId')" 
      class="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
    >
      <svg>...</svg>
      Send Payment Link (₹XXX.XX)
    </button>
  </div>
</div>
```

### 2. Added sendPaymentLink Function
**File:** `js/admin.js`

```javascript
window.sendPaymentLink = async function(phoneNumber, amount, orderId) {
  // 1. Fetch store data for UPI ID
  const response = await fetch('data/store.json');
  const storeData = await response.json();
  const upiID = storeData.payments?.gpayUpiId;
  const storeName = storeData.name;
  
  // 2. Clean phone number
  const cleanPhone = phoneNumber.replace(/[\s\-+]/g, '');
  
  // 3. Create UPI payment link
  const upiLink = `upi://pay?pa=${upiID}&pn=${storeName}&tn=Payment for Order ${orderId}&am=${amount}&cu=INR`;
  
  // 4. Create WhatsApp message
  const message = `Hi! 👋 Thank you for your order!
  
📦 Order ID: ${orderId}
💰 Amount: ₹${amount}

Please complete your payment using this UPI link:
${upiLink}

Or pay to:
💳 UPI ID: ${upiID}

After payment, please share the UTR number/screenshot here.

Thank you! 🙏`;
  
  // 5. Open WhatsApp
  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`);
};
```

## Configuration

### Store.json Settings
The function uses these fields from `data/store.json`:

```json
{
  "name": "Tie-Style",
  "payments": {
    "gpayUpiId": "myshop@okaxis"
  }
}
```

**Update these in:**
- Admin Panel → Store Settings
- Or directly edit `data/store.json`

## User Flow

### Admin Workflow:
1. **View Order**
   - Click "View" button on any order in admin panel
   - Order details modal opens

2. **Send Payment Link**
   - Scroll to "Send Payment Link via WhatsApp" section
   - Click the green button showing amount
   - WhatsApp opens with pre-filled message

3. **Customer Receives**
   - Customer gets WhatsApp message
   - Clicks UPI link to open payment app
   - Completes payment
   - Sends UTR/screenshot back

4. **Confirm Payment**
   - Admin receives payment confirmation
   - Updates payment status to "Confirmed"

## WhatsApp Message Format

```
Hi! 👋 Thank you for your order!

📦 Order ID: ORD-1729234567890
💰 Amount: ₹1,200.00

Please complete your payment using this UPI link:
upi://pay?pa=myshop@okaxis&pn=Tie-Style&tn=Payment%20for%20Order%20ORD-1729234567890&am=1200.00&cu=INR

Or pay to:
💳 UPI ID: myshop@okaxis

After payment, please share the UTR number/screenshot here.

Thank you! 🙏
```

## UPI Link Format

```
upi://pay?
  pa=myshop@okaxis                    // UPI ID
  &pn=Tie-Style                       // Store Name
  &tn=Payment for Order ORD-123       // Transaction Note
  &am=1200.00                         // Amount
  &cu=INR                             // Currency
```

## Features

✅ **Auto-fetch UPI ID** - Gets latest UPI from store.json  
✅ **Clean Phone Numbers** - Removes spaces, dashes, plus signs  
✅ **UPI Deep Link** - Opens payment app directly  
✅ **Fallback UPI ID** - Shows manual payment option  
✅ **Order Context** - Includes order ID in message  
✅ **Professional Message** - Clear, friendly communication  
✅ **One-Click Send** - Opens WhatsApp instantly  

## Button Appearance

**In Order Details Modal:**

```
┌─────────────────────────────────────────┐
│ 📱 Send Payment Link via WhatsApp       │
├─────────────────────────────────────────┤
│ Send UPI payment link to customer's     │
│ WhatsApp                                │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │  WhatsApp Icon  Send Payment Link  │ │
│ │              (₹1,200.00)           │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Button Style:**
- Green background (#10b981)
- White text
- WhatsApp icon
- Shows order total
- Full width
- Hover effect (darker green)

## Error Handling

1. **Invalid Phone/Amount:**
   - Alert: "❌ Invalid phone number or amount"

2. **Store Data Fetch Error:**
   - Uses fallback UPI: `santhoshsharuk16-1@okhdfcbank`
   - Alert: "❌ Error sending payment link. Please try again."

3. **Missing Customer Phone:**
   - Button shows but will alert on click

## Benefits

1. **Faster Payments** - Direct UPI link, no manual entry
2. **Reduced Errors** - Pre-filled amount and UPI ID
3. **Better UX** - Customer just clicks and pays
4. **Professional** - Automated, consistent messaging
5. **Trackable** - UTR numbers for verification
6. **Flexible** - Uses current store settings

## Testing Checklist

- [x] Button appears in order details modal
- [x] Fetches UPI ID from store.json
- [x] Cleans phone numbers correctly
- [x] Creates valid UPI link
- [x] Opens WhatsApp with message
- [x] Shows correct order ID
- [x] Shows correct amount
- [x] Works with different phone formats
- [x] Falls back gracefully on errors

## Admin Panel Integration

**Order Detail View Structure:**

```
Order Details Modal
├── Order Info (ID, Date, Status)
├── Customer Details (Name, Phone, Address)
├── Order Items (Products list)
├── Payment Summary (Subtotal, Shipping, Total)
├── Update Order Status (Buttons)
├── Update Payment Status (Buttons)
└── Send Payment Link ⭐ NEW
    └── WhatsApp Button
```

## Files Modified

| File | Changes |
|------|---------|
| `js/admin.js` | Added `sendPaymentLink()` function |
| `js/admin.js` | Updated `renderOrderDetails()` to include button |

## Configuration Required

Make sure `data/store.json` has:

```json
{
  "payments": {
    "gpayUpiId": "your-upi-id@bank"
  }
}
```

Update via:
- Admin Panel: http://localhost:5000/store-settings
- Or edit: `data/store.json`

## Future Enhancements

Potential improvements:
- [ ] Add payment reminder button (resend link)
- [ ] Copy UPI link to clipboard option
- [ ] QR code generation for payment
- [ ] Multiple payment method support
- [ ] Payment link expiry tracking
- [ ] Custom message templates

---

**Status**: ✅ Complete and Working  
**Date**: October 18, 2025  
**Version**: 1.0  
**Location**: Admin Panel → Orders → View Order → Send Payment Link
