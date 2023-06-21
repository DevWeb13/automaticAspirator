export default class AutomaticAspirator {
  constructor(
    private positionX: number,
    private positionY: number,
    private direction: string,
    private gridX: number,
    private gridY: number,
    private aspiratorImg: HTMLImageElement,
    private instructionDisplay: HTMLParagraphElement
  ) {
    this.initDirection(direction);
  }

  private initDirection(direction: string) {
    if (direction === 'N') {
      this.updateImageRotation(0);
    }
    if (direction === 'E') {
      this.updateImageRotation(90);
    }
    if (direction === 'S') {
      this.updateImageRotation(180);
    }
    if (direction === 'W') {
      this.updateImageRotation(270);
    }
  }

  private updateImageRotation(degrees: number) {
    this.aspiratorImg.style.transform = `rotate(${degrees}deg)`;
  }

  place() {
    const row = document.querySelector(`.row-${this.positionX}`);
    const cell = row.querySelector(`.cell-${this.positionY}`);
    console.log(cell);
    cell.innerHTML = '';
    cell.appendChild(this.aspiratorImg);
  }

  move(instruction: string, lastMove: boolean) {
    switch (instruction) {
      case 'A':
        this.advance();
        break;
      case 'D':
        this.instructionDisplay.classList.remove('alert');
        this.turnRight();
        break;
      case 'G':
        this.instructionDisplay.classList.remove('alert');
        this.turnLeft();
        break;
    }
    if (lastMove) {
      this.instructionDisplay.textContent = `The aspirator is finished at x: ${this.positionX}, y: ${this.positionY}, Direction: ${this.direction}`;
      this.instructionDisplay.classList.remove('alert');
      this.instructionDisplay.classList.add('finished');
    } else {
      this.instructionDisplay.textContent = `x: ${this.positionX}, y: ${this.positionY}, Direction: ${this.direction}, instruction: ${instruction}`;
    }
  }

  private advance() {
    if (
      (this.positionX === 0 && this.direction === 'W') ||
      (this.positionX === this.gridX - 1 && this.direction === 'E') ||
      (this.positionY === 0 && this.direction === 'S') ||
      (this.positionY === this.gridY - 1 && this.direction === 'N')
    ) {
      this.instructionDisplay.classList.add('alert');
      return;
    }
    switch (this.direction) {
      case 'N':
        this.positionY++;
        break;
      case 'E':
        this.positionX++;
        break;
      case 'S':
        this.positionY--;
        break;
      case 'W':
        this.positionX--;
        break;
    }
  }

  private turnRight() {
    switch (this.direction) {
      case 'N':
        this.direction = 'E';
        this.updateImageRotation(90);
        break;
      case 'E':
        this.direction = 'S';
        this.updateImageRotation(180);
        break;
      case 'S':
        this.direction = 'W';
        this.updateImageRotation(270);
        break;
      case 'W':
        this.direction = 'N';
        this.updateImageRotation(0);
        break;
    }
  }

  private turnLeft() {
    switch (this.direction) {
      case 'N':
        this.direction = 'W';
        this.updateImageRotation(270);
        break;
      case 'E':
        this.direction = 'N';
        this.updateImageRotation(0);
        break;
      case 'S':
        this.direction = 'E';
        this.updateImageRotation(90);
        break;
      case 'W':
        this.direction = 'S';
        this.updateImageRotation(180);
        break;
    }
  }
}
