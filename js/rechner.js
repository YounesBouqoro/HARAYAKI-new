(() => {
  const state = {
    items: new Map(),
    history: []
  };

  const cartItems = document.getElementById('cartItems');
  const itemCount = document.getElementById('itemCount');
  const grandTotal = document.getElementById('grandTotal');
  const resetBtn = document.getElementById('resetBtn');
  const checkoutResetBtn = document.getElementById('checkoutResetBtn');
  const undoBtn = document.getElementById('undoBtn');
  const tabs = [...document.querySelectorAll('.tab')];

  const euro = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

  function keyFor(name, price) {
    return `${name}__${Number(price).toFixed(2)}`;
  }

  function addItem(button) {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);
    const icon = button.dataset.icon || '•';
    const key = keyFor(name, price);

    if (!name || Number.isNaN(price)) return;

    const current = state.items.get(key) || { key, name, price, icon, qty: 0 };
    current.qty += 1;
    state.items.set(key, current);
    state.history.push(key);

    flashButton(button);
    render();
  }

  function removeOne(key) {
    const item = state.items.get(key);
    if (!item) return;

    item.qty -= 1;
    if (item.qty <= 0) state.items.delete(key);
    else state.items.set(key, item);
    render();
  }

  function undoLast() {
    const key = state.history.pop();
    if (!key) return;
    removeOne(key);
    render();
  }

  function resetOrder() {
    state.items.clear();
    state.history.length = 0;
    render();
  }

  function render() {
    const items = [...state.items.values()];
    const totalQty = items.reduce((sum, item) => sum + item.qty, 0);
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    itemCount.textContent = `${totalQty} Artikel`;
    grandTotal.textContent = euro.format(total);
    undoBtn.disabled = state.history.length === 0;

    if (!items.length) {
      cartItems.innerHTML = '<p class="empty-state">Produkt antippen – der Gesamtpreis wird automatisch berechnet.</p>';
      return;
    }

    cartItems.innerHTML = items.map(item => `
      <div class="cart-row">
        <div class="cart-row-main">
          <span class="cart-row-icon">${item.icon}</span>
          <div style="min-width:0">
            <div class="cart-row-name">${escapeHtml(item.name)}</div>
            <div class="cart-row-qty">${item.qty} × ${euro.format(item.price)}</div>
          </div>
        </div>
        <div class="cart-row-price">${euro.format(item.price * item.qty)}</div>
        <button class="remove-one" type="button" data-remove-key="${escapeAttr(item.key)}" aria-label="Einen Artikel entfernen">−</button>
      </div>
    `).join('');
  }

  function flashButton(button) {
    button.classList.add('was-added');
    window.setTimeout(() => button.classList.remove('was-added'), 180);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }

  document.addEventListener('click', event => {
    const productButton = event.target.closest('[data-name][data-price]');
    if (productButton) {
      addItem(productButton);
      return;
    }

    const removeButton = event.target.closest('[data-remove-key]');
    if (removeButton) {
      const key = removeButton.dataset.removeKey;
      removeOne(key);
    }
  });

  resetBtn.addEventListener('click', resetOrder);
  checkoutResetBtn.addEventListener('click', resetOrder);
  undoBtn.addEventListener('click', undoLast);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.getElementById(tab.dataset.target);
      if (!target) return;

      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;
    tabs.forEach(tab => {
      tab.classList.toggle('is-active', tab.dataset.target === visible.target.id);
    });
  }, {
    rootMargin: '-70px 0px -55% 0px',
    threshold: [0.1, 0.35, 0.6]
  });

  document.querySelectorAll('.menu-section').forEach(section => sectionObserver.observe(section));

  render();
})();
