import CreateDOM from './CreateDOM';
import Grid from './Grid';

const createDOM = new CreateDOM(document.getElementById('app'));
console.log(createDOM);

const form = document.getElementById('form') as HTMLFormElement,
  gridXInput = document.getElementById('gridX') as HTMLInputElement,
  gridYInput = document.getElementById('gridY') as HTMLInputElement,
  positionXInput = document.getElementById('positionX') as HTMLInputElement,
  positionYInput = document.getElementById('positionY') as HTMLInputElement,
  directionInput = document.getElementById('direction') as HTMLInputElement,
  gridContainer = document.getElementById('gridContainer'),
  instructionsInput = document.getElementById(
    'instructions'
  ) as HTMLInputElement,
  submitButton = document.getElementById('submit') as HTMLButtonElement;

console.log(
  gridXInput,
  gridYInput,
  positionXInput,
  positionYInput,
  directionInput,
  gridContainer,
  instructionsInput,
  submitButton
);

const start = (e: MouseEvent) => {
  e.preventDefault();
  const gridX = parseInt(gridXInput.value);
  const gridY = parseInt(gridYInput.value);
  const grid = new Grid(gridContainer, gridX, gridY);
};

form.addEventListener('submit', start);
