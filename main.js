// // scroll magic

// let controller = new ScrollMagic.Controller();

// let scene = new ScrollMagic.Scene({
//   triggerElement: '.arrow',
//   duration: 100,
//   triggerHook: 0.8,
//   // reverse: false
// })
//     // .setClassToggle('.to-slide', 'right-slide')
//     .setVelocity('#img', {opacity: 0}, {duration: 1000, easing:'linear'})
//     .addIndicators({
//       name: 'img fade'
//     })
//     // .setPin ('#home')
//     .addTo(controller);

// burger menu
const burgerBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-menu-container');
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

// change header on scrolling

const header = document.querySelector('header');
const change = header.offsetTop;

function headerChange() {
  if (window.pageYOffset > change) {
    home.classList.add('scroll');
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
    home.classList.remove('scroll');
  }
}

window.onscroll = () => {
  headerChange();
}
