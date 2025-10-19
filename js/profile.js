(function() {
  const PROFILE_KEY = 'whshop_profile_v1';
  const ORDER_HISTORY_KEY = 'whshop_orders_v1';
  let isEditing = false;

  function loadProfile() {
    try {
      const profile = JSON.parse(localStorage.getItem(PROFILE_KEY));
      return profile || {
        name: '',
        email: '',
        phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_state: '',
        shipping_zip: ''
      };
    } catch {
      return {
        name: '',
        email: '',
        phone: '',
        shipping_address: '',
        shipping_city: '',
        shipping_state: '',
        shipping_zip: ''
      };
    }
  }

  function saveProfileData(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }

  function loadOrderHistory() {
    try {
      return JSON.parse(localStorage.getItem(ORDER_HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function renderProfile() {
    const profile = loadProfile();
    
    document.getElementById('name').value = profile.name || '';
    document.getElementById('email').value = profile.email || '';
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('shipping_address').value = profile.shipping_address || '';
    document.getElementById('shipping_city').value = profile.shipping_city || '';
    document.getElementById('shipping_state').value = profile.shipping_state || '';
    document.getElementById('shipping_zip').value = profile.shipping_zip || '';
  }

  function renderOrderHistory() {
    const orders = loadOrderHistory();
    const orderHistoryEl = document.getElementById('orderHistory');
    
    if (orders.length === 0) {
      orderHistoryEl.innerHTML = '<p class="text-gray-500">No orders yet.</p>';
      return;
    }

    orderHistoryEl.innerHTML = orders.map(order => `
      <div class="border border-primary/20 rounded-lg p-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h4 class="font-bold">Order #${order.id}</h4>
            <p class="text-sm text-gray-500">${new Date(order.date).toLocaleDateString('en-IN')}</p>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-semibold ${
            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }">${order.status}</span>
        </div>
        <p class="text-sm">${order.items.length} item(s) - ₹${order.total.toFixed(2)}</p>
      </div>
    `).join('');
  }

  window.toggleEditMode = function() {
    isEditing = !isEditing;
    const inputs = document.querySelectorAll('#profileForm input');
    const actionButtons = document.getElementById('actionButtons');
    const editBtnText = document.getElementById('editBtnText');
    
    if (isEditing) {
      inputs.forEach(input => input.disabled = false);
      actionButtons.style.display = 'flex';
      editBtnText.textContent = 'Cancel';
    } else {
      inputs.forEach(input => input.disabled = true);
      actionButtons.style.display = 'none';
      editBtnText.textContent = 'Edit';
      renderProfile(); // Reset to saved values
    }
  };

  window.cancelEdit = function() {
    window.toggleEditMode();
  };

  window.saveProfile = function(event) {
    event.preventDefault();
    
    const profile = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      shipping_address: document.getElementById('shipping_address').value.trim(),
      shipping_city: document.getElementById('shipping_city').value.trim(),
      shipping_state: document.getElementById('shipping_state').value.trim(),
      shipping_zip: document.getElementById('shipping_zip').value.trim()
    };

    saveProfileData(profile);
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMsg.textContent = 'Profile saved successfully!';
    document.body.appendChild(successMsg);
    
    setTimeout(() => {
      successMsg.remove();
    }, 3000);
    
    window.toggleEditMode();
  };

  // Load store name and logo
  fetch('data/store.json', { cache: 'no-cache' }).then(r => r.json()).then(store => {
    document.getElementById('storeName').textContent = store.name;
    
    // Set logo
    if (store.logo) {
      const logoEl = document.getElementById('storeLogo');
      if (logoEl) {
        logoEl.src = store.logo;
      }
    }
  }).catch(() => {});

  // Initialize
  renderProfile();
  renderOrderHistory();

  // Export loadProfile for use in other pages
  window.getProfile = loadProfile;
})();
