const darkMode = document.querySelector('.toggle-dark');
const mainContainer = document.querySelector('.main');
const keyboard = document.querySelector('.keyboard');
const keys = document.querySelectorAll('.key');
const countKeys = document.querySelectorAll('.count');
const clearKey = document.querySelector('.clear');
const numberKeys = document.querySelectorAll('.number');
const currCount = document.querySelector('.curr-count');
const resultContainer = document.querySelector('.result');
const light = document.querySelector('.light-mode');
const dark = document.querySelector('.dark-mode');
const body = document.querySelector('body');
let theme = 'light';

// dark mode

const toggleDarkMode = () => {
  (theme === 'light' ? theme = 'dark' : theme ='light');
  mainContainer.classList.toggle('dark');
  keyboard.classList.toggle('dark');
  light.classList.toggle('dark');
  dark.classList.toggle('dark');
  darkMode.classList.toggle('dark');
  body.classList.toggle('dark');
  keys.forEach((key) => {
    if (key.classList.contains('count')) { return }
    else { key.classList.toggle('dark'); }
  });
  countKeys.forEach((key) => key.classList.toggle('dark'));
  localStorage.setItem('theme', theme);
};

darkMode.addEventListener('click', toggleDarkMode);

window.onload = () => {
  if (localStorage.theme === 'dark') { toggleDarkMode() }
  else { return };
}

// press numbers

let countUpdate = ''
const numbersArray = [];

const getNumbers = (evt) => {
  const number = Number(evt.target.id);
  countUpdate += number;
  currCount.innerHTML += number;
  numbersArray.push(number)
  // console.log(numbersArray);
};

numberKeys.forEach((number) => number.addEventListener('click', getNumbers));

// clear key

clearKey.addEventListener('click', () => {
  currCount.innerHTML = '';
  resultContainer.innerHTML = '';
});

// equals

let result = 0;
const equalsBtn = document.querySelector('.equal');

equalsBtn.addEventListener('click', () => {
  const total = eval(currCount.innerHTML);
  resultContainer.innerHTML = total;
  if (resultContainer.innerHTML.length > 12 && resultContainer.innerHTML.length < 20) {
    resultContainer.style.fontSize = '20px';
  } else if (resultContainer.innerHTML.length > 19){
    resultContainer.style.fontSize = '15px';
  } else {
    resultContainer.style.fontSize = '35px';
  }
})

// check last result

// const checkLast = () => {
//   if (resultContainer.innerHTML.length > 0 ) { return }
//   currCount.innerHTML = resultContainer.innerHTML;
// };

// sum

const sumBtn = document.querySelector('.plus');

const sum = (number) => {
  // checkLast();
  currCount.innerHTML += ' + ';
};

sumBtn.addEventListener('click', sum);

// sub

const minusBtn = document.querySelector('.minus');

const sub = (number) => {
  // checkLast();
  currCount.innerHTML += ' - ';
};

minusBtn.addEventListener('click', sub);

// mult

const timesBtn = document.querySelector('.times');

const mult = (number) => {
  // checkLast();
  currCount.innerHTML += ' * ';
};

timesBtn.addEventListener('click', mult);

// div

const divBtn = document.querySelector('.div');

const div = (number) => {
  // checkLast();
  currCount.innerHTML += ' / ';
};

divBtn.addEventListener('click', div);

// dot

const dotBtn = document.querySelector('.dot');

dotBtn.addEventListener('click', () => {
  if (currCount.innerHTML.length === 0) {
    currCount.innerHTML += '0.';
  } else {
    currCount.innerHTML += '.';
  }
});

// undo

const undoBtn = document.querySelector('.undo');
let updated = '';

const updateCurrent = (current) => {
  const update = current.slice(0, -1);
  return update;
};

undoBtn.addEventListener('click', () => {
  const current = currCount.innerHTML.split('');
  updated = current;
  if (current.pop() === ' ') {
    for (let index = 0; index < 2; index++) {
      updated = updateCurrent(updated);
      currCount.innerHTML = updated.join('');
    }
  } else {
    updated.slice(0, -1);
    currCount.innerHTML = updated.join('');
  }
});
