(function () {
  const els = {
    banner: document.getElementById('bannerImg'),
    logo: document.getElementById('logoImg'),
    storeName: document.getElementById('storeName'),
    brandName: document.getElementById('brandName'),
    storeDesc: document.getElementById('storeDesc'),
    contactPhone: document.getElementById('contactPhone'),
    policies: document.getElementById('policies'),
    cats: document.getElementById('cats'),
    news: document.getElementById('news'),
    grid: document.getElementById('grid'),
    cartFab: document.getElementById('cartFab'),
    cartCount: document.getElementById('cartCount'),
    drawer: document.getElementById('drawer'),
    closeDrawer: document.getElementById('closeDrawer'),
    cartLines: document.getElementById('cartLines'),
    totals: document.getElementById('totals'),
    custName: document.getElementById('custName'),
    custPhone: document.getElementById('custPhone'),
    addr1: document.getElementById('addr1'),
    addr2: document.getElementById('addr2'),
    city: document.getElementById('city'),
    postal: document.getElementById('postal'),
    notes: document.getElementById('notes'),
    paymentInfo: document.getElementById('paymentInfo'),
    qrImg: document.getElementById('qrImg'),
    whatsappTop: document.getElementById('whatsappBtnTop'),
    whatsappCheckout: document.getElementById('whatsappCheckout'),
    hours: document.getElementById('hours'),
    social: document.getElementById('social'),
    clearCart: document.getElementById('clearCart')
  };

  let store = null;
  let categories = [];
  let products = [];
  let filterCat = null;

  const STORAGE_KEY = 'whshop_cart_v1';

  function phoneDigits(e164) {
    return (e164 || '').replace(/[^\d]/g, '');
  }

  function buildWhatsAppURLs(phoneE164, message) {
    const phone = phoneDigits(phoneE164);
    const text = encodeURIComponent(message || '');
    const api = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    const waMe = `https://wa.me/${phone}?text=${text}`;
    return { api, waMe };
  }

  function money(n) {
    return `₹${n}`;
  }

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCartIcon(cart);
    updateCheckoutLink(); // keep link fresh
  }

  function renderCartIcon(cart) {
    const count = cart.reduce((s, it) => s + it.quantity, 0);
    els.cartCount.textContent = String(count);
  }

  function addToCart(sku, title, price) {
    const cart = loadCart();
    const found = cart.find(it => it.sku === sku);
    if (found) found.quantity += 1;
    else cart.push({ sku, title, price, quantity: 1 });
    saveCart(cart);
  }

  function changeQty(sku, delta) {
    const cart = loadCart();
    const item = cart.find(it => it.sku === sku);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      const idx = cart.findIndex(it => it.sku === sku);
      cart.splice(idx, 1);
    }
    saveCart(cart);
    renderDrawer();
  }

  function calcTotals(cart) {
    const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);
    const freeMin = store?.pricing?.freeShippingMin ?? 999;
    const shipFlat = store?.pricing?.shippingFlat ?? 60;
    const shipping = subtotal >= freeMin || subtotal === 0 ? 0 : shipFlat;
    const taxRate = (store?.pricing?.taxRatePct ?? 0) / 100;
    const tax = Math.round(subtotal * taxRate);
    const discount = 0;
    const grandTotal = subtotal + shipping + tax - discount;
    return { subtotal, shipping, tax, discount, grandTotal, currency: 'INR' };
  }

  function buildOrderMessage(order) {
    const lines = [];
    lines.push(`Hi ${store.name}! I'd like to place an order.`);
    lines.push(`Order ID: ${order.id}`);
    lines.push(`Items:`);
    order.items.forEach((it, i) => {
      lines.push(`  ${i + 1}. ${it.title} (SKU: ${it.sku}) x ${it.quantity} = ₹${it.price * it.quantity}`);
    });
    lines.push(`Subtotal: ${money(order.totals.subtotal)}`);
    if (order.totals.shipping) lines.push(`Shipping: ${money(order.totals.shipping)}`);
    if (order.totals.tax) lines.push(`Tax: ${money(order.totals.tax)}`);
    if (order.totals.discount) lines.push(`Discount: -${money(order.totals.discount)}`);
    lines.push(`Grand Total: ${money(order.totals.grandTotal)}`);
    lines.push('');
    lines.push(`Payment method: GPay (manual)`);
    lines.push(`UPI ID: ${store.payments.gpayUpiId}`);
    lines.push(`I will pay now and share UTR + screenshot here.`);
    lines.push('');
    lines.push(`Delivery Address:`);
    lines.push(`${order.customer.name}, ${order.customer.addressLine1}, ${order.customer.city} ${order.customer.postalCode}`);
    if (order.customer.addressLine2) lines.push(order.customer.addressLine2);
    if (order.customer.phoneE164) lines.push(`Phone: ${order.customer.phoneE164}`);
    if (order.notes) lines.push(`Notes: ${order.notes}`);
    return lines.join('\n');
  }

  function requiredFieldsOk(customer, items) {
    if (!items || items.length === 0) return false;
    if (!customer.name) return false;
    if (!customer.phoneE164) return false;
    if (!customer.addressLine1) return false;
    if (!customer.city) return false;
    if (!customer.postalCode) return false;
    if (!store?.contact?.phoneE164) return false;
    return true;
  }

  function getCustomerFromForm() {
    return {
      name: els.custName.value.trim(),
      phoneE164: els.custPhone.value.trim(),
      addressLine1: els.addr1.value.trim(),
      addressLine2: els.addr2.value.trim(),
      city: els.city.value.trim(),
      postalCode: els.postal.value.trim()
    };
  }

  function updateCheckoutLink() {
    const items = loadCart().map(it => ({ sku: it.sku, title: it.title, price: it.price, quantity: it.quantity }));
    const customer = getCustomerFromForm();

    const disabledStyle = { opacity: 0.65, pointerEvents: 'none' };
    const enabledStyle = { opacity: 1, pointerEvents: 'auto' };

    if (!requiredFieldsOk(customer, items)) {
      els.whatsappCheckout.href = '#';
      Object.assign(els.whatsappCheckout.style, disabledStyle);
      els.whatsappCheckout.setAttribute('aria-disabled', 'true');
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const totalsNow = calcTotals(items);
    const order = { id: orderId, items, totals: totalsNow, customer, notes: els.notes.value.trim() };
    const message = buildOrderMessage(order);
    const urls = buildWhatsAppURLs(store.contact.phoneE164, message);

    // Set href so long-press works and standard navigation is possible
    els.whatsappCheckout.href = urls.api;
    els.whatsappCheckout.dataset.fallback = urls.waMe;
    Object.assign(els.whatsappCheckout.style, enabledStyle);
    els.whatsappCheckout.removeAttribute('aria-disabled');
  }

  function openDrawer() { els.drawer.classList.add('open'); renderDrawer(); updateCheckoutLink(); }
  function closeDrawer() { els.drawer.classList.remove('open'); }

  function renderDrawer() {
    const cart = loadCart();
    const totals = calcTotals(cart);
    els.cartLines.innerHTML = '';

    if (cart.length === 0) {
      els.cartLines.innerHTML = '<div class="muted">Your cart is empty.</div>';
    } else {
      cart.forEach(it => {
        const div = document.createElement('div');
        div.className = 'line';
        div.innerHTML = `
          <div>
            <div><strong>${it.title}</strong></div>
            <div class="muted">${it.sku}</div>
          </div>
          <div class="qty">
            <button aria-label="Decrease">-</button>
            <div>${it.quantity}</div>
            <button aria-label="Increase">+</button>
            <div style="width:70px; text-align:right;"><strong>${money(it.price * it.quantity)}</strong></div>
          </div>
        `;
        const [decBtn, , incBtn] = div.querySelectorAll('button');
        decBtn.addEventListener('click', () => changeQty(it.sku, -1));
        incBtn.addEventListener('click', () => changeQty(it.sku, +1));
        els.cartLines.appendChild(div);
      });
    }

    els.totals.innerHTML = `
      <div class="line"><div>Subtotal</div><div><strong>${money(totals.subtotal)}</strong></div></div>
      <div class="line"><div>Shipping</div><div><strong>${money(totals.shipping)}</strong></div></div>
      <div class="line"><div>Tax</div><div><strong>${money(totals.tax)}</strong></div></div>
      <div class="line"><div>Grand Total</div><div><strong>${money(totals.grandTotal)}</strong></div></div>
    `;

    els.paymentInfo.innerHTML = `
      💳 <strong>Payment:</strong> Pay via GPay UPI: <strong>${store.payments.gpayUpiId}</strong><br/>
      📸 Then share UTR + screenshot on WhatsApp.
    `;
    if (store.payments.gpayQrImage) {
      els.qrImg.src = store.payments.gpayQrImage;
      els.qrImg.style.display = 'block';
    } else {
      els.qrImg.style.display = 'none';
    }
  }

  function renderStore() {
    els.banner.src = store.bannerImage || '';
    els.logo.src = store.logo || '';
    els.storeName.textContent = store.name;
    els.brandName.textContent = store.name;
    els.storeDesc.textContent = store.description || '';
    els.contactPhone.textContent = store.contact?.phoneE164 || '';
    els.policies.textContent = store.delivery?.shippingPolicy || '';

    const tz = store.businessHours?.timezone || '';
    const hours = (store.businessHours?.hours || []).map(h => `${h.day}: ${h.open}–${h.close}`).join(' | ');
    els.hours.textContent = (tz && hours) ? `⏰ Hours (${tz}): ${hours}` : '';

    const social = store.social || {};
    const links = Object.entries(social).map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener" style="color:var(--primary); text-decoration:none;">${k}</a>`);
    els.social.innerHTML = links.join(' · ');

    // Top WhatsApp chat link
    const topUrls = buildWhatsAppURLs(store.contact.phoneE164, `Hi ${store.name}, I have a question.`);
    els.whatsappTop.href = topUrls.api;
  }

  function renderCategories() {
    els.cats.innerHTML = '';
    const all = document.createElement('a');
    all.href = '#';
    all.textContent = 'All';
    all.className = filterCat ? '' : 'active';
    all.onclick = (e) => { e.preventDefault(); filterCat = null; renderProducts(); setActiveCat(); };
    els.cats.appendChild(all);

    categories
      .filter(c => c.active)
      .sort((a, b) => (a.order || 999) - (b.order || 999))
      .forEach(cat => {
        const a = document.createElement('a');
        a.href = `#${cat.id}`;
        a.textContent = cat.name;
        a.onclick = (e) => { e.preventDefault(); filterCat = cat.id; renderProducts(); setActiveCat(); };
        els.cats.appendChild(a);
      });

    if (location.hash) {
      const id = location.hash.replace('#', '');
      if (categories.some(c => c.id === id)) filterCat = id;
      setActiveCat();
      renderProducts();
    }
  }

  function setActiveCat() {
    els.cats.querySelectorAll('a').forEach(a => a.classList.remove('active'));
    const target = filterCat ? els.cats.querySelector(`a[href="#${filterCat}"]`) : els.cats.querySelector('a[href="#"]');
    if (target) target.classList.add('active');
  }

  function renderNews() {
    const now = Date.now();
    const actives = (window.__news || []).filter(n => n.active !== false)
      .filter(n => {
        const startOk = n.startsAt ? now >= Date.parse(n.startsAt) : true;
        const endOk = n.endsAt ? now <= Date.parse(n.endsAt) : true;
        return startOk && endOk;
      });
    els.news.innerHTML = '';
    if (actives.length > 0) {
      els.news.style.display = 'grid';
      actives.forEach(n => {
        const div = document.createElement('div');
        div.className = 'item';
        const img = (n.media && n.media[0]) ? `<img src="${n.media[0]}" alt="${n.title}"/>` : '';
        const cta = n.cta ? `<div style="margin-top:8px;"><a class="btn" href="${n.cta.url}" style="display:inline-block; font-size:.85rem; padding:8px 16px;">${n.cta.text}</a></div>` : '';
        div.innerHTML = `${img}<div class="pad"><h3>${n.title}</h3><div class="muted">${n.content || ''}</div>${cta}</div>`;
        els.news.appendChild(div);
      });
    } else {
      els.news.style.display = 'none';
    }
  }

  function renderProducts() {
    els.grid.innerHTML = '';
    let list = products.filter(p => p.available !== false);
    if (filterCat) list = list.filter(p => (p.categoryIds || []).includes(filterCat));
    list.forEach(p => {
      const div = document.createElement('div');
      div.className = 'card';
      const img = (p.images && p.images[0]) ? p.images[0] : '';
      const compare = p.compareAtPrice ? `<span class="compare">${money(p.compareAtPrice)}</span>` : '';
      const stockPill = (p.stock > 0) ? `<span class="pill">✓ In stock</span>` : `<span class="pill out">✗ Sold out</span>`;
      div.innerHTML = `
        <img src="${img}" alt="${p.title}" loading="lazy"/>
        <div class="pad">
          <div>${stockPill}</div>
          <h3>${p.title}</h3>
          <div class="muted">${p.shortDescription || ''}</div>
          <div class="price">${money(p.price)} ${compare}</div>
          <button class="btn" ${p.stock <= 0 ? 'disabled' : ''} style="${p.stock <= 0 ? 'opacity:0.5; cursor:not-allowed;' : ''}">🛒 Add to cart</button>
        </div>
      `;
      const btn = div.querySelector('button');
      btn?.addEventListener('click', () => {
        if (p.stock > 0) addToCart(p.sku, p.title, p.price);
      });
      els.grid.appendChild(div);
    });
  }

  async function fetchJson(path) {
    const v = store?.catalogVersion ? `?v=${encodeURIComponent(store.catalogVersion)}` : '';
    const res = await fetch(`${path}${v}`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return res.json();
  }

  function attachInputListeners() {
    ['input', 'change'].forEach(evt => {
      els.custName.addEventListener(evt, updateCheckoutLink);
      els.custPhone.addEventListener(evt, updateCheckoutLink);
      els.addr1.addEventListener(evt, updateCheckoutLink);
      els.addr2.addEventListener(evt, updateCheckoutLink);
      els.city.addEventListener(evt, updateCheckoutLink);
      els.postal.addEventListener(evt, updateCheckoutLink);
      els.notes.addEventListener(evt, updateCheckoutLink);
    });

    // Robust open: if href is valid, try api link, then fallback
    els.whatsappCheckout.addEventListener('click', (e) => {
      const href = els.whatsappCheckout.getAttribute('href') || '#';
      if (href === '#') {
        e.preventDefault();
        alert('Please add items to cart and fill the required fields.');
        return;
      }
      // Some browsers block navigation when href changes late; ensure explicit open
      // Let the default proceed, but also try a programmatic open (one will succeed)
      try { window.open(href, '_blank'); } catch {}
      const fb = els.whatsappCheckout.dataset.fallback;
      // Schedule fallback open shortly after, only if current tab remains
      setTimeout(() => {
        try {
          if (fb) window.open(fb, '_blank');
        } catch {}
      }, 300);
      // Clear cart a bit later so user can still copy details if needed
      setTimeout(() => {
        saveCart([]);
        renderDrawer();
      }, 1200);
    });

    els.clearCart.addEventListener('click', () => {
      saveCart([]); renderDrawer(); updateCheckoutLink();
    });
  }

  async function boot() {
    try {
      // Register service worker for PWA
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
          .then(reg => console.log('Service Worker registered'))
          .catch(err => console.log('Service Worker registration failed', err));
      }

      store = await (await fetch('data/store.json', { cache: 'no-cache' })).json();
      renderStore();

      const [cats, prods, news] = await Promise.all([
        fetchJson('data/categories.json'),
        fetchJson('data/products.json'),
        fetchJson('data/news.json')
      ]);
      categories = cats;
      products = prods;
      window.__news = news;

      renderCategories();
      renderNews();
      renderProducts();

      renderCartIcon(loadCart());

      // Events
      els.cartFab.addEventListener('click', openDrawer);
      els.closeDrawer.addEventListener('click', closeDrawer);

      attachInputListeners();
      updateCheckoutLink(); // initialize
    } catch (e) {
      console.error(e);
      alert('Failed to load the store. Please try again later.');
    }
  }

  boot();
})();