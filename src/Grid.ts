export class Grid {
  constructor(
    private container: HTMLElement,
    private x: number,
    private y: number,
    private dustImg: HTMLImageElement
  ) {
    this.render();
  }

  render(): void {
    this.container.innerHTML = '';
    for (let i = 0; i < this.x; i++) {
      const row = document.createElement('div');
      row.className = `row row-${i}`;
      for (let j = this.y - 1; j >= 0; j--) {
        const cell = document.createElement('div');
        cell.className = `cell cell-${j}`;
        const cellContent = document.createElement('div');
        cellContent.className = 'cell-content';
        const dustImg = this.dustImg.cloneNode(true) as HTMLImageElement;
        cellContent.appendChild(dustImg);
        cell.appendChild(cellContent);
        row.appendChild(cell);
      }
      this.container.appendChild(row);
    }
  }
}
