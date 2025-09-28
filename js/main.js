const cartState = [];

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(value);
};

const updateCartCount = () => {
  const countElement = document.querySelector('[data-cart-count]');
  if (!countElement) return;

  const itemsCount = cartState.reduce((acc, item) => acc + item.quantity, 0);
  countElement.textContent = itemsCount;

  if (itemsCount > 0) {
    countElement.dataset.hasItems = 'true';
  } else {
    delete countElement.dataset.hasItems;
  }
};

const renderCart = () => {
  const itemsContainer = document.querySelector('[data-cart-items]');
  const emptyMessage = document.querySelector('[data-cart-empty]');
  const summary = document.querySelector('[data-cart-summary]');
  const totalElement = document.querySelector('[data-cart-total]');

  if (!itemsContainer || !emptyMessage || !summary || !totalElement) {
    return;
  }

  itemsContainer.innerHTML = '';

  if (cartState.length === 0) {
    emptyMessage.hidden = false;
    summary.hidden = true;
    totalElement.textContent = formatCurrency(0);
    updateCartCount();
    return;
  }

  emptyMessage.hidden = true;
  summary.hidden = false;

  let total = 0;

  cartState.forEach((item) => {
    total += item.price * item.quantity;

    const listItem = document.createElement('li');
    listItem.className = 'cart-item';

    const nameElement = document.createElement('span');
    nameElement.className = 'cart-item__name';
    nameElement.textContent = item.name;

    const quantityElement = document.createElement('span');
    quantityElement.className = 'cart-item__quantity';
    quantityElement.textContent = `x${item.quantity}`;

    const priceElement = document.createElement('span');
    priceElement.className = 'cart-item__price';
    priceElement.textContent = formatCurrency(item.price * item.quantity);

    const removeButton = document.createElement('button');
    removeButton.className = 'cart-item__remove';
    removeButton.type = 'button';
    removeButton.textContent = 'Quitar';
    removeButton.addEventListener('click', () => {
      removeFromCart(item.id);
    });

    listItem.append(nameElement, quantityElement, priceElement, removeButton);
    itemsContainer.append(listItem);
  });

  totalElement.textContent = formatCurrency(total);
  updateCartCount();
};

const addToCart = ({ id, name, price }) => {
  if (!id || !name || Number.isNaN(price)) return;

  const existingItem = cartState.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartState.push({ id, name, price, quantity: 1 });
  }

  renderCart();
};

const removeFromCart = (id) => {
  const itemIndex = cartState.findIndex((item) => item.id === id);
  if (itemIndex === -1) return;

  cartState.splice(itemIndex, 1);
  renderCart();
};

const attachCartHandlers = () => {
  const toggleButton = document.querySelector('[data-cart-toggle]');
  const cartPanel = document.querySelector('#cart-panel');
  const widget = document.querySelector('[data-cart-widget]');

  if (!toggleButton || !cartPanel || !widget) return;

  toggleButton.addEventListener('click', () => {
    const isHidden = cartPanel.hasAttribute('hidden');
    if (isHidden) {
      cartPanel.removeAttribute('hidden');
      toggleButton.setAttribute('aria-expanded', 'true');
    } else {
      cartPanel.setAttribute('hidden', '');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', (event) => {
    if (!widget.contains(event.target)) {
      cartPanel.setAttribute('hidden', '');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      cartPanel.setAttribute('hidden', '');
      toggleButton.setAttribute('aria-expanded', 'false');
    }
  });
};

const attachProductButtons = () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const { productId, productName, productPrice } = button.dataset;
      const price = Number(productPrice);
      addToCart({ id: productId, name: productName, price });
    });
  });
};

attachCartHandlers();
attachProductButtons();
renderCart();
