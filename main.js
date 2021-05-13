// burger menu
const burgerBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-container');
const navMenu = document.querySelector('.nav-menu');
const home = document.querySelector('.home');
let active = false;

burgerBtn.addEventListener('click', () => {
  if (!active) {
    home.classList.add('active');
    nav.classList.add('display');
    navMenu.classList.add('display');
    burgerBtn.classList.add('active');
    active = true;
  } else {
    home.classList.remove('active');
    burgerBtn.classList.remove('active');
    navMenu.classList.remove('display');
    nav.classList.remove('display');
    active = false;
  }
});