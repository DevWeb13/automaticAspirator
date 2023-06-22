import { CreateDOM } from './CreateDOM';
import { Grid } from './Grid';
import { AutomaticAspirator } from './AutomaticAspirator';

const maxGridX = 10;
const maxGridY = 10;

const aspiratorImg = document.createElement('img');
aspiratorImg.src = './assets/aspirator.png';
aspiratorImg.className = 'aspirator';

const dustImg = document.createElement('img');
dustImg.src = './assets/dust.png';
dustImg.className = 'dust';

new CreateDOM(document.getElementById('root'), maxGridX, maxGridY);

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
  submitButton = document.getElementById('submit') as HTMLButtonElement,
  instructionDisplay = document.getElementById(
    'instructionDisplay'
  ) as HTMLParagraphElement;
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

/**
 * The function sets up and executes the automatic movement of an aspirator on a grid based on user
 * input instructions.
 * @param {MouseEvent} e - The parameter `e` is of type `MouseEvent`, which represents a mouse event
 * that occurs when a user interacts with the mouse. It is used in the `start` function as an argument
 * for the event listener callback function.
 */
const start = (e: MouseEvent) => {
  e.preventDefault();
  // desactive button start
  submitButton.disabled = true;
  submitButton.classList.add('disabled');

  // reset instructionDisplay
  instructionDisplay.classList.remove('finished');

  const gridX = parseInt(gridXInput.value);
  const gridY = parseInt(gridYInput.value);
  const positionX = parseInt(positionXInput.value);
  const positionY = parseInt(positionYInput.value);
  const direction = directionInput.value;
  const instructions = instructionsInput.value;

  new Grid(gridContainer, gridX, gridY, dustImg);

  const automaticAspirator = new AutomaticAspirator(
    positionX,
    positionY,
    direction,
    gridX,
    gridY,
    aspiratorImg,
    instructionDisplay
  );

  instructionDisplay.textContent = instructions[0] + positionX + positionY;
  instructionDisplay.textContent = `x: ${positionX}, y: ${positionY}, Direction: ${direction}, instruction: ${instructions[0]}`;

  setTimeout(() => {
    automaticAspirator.place();
    instructions.split('').forEach((instruction, i) => {
      setTimeout(() => {
        const lastMove = i === instructions.length - 1;
        automaticAspirator.move(instruction, lastMove);
        automaticAspirator.place();
      }, (i + 1) * 1000);
    });
  }, 1000);

  // reactive button start
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.classList.remove('disabled');
  }, (instructions.length + 1) * 1000);
};

gridXInput.addEventListener('change', () => {
  positionXInput.max = (parseInt(gridXInput.value) - 1).toString();
});
gridYInput.addEventListener('change', () => {
  positionYInput.max = (parseInt(gridYInput.value) - 1).toString();
});
form.addEventListener('submit', start);
