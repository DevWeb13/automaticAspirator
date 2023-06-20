export default class CreateDOM {
  constructor(private DOMtarget: HTMLElement) {
    this.render();
  }

  render() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Automatic aspirator';
    this.DOMtarget.appendChild(h1);
    const instructions = document.createElement('p');
    instructions.textContent = `This is a simple automatic aspirator that can be controlled by a set of
    instructions. The aspirator is placed on a grid and can be moved forward,
    turned left or right. The aspirator can't go outside the grid. The grid is
    rectangular and can be of any size. The aspirator's position is
    represented by a combination of X and Y coordinates and a letter
    representing the direction it is facing. The grid is divided up into a
    matrix to simplify navigation. An example position might be 0, 0, N, which
    means the aspirator is in the bottom left corner and facing North. In
    order to control the aspirator, we send a simple string of letters. The
    possible letters are 'D', 'G' and 'A'. 'D' and 'G' make the aspirator spin
    90 degrees right or left respectively, without moving from its current
    spot. 'A' means move forward one space, and maintain the same direction.
    Assume that the square directly North from (X, Y) is (X, Y+1). If the
    position after the movement is outside the grid, the aspirator will not
    move, retain its orientation and process the next command.`;
    this.DOMtarget.appendChild(instructions);
    const form = document.createElement('form');
    form.id = 'form';
    this.DOMtarget.appendChild(form);
    const gridXLabel = this.createLabel('Grid dimensions (X) :', 'gridX');
    form.appendChild(gridXLabel);
    const gridXInput = this.createInput(
      'number',
      'gridX',
      'gridX',
      '0',
      '9',
      true,
      '9'
    );
    form.appendChild(gridXInput);
    const gridYLabel = this.createLabel('Grid dimensions (Y) :', 'gridY');
    form.appendChild(gridYLabel);
    const gridYInput = this.createInput(
      'number',
      'gridY',
      'gridY',
      '0',
      '9',
      true,
      '9'
    );
    form.appendChild(gridYInput);
    const positionXLabel = this.createLabel('Position (X) :', 'positionX');
    form.appendChild(positionXLabel);
    const positionXInput = this.createInput(
      'number',
      'positionX',
      'positionX',
      '0',
      '9',
      true,
      '0'
    );
    form.appendChild(positionXInput);
    const positionYLabel = this.createLabel('Position (Y) :', 'positionY');
    form.appendChild(positionYLabel);
    const positionYInput = this.createInput(
      'number',
      'positionY',
      'positionY',
      '0',
      '9',
      true,
      '0'
    );
    form.appendChild(positionYInput);
    const directionLabel = this.createLabel('Initial direction :', 'direction');
    form.appendChild(directionLabel);
    const directionSelect = document.createElement('select');
    directionSelect.id = 'direction';
    directionSelect.name = 'direction';
    const directionOptions = ['N', 'E', 'S', 'W'];
    directionOptions.forEach((option) => {
      const directionOption = document.createElement('option');
      directionOption.value = option;
      directionOption.textContent = option;
      directionSelect.appendChild(directionOption);
    });
    form.appendChild(directionSelect);
    const instructionsLabel = this.createLabel(
      'Instructions :',
      'instructions'
    );
    form.appendChild(instructionsLabel);
    const instructionsInput = this.createInput(
      'text',
      'instructions',
      'instructions',
      '',
      '',
      true,
      'DADADADAA'
    );
    form.appendChild(instructionsInput);
    const submitButton = document.createElement('button');
    submitButton.id = 'submit';
    submitButton.type = 'submit';
    submitButton.textContent = 'Start';
    form.appendChild(submitButton);
    const gridContainer = document.createElement('div');
    gridContainer.id = 'gridContainer';
    gridContainer.className = 'grid';
    this.DOMtarget.appendChild(gridContainer);
  }

  createLabel(labelText: string, labelFor: string) {
    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = labelFor;
    return label;
  }

  createInput(
    inputType: string,
    inputId: string,
    inputName: string,
    inputMin: string,
    inputMax: string,
    inputRequired: boolean,
    inputValue: string
  ) {
    const input = document.createElement('input');
    input.type = inputType;
    input.id = inputId;
    input.name = inputName;
    input.min = inputMin;
    input.max = inputMax;
    input.required = inputRequired;
    input.value = inputValue;
    return input;
  }
}
