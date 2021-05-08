const generateBtn = document.getElementById('generate-board');
const inputSize = document.getElementById('board-size');
const pixels = document.getElementsByClassName('pixel');
const palette = document.getElementById('color-palette');
const color = document.getElementsByClassName('color');
const pixelBoard = document.querySelector('#pixel-board');
const clearBtn = document.getElementsByTagName('button')[1];
// const colorBtn = document.getElementById('color-btn')[0];
let boardSize = 10;

// pintar pixels

function paintPixels(event) {
  const evt = event.target;
  evt.style.backgroundColor = document.querySelector('.selected').style.backgroundColor;
}

// adicionar o pixel board

function pixelsColumn(pixelsNumber) {
  pixelBoard.innerHTML = '';
  const pixelBoardWidth = pixelsNumber * 27;
  const px = 'px';
  pixelBoard.style.width = pixelBoardWidth + px;
  for (let index = 0; index < pixelsNumber * pixelsNumber; index += 1) {
    const createPixel = document.createElement('div');
    createPixel.classList.add('pixel');
    pixelBoard.appendChild(createPixel);
    createPixel.addEventListener('click', paintPixels);
  }
}

pixelsColumn(boardSize);

// gerar nova pixel board pelo botao VQV

function changeBoard() {
  if (inputSize.value.length === 0) {
    alert('Board inválido!');
  } else if (inputSize.value < 5) {
    pixelsColumn(5);
  } else if (inputSize.value > 50) {
    pixelsColumn(50);
  } else {
    boardSize = inputSize.value;
    pixelsColumn(boardSize);
  }
}

generateBtn.addEventListener('click', changeBoard);

// adidionar a seleção de cores

palette.addEventListener('click', (event) => {
  for (let index = 0; index < color.length; index += 1) {
    color[index].classList.remove('selected');
    event.target.classList.add('selected');
  }
});

// limpar todo o quadro

clearBtn.addEventListener('click', () => {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'rgb(243, 243, 243)';
  }
});

// gerar cores aleatóriamente;

function generateColors() {
  const letters = '0123456789ABCDEF';
  for (let index = 1; index < color.length; index += 1) {
    let colorGenerate = '#';
    for (let index2 = 0; index2 < 6; index2 += 1) {
      colorGenerate += letters[Math.floor(Math.random() * 16)];
    }
    color[index].style.backgroundColor = colorGenerate;
  }
  return letters;
}

window.onload = generateColors();

// colorBtn.addEventListener('click', generateColors);