export class Grid {
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
