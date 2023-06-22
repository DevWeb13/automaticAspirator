export class CreateDOM {
  constructor(
    private DOMtarget: HTMLElement,
    private maxGridX: number,
    private maxGridY: number
  ) {
    this.render();
  }

  render(): void {
    this.h1();
    this.instructionsUL();
    this.form();
    this.instructionDisplay();
    this.gridContainer();
  }

  private instructionDisplay(): void {
    const instructionDisplay = document.createElement('p');
    instructionDisplay.id = 'instructionDisplay';
    this.DOMtarget.appendChild(instructionDisplay);
  }

  private gridContainer(): void {
    const gridContainer = document.createElement('div');
    gridContainer.id = 'gridContainer';
    gridContainer.className = 'grid';
    this.DOMtarget.appendChild(gridContainer);
  }

  private form(): void {
    const form = document.createElement('form');
    form.id = 'form';
    this.DOMtarget.appendChild(form);
    const gridXLabel = this.createLabel('Grid dimensions (X) :', 'gridX');
    form.appendChild(gridXLabel);
    const gridXInput = this.createInput(
      'number',
      'gridX',
      'gridX',
      '1',
      this.maxGridX.toString(),
      true,
      this.maxGridX.toString()
    );
    form.appendChild(gridXInput);
    const gridYLabel = this.createLabel('Grid dimensions (Y) :', 'gridY');
    form.appendChild(gridYLabel);
    const gridYInput = this.createInput(
      'number',
      'gridY',
      'gridY',
      '1',
      this.maxGridY.toString(),
      true,
      this.maxGridY.toString()
    );
    form.appendChild(gridYInput);
    const positionXLabel = this.createLabel('Position (X) :', 'positionX');
    form.appendChild(positionXLabel);
    console.log(typeof gridXInput.value);

    const positionXInput = this.createInput(
      'number',
      'positionX',
      'positionX',
      '0',
      (parseInt(gridXInput.value) - 1).toString(),
      true,
      '5'
    );
    form.appendChild(positionXInput);
    const positionYLabel = this.createLabel('Position (Y) :', 'positionY');
    form.appendChild(positionYLabel);
    const positionYInput = this.createInput(
      'number',
      'positionY',
      'positionY',
      '0',
      (parseInt(gridYInput.value) - 1).toString(),
      true,
      '5'
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
    submitButton.classList.add('submit');
    submitButton.type = 'submit';
    submitButton.textContent = 'Start';
    form.appendChild(submitButton);
  }

  private instructionsUL(): void {
    const instructions = document.createElement('ul');
    const instructionsHTML = `
    <li>This is a simple automatic aspirator that can be controlled by a set of instructions.</li>
    <li>The aspirator is placed on a grid and can be moved forward, turned left or right.</li>
    <li>The aspirator can't go outside the grid.</li> 
    <li>The grid is rectangular and max size is 10.</li>
    <li>An example position might be 0, 0, N, which means the aspirator is in the bottom left corner and facing North.</li>
    <li>In order to control the aspirator, we send a simple string of letters:</li>
    <ul>
      <li>'D' means turn right 90 degrees.</li>
      <li>'G' means turn left 90 degrees.</li>
      <li>'A' means move forward one space(if possible).</li>
    </ul>
    <li>The aspirator will process this string and perform all actions in sequence.</li>
    <li>Assume that the square directly North from (X, Y) is (X, Y+1).</li> 
    <li>If the position after the movement is outside the grid, the aspirator will not move, retain its orientation and process the next command.</li>
  `;

    instructions.textContent = instructionsHTML;

    const sentences = instructions.textContent.split('. ');
    const formattedText = sentences
      .map((sentence) => sentence.trim())
      .join('.<br>');
    instructions.innerHTML = formattedText;
    this.DOMtarget.appendChild(instructions);
  }

  private h1() {
    const h1 = document.createElement('h1');
    h1.textContent = 'Automatic aspirator';
    this.DOMtarget.appendChild(h1);
  }

  private createLabel(labelText: string, labelFor: string): HTMLLabelElement {
    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = labelFor;
    return label;
  }

  private createInput(
    inputType: string,
    inputId: string,
    inputName: string,
    inputMin: string,
    inputMax: string,
    inputRequired: boolean,
    inputValue: string
  ): HTMLInputElement {
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
