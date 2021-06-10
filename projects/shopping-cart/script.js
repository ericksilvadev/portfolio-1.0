const itemsList = document.querySelector('.items');
const emptyCart = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');
const searchBar = document.querySelector('.search');
const searchBtn = document.querySelector('.search-btn');
let total = 0;
const cartItems = document.querySelector('.cart__items');
let cartIds = [];
let lastSearch = '';

const saveCart = (id) => {
  const index = cartIds.indexOf(id);
  if (index > -1) { cartIds.splice(index, 1); }
  localStorage.setItem('cartStorage', cartIds);
  localStorage.setItem('total', total);
  localStorage.setItem('lastSearch', lastSearch);
};

const saveIds = (id) => {
  cartIds.push(id);
};

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function cartItemClickListener(event) {
  event.target.remove();
  // if (cartIds.length === 1) { localStorage.removeItem('cartStorage'); }
  saveCart(event.target.id);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const subtractTotal = (price) => {
  total -= price;
  totalPrice.innerHTML = formatter.format(total);
};

function createCartItemElement({ id, title, price, thumbnail }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.id = id;
  li.innerHTML = `<img src='${thumbnail}'>SKU: ${id}
  <br>NAME: ${title}
  <br>PRICE: ${formatter.format(price)}`;
  li.addEventListener('click', () => subtractTotal(price));
  li.addEventListener('click', cartItemClickListener);
  total += price;
  totalPrice.innerHTML = formatter.format(total);
  return li;
}

const addProduct = (id) => new Promise((resolve, reject) => {
  fetch(`https://api.mercadolibre.com/items/${id}`)
  .then((result) => result.json())
  .then((resultJson) => resolve(cartItems.appendChild(createCartItemElement(resultJson))))
  .then(() => saveCart())
  .catch((err) => reject(err));
});

const addToCart = (evt) => {
const item = evt.target.parentElement;
console.log(item);
const id = getSkuFromProductItem(item);
saveIds(id);
addProduct(id);
};

const loadCart = () => {
  if (!localStorage || !localStorage.cartStorage) { 
    cartItems.innerHTML = ''; 
    localStorage.total = 0;
    totalPrice.innerHTML = formatter.format(total);
    return;
  }
  const ids = localStorage.getItem('cartStorage').split(',');
  cartIds = ids;
  ids.forEach((product) => addProduct(product));
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

emptyCart.addEventListener('click', () => {
  cartItems.innerHTML = '';
  total = 0;
  totalPrice.innerHTML = formatter.format(total);
  localStorage.clear();
});

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', addToCart);
  }
  return e;
}

function createProductItemElement({ id, title, thumbnail, price }) {
  // itemsList.innerHTML = '';
  const section = document.createElement('section');
  section.className = 'item';
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('img-container');
  const infos = document.createElement('div');
  infos.classList.add('price-container');
  section.appendChild(imgContainer);
  section.appendChild(infos);

  const priceString = formatter.format(price);

  infos.appendChild(createCustomElement('span', 'item__sku', id));
  imgContainer.appendChild(createProductImageElement(thumbnail));
  infos.appendChild(createCustomElement('span', 'price', priceString));
  infos.appendChild(createCustomElement('span', 'item__title', title));
  infos.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const getProduct = (search) => new Promise((resolve, reject) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  fetch(url)
  .then((result) => result.json())
  .then((resultJson) => resolve(resultJson.results))
  .catch((err) => reject(err));
});

const generateProductList = async (search) => {
  const products = await getProduct(search);
  return products.forEach((product) => itemsList.appendChild(createProductItemElement(product)));
};

window.onload = async () => {
  loadCart();
  if (!lastSearch) {
    const products = await getProduct();
    return products.forEach((product) => itemsList.appendChild(createProductItemElement(product)));
  } else {
    generateProductList(localStorage.lastSearch);
  }
};

searchBar.addEventListener('keyup', (evt) => {
  if (evt.key === 'Enter') {
    itemsList.innerHTML = '';
    lastSearch = searchBar.value;
    saveCart();
    generateProductList(searchBar.value);
  }
})

searchBtn.addEventListener('click', async () => {
  itemsList.innerHTML = '';
  lastSearch = searchBar.value;
  saveCart();
  generateProductList(searchBar.value);
  // const search = searchBar.value;
  // const products = await getProduct(searchBar.value)
  // console.log(searchBar.value);
  // return products.forEach((product) => itemsList.appendChild(createProductItemElement(product)));
})
