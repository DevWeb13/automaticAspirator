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

class Grid {
  constructor(
    private container: HTMLElement,
    private x: number,
    private y: number
  ) {
    this.init();
    this.display();
  }

  init() {
    this.container.innerHTML = '';
    for (let i = 0; i < this.x; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let j = this.y - 1; j >= 0; j--) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = 'x:' + i.toString() + ' ' + 'y:' + j.toString();
        row.appendChild(cell);
      }
      this.container.appendChild(row);
    }
  }

  reset() {
    this.container.innerHTML = '';
  }

  display() {
    return this.container;
  }
}

const start = (e) => {
  e.preventDefault();
  const gridX = parseInt(gridXInput.value);
  const gridY = parseInt(gridYInput.value);
  new Grid(gridContainer, gridX, gridY);
};

form.addEventListener('submit', start);
