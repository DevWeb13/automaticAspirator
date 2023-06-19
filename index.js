const form = document.getElementById('form'), gridXInput = document.getElementById('gridX'), gridYInput = document.getElementById('gridY'), positionXInput = document.getElementById('positionX'), positionYInput = document.getElementById('positionY'), directionInput = document.getElementById('direction'), gridContainer = document.getElementById('gridContainer'), instructionsInput = document.getElementById('instructions'), submitButton = document.getElementById('submit');
console.log(gridXInput, gridYInput, positionXInput, positionYInput, directionInput, gridContainer, instructionsInput, submitButton);
class Grid {
    constructor(container, x, y) {
        this.container = container;
        this.x = x;
        this.y = y;
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
