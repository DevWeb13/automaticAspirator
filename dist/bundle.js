(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticAspirator = void 0;
var AutomaticAspirator = /** @class */ (function () {
    function AutomaticAspirator(positionX, positionY, direction, gridX, gridY, aspiratorImg, instructionDisplay) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.direction = direction;
        this.gridX = gridX;
        this.gridY = gridY;
        this.aspiratorImg = aspiratorImg;
        this.instructionDisplay = instructionDisplay;
        this.initDirection(direction);
    }
    AutomaticAspirator.prototype.initDirection = function (direction) {
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
    };
    AutomaticAspirator.prototype.updateImageRotation = function (degrees) {
        this.aspiratorImg.style.transform = "rotate(".concat(degrees, "deg)");
    };
    AutomaticAspirator.prototype.place = function () {
        var row = document.querySelector(".row-".concat(this.positionX));
        var cell = row.querySelector(".cell-".concat(this.positionY));
        console.log(cell);
        cell.innerHTML = '';
        cell.appendChild(this.aspiratorImg);
    };
    AutomaticAspirator.prototype.move = function (instruction, lastMove) {
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
            this.instructionDisplay.textContent = "The aspirator is finished at x: ".concat(this.positionX, ", y: ").concat(this.positionY, ", Direction: ").concat(this.direction);
            this.instructionDisplay.classList.remove('alert');
            this.instructionDisplay.classList.add('finished');
        }
        else {
            this.instructionDisplay.textContent = "x: ".concat(this.positionX, ", y: ").concat(this.positionY, ", Direction: ").concat(this.direction, ", instruction: ").concat(instruction);
        }
    };
    AutomaticAspirator.prototype.advance = function () {
        if ((this.positionX === 0 && this.direction === 'W') ||
            (this.positionX === this.gridX - 1 && this.direction === 'E') ||
            (this.positionY === 0 && this.direction === 'S') ||
            (this.positionY === this.gridY - 1 && this.direction === 'N')) {
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
    };
    AutomaticAspirator.prototype.turnRight = function () {
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
    };
    AutomaticAspirator.prototype.turnLeft = function () {
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
    };
    return AutomaticAspirator;
}());
exports.AutomaticAspirator = AutomaticAspirator;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDOM = void 0;
var CreateDOM = /** @class */ (function () {
    function CreateDOM(DOMtarget, maxGridX, maxGridY) {
        this.DOMtarget = DOMtarget;
        this.maxGridX = maxGridX;
        this.maxGridY = maxGridY;
        this.render();
    }
    CreateDOM.prototype.render = function () {
        this.h1();
        this.instructionsUL();
        this.form();
        this.instructionDisplay();
        this.gridContainer();
    };
    CreateDOM.prototype.instructionDisplay = function () {
        var instructionDisplay = document.createElement('p');
        instructionDisplay.id = 'instructionDisplay';
        this.DOMtarget.appendChild(instructionDisplay);
    };
    CreateDOM.prototype.gridContainer = function () {
        var gridContainer = document.createElement('div');
        gridContainer.id = 'gridContainer';
        gridContainer.className = 'grid';
        this.DOMtarget.appendChild(gridContainer);
    };
    CreateDOM.prototype.form = function () {
        var form = document.createElement('form');
        form.id = 'form';
        this.DOMtarget.appendChild(form);
        var gridXLabel = this.createLabel('Grid dimensions (X) :', 'gridX');
        form.appendChild(gridXLabel);
        var gridXInput = this.createInput('number', 'gridX', 'gridX', '1', this.maxGridX.toString(), true, this.maxGridX.toString());
        form.appendChild(gridXInput);
        var gridYLabel = this.createLabel('Grid dimensions (Y) :', 'gridY');
        form.appendChild(gridYLabel);
        var gridYInput = this.createInput('number', 'gridY', 'gridY', '1', this.maxGridY.toString(), true, this.maxGridY.toString());
        form.appendChild(gridYInput);
        var positionXLabel = this.createLabel('Position (X) :', 'positionX');
        form.appendChild(positionXLabel);
        console.log(typeof gridXInput.value);
        var positionXInput = this.createInput('number', 'positionX', 'positionX', '0', (parseInt(gridXInput.value) - 1).toString(), true, '5');
        form.appendChild(positionXInput);
        var positionYLabel = this.createLabel('Position (Y) :', 'positionY');
        form.appendChild(positionYLabel);
        var positionYInput = this.createInput('number', 'positionY', 'positionY', '0', (parseInt(gridYInput.value) - 1).toString(), true, '5');
        form.appendChild(positionYInput);
        var directionLabel = this.createLabel('Initial direction :', 'direction');
        form.appendChild(directionLabel);
        var directionSelect = document.createElement('select');
        directionSelect.id = 'direction';
        directionSelect.name = 'direction';
        var directionOptions = ['N', 'E', 'S', 'W'];
        directionOptions.forEach(function (option) {
            var directionOption = document.createElement('option');
            directionOption.value = option;
            directionOption.textContent = option;
            directionSelect.appendChild(directionOption);
        });
        form.appendChild(directionSelect);
        var instructionsLabel = this.createLabel('Instructions :', 'instructions');
        form.appendChild(instructionsLabel);
        var instructionsInput = this.createInput('text', 'instructions', 'instructions', '', '', true, 'DADADADAA');
        form.appendChild(instructionsInput);
        var submitButton = document.createElement('button');
        submitButton.id = 'submit';
        submitButton.classList.add('submit');
        submitButton.type = 'submit';
        submitButton.textContent = 'Start';
        form.appendChild(submitButton);
    };
    CreateDOM.prototype.instructionsUL = function () {
        var instructions = document.createElement('ul');
        var instructionsHTML = "\n    <li>This is a simple automatic aspirator that can be controlled by a set of instructions.</li>\n    <li>The aspirator is placed on a grid and can be moved forward, turned left or right.</li>\n    <li>The aspirator can't go outside the grid.</li> \n    <li>The grid is rectangular and max size is 10.</li>\n    <li>An example position might be 0, 0, N, which means the aspirator is in the bottom left corner and facing North.</li>\n    <li>In order to control the aspirator, we send a simple string of letters:</li>\n    <ul>\n      <li>'D' means turn right 90 degrees.</li>\n      <li>'G' means turn left 90 degrees.</li>\n      <li>'A' means move forward one space(if possible).</li>\n    </ul>\n    <li>The aspirator will process this string and perform all actions in sequence.</li>\n    <li>Assume that the square directly North from (X, Y) is (X, Y+1).</li> \n    <li>If the position after the movement is outside the grid, the aspirator will not move, retain its orientation and process the next command.</li>\n  ";
        instructions.textContent = instructionsHTML;
        var sentences = instructions.textContent.split('. ');
        var formattedText = sentences
            .map(function (sentence) { return sentence.trim(); })
            .join('.<br>');
        instructions.innerHTML = formattedText;
        this.DOMtarget.appendChild(instructions);
    };
    CreateDOM.prototype.h1 = function () {
        var h1 = document.createElement('h1');
        h1.textContent = 'Automatic aspirator';
        this.DOMtarget.appendChild(h1);
    };
    CreateDOM.prototype.createLabel = function (labelText, labelFor) {
        var label = document.createElement('label');
        label.textContent = labelText;
        label.htmlFor = labelFor;
        return label;
    };
    CreateDOM.prototype.createInput = function (inputType, inputId, inputName, inputMin, inputMax, inputRequired, inputValue) {
        var input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;
        input.name = inputName;
        input.min = inputMin;
        input.max = inputMax;
        input.required = inputRequired;
        input.value = inputValue;
        return input;
    };
    return CreateDOM;
}());
exports.CreateDOM = CreateDOM;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
var Grid = /** @class */ (function () {
    function Grid(container, x, y, dustImg) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.dustImg = dustImg;
        this.render();
    }
    Grid.prototype.render = function () {
        this.container.innerHTML = '';
        for (var i = 0; i < this.x; i++) {
            var row = document.createElement('div');
            row.className = "row row-".concat(i);
            for (var j = this.y - 1; j >= 0; j--) {
                var cell = document.createElement('div');
                cell.className = "cell cell-".concat(j);
                var cellContent = document.createElement('div');
                cellContent.className = 'cell-content';
                var dustImg = this.dustImg.cloneNode(true);
                cellContent.appendChild(dustImg);
                cell.appendChild(cellContent);
                row.appendChild(cell);
            }
            this.container.appendChild(row);
        }
    };
    return Grid;
}());
exports.Grid = Grid;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateDOM_1 = require("./CreateDOM");
var Grid_1 = require("./Grid");
var AutomaticAspirator_1 = require("./AutomaticAspirator");
var maxGridX = 10;
var maxGridY = 10;
var aspiratorImg = document.createElement('img');
aspiratorImg.src = './assets/aspirator.png';
aspiratorImg.className = 'aspirator';
var dustImg = document.createElement('img');
dustImg.src = './assets/dust.png';
dustImg.className = 'dust';
new CreateDOM_1.CreateDOM(document.getElementById('root'), maxGridX, maxGridY);
var form = document.getElementById('form'), gridXInput = document.getElementById('gridX'), gridYInput = document.getElementById('gridY'), positionXInput = document.getElementById('positionX'), positionYInput = document.getElementById('positionY'), directionInput = document.getElementById('direction'), gridContainer = document.getElementById('gridContainer'), instructionsInput = document.getElementById('instructions'), submitButton = document.getElementById('submit'), instructionDisplay = document.getElementById('instructionDisplay');
console.log(gridXInput, gridYInput, positionXInput, positionYInput, directionInput, gridContainer, instructionsInput, submitButton);
/**
 * The function sets up and executes the automatic movement of an aspirator on a grid based on user
 * input instructions.
 * @param {MouseEvent} e - The parameter `e` is of type `MouseEvent`, which represents a mouse event
 * that occurs when a user interacts with the mouse. It is used in the `start` function as an argument
 * for the event listener callback function.
 */
var start = function (e) {
    e.preventDefault();
    // desactive button start
    submitButton.disabled = true;
    submitButton.classList.add('disabled');
    // reset instructionDisplay
    instructionDisplay.classList.remove('finished');
    var gridX = parseInt(gridXInput.value);
    var gridY = parseInt(gridYInput.value);
    var positionX = parseInt(positionXInput.value);
    var positionY = parseInt(positionYInput.value);
    var direction = directionInput.value;
    var instructions = instructionsInput.value;
    new Grid_1.Grid(gridContainer, gridX, gridY, dustImg);
    var automaticAspirator = new AutomaticAspirator_1.AutomaticAspirator(positionX, positionY, direction, gridX, gridY, aspiratorImg, instructionDisplay);
    instructionDisplay.textContent = instructions[0] + positionX + positionY;
    instructionDisplay.textContent = "x: ".concat(positionX, ", y: ").concat(positionY, ", Direction: ").concat(direction, ", instruction: ").concat(instructions[0]);
    setTimeout(function () {
        automaticAspirator.place();
        instructions.split('').forEach(function (instruction, i) {
            setTimeout(function () {
                var lastMove = i === instructions.length - 1;
                automaticAspirator.move(instruction, lastMove);
                automaticAspirator.place();
            }, (i + 1) * 1000);
        });
    }, 1000);
    // reactive button start
    setTimeout(function () {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    }, (instructions.length + 1) * 1000);
};
gridXInput.addEventListener('change', function () {
    positionXInput.max = (parseInt(gridXInput.value) - 1).toString();
});
gridYInput.addEventListener('change', function () {
    positionYInput.max = (parseInt(gridYInput.value) - 1).toString();
});
form.addEventListener('submit', start);

},{"./AutomaticAspirator":1,"./CreateDOM":2,"./Grid":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQXV0b21hdGljQXNwaXJhdG9yLnRzIiwic3JjL0NyZWF0ZURPTS50cyIsInNyYy9HcmlkLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQUE7SUFDRSw0QkFDVSxTQUFpQixFQUNqQixTQUFpQixFQUNqQixTQUFpQixFQUNqQixLQUFhLEVBQ2IsS0FBYSxFQUNiLFlBQThCLEVBQzlCLGtCQUF3QztRQU54QyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFrQjtRQUM5Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXNCO1FBRWhELElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLDBDQUFhLEdBQXJCLFVBQXNCLFNBQWlCO1FBQ3JDLElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDN0I7UUFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRU8sZ0RBQW1CLEdBQTNCLFVBQTRCLE9BQWU7UUFDekMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFVLE9BQU8sU0FBTSxDQUFDO0lBQzlELENBQUM7SUFFRCxrQ0FBSyxHQUFMO1FBQ0UsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFRLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQyxDQUFDO1FBQzdELElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsZ0JBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsaUNBQUksR0FBSixVQUFLLFdBQW1CLEVBQUUsUUFBaUI7UUFDekMsUUFBUSxXQUFXLEVBQUU7WUFDbkIsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDZixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDaEIsTUFBTTtTQUNUO1FBQ0QsSUFBSSxRQUFRLEVBQUU7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLDBDQUFtQyxJQUFJLENBQUMsU0FBUyxrQkFBUSxJQUFJLENBQUMsU0FBUywwQkFBZ0IsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDO1lBQzlJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ25EO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxHQUFHLGFBQU0sSUFBSSxDQUFDLFNBQVMsa0JBQVEsSUFBSSxDQUFDLFNBQVMsMEJBQWdCLElBQUksQ0FBQyxTQUFTLDRCQUFrQixXQUFXLENBQUUsQ0FBQztTQUMvSTtJQUNILENBQUM7SUFFTyxvQ0FBTyxHQUFmO1FBQ0UsSUFDRSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssR0FBRyxDQUFDO1lBQ2hELENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQztZQUM3RCxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssR0FBRyxDQUFDO1lBQ2hELENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxFQUM3RDtZQUNBLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQy9DLE9BQU87U0FDUjtRQUNELFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDakIsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixNQUFNO1NBQ1Q7SUFDSCxDQUFDO0lBRU8sc0NBQVMsR0FBakI7UUFDRSxRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLE1BQU07U0FDVDtJQUNILENBQUM7SUFFTyxxQ0FBUSxHQUFoQjtRQUNFLFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsTUFBTTtZQUNSLEtBQUssR0FBRztnQkFDTixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzdCLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUIsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FsSUEsQUFrSUMsSUFBQTtBQWxJWSxnREFBa0I7Ozs7OztBQ0EvQjtJQUNFLG1CQUNVLFNBQXNCLEVBQ3RCLFFBQWdCLEVBQ2hCLFFBQWdCO1FBRmhCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRXhCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsMEJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVPLHNDQUFrQixHQUExQjtRQUNFLElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RCxrQkFBa0IsQ0FBQyxFQUFFLEdBQUcsb0JBQW9CLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU8saUNBQWEsR0FBckI7UUFDRSxJQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BELGFBQWEsQ0FBQyxFQUFFLEdBQUcsZUFBZSxDQUFDO1FBQ25DLGFBQWEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTyx3QkFBSSxHQUFaO1FBQ0UsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDakMsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsR0FBRyxFQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksRUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDakMsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsR0FBRyxFQUNILElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQ3hCLElBQUksRUFDSixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUN6QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUNyQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLFdBQVcsRUFDWCxHQUFHLEVBQ0gsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxJQUFJLEVBQ0osR0FBRyxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqQyxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUNyQyxRQUFRLEVBQ1IsV0FBVyxFQUNYLFdBQVcsRUFDWCxHQUFHLEVBQ0gsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxJQUFJLEVBQ0osR0FBRyxDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2pDLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqQyxJQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELGVBQWUsQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1FBQ25DLElBQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQzlCLElBQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekQsZUFBZSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7WUFDL0IsZUFBZSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7WUFDckMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEMsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUN4QyxnQkFBZ0IsRUFDaEIsY0FBYyxDQUNmLENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDcEMsSUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUN4QyxNQUFNLEVBQ04sY0FBYyxFQUNkLGNBQWMsRUFDZCxFQUFFLEVBQ0YsRUFBRSxFQUNGLElBQUksRUFDSixXQUFXLENBQ1osQ0FBQztRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNwQyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELFlBQVksQ0FBQyxFQUFFLEdBQUcsUUFBUSxDQUFDO1FBQzNCLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQzdCLFlBQVksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVPLGtDQUFjLEdBQXRCO1FBQ0UsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxJQUFNLGdCQUFnQixHQUFHLG1nQ0FlMUIsQ0FBQztRQUVBLFlBQVksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7UUFFNUMsSUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsSUFBTSxhQUFhLEdBQUcsU0FBUzthQUM1QixHQUFHLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2FBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqQixZQUFZLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8sc0JBQUUsR0FBVjtRQUNFLElBQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsRUFBRSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU8sK0JBQVcsR0FBbkIsVUFBb0IsU0FBaUIsRUFBRSxRQUFnQjtRQUNyRCxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLEtBQUssQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLCtCQUFXLEdBQW5CLFVBQ0UsU0FBaUIsRUFDakIsT0FBZSxFQUNmLFNBQWlCLEVBQ2pCLFFBQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLGFBQXNCLEVBQ3RCLFVBQWtCO1FBRWxCLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDbkIsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdkIsS0FBSyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFDckIsS0FBSyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUM7UUFDckIsS0FBSyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUM7UUFDL0IsS0FBSyxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDekIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQXJMQSxBQXFMQyxJQUFBO0FBckxZLDhCQUFTOzs7Ozs7QUNBdEI7SUFDRSxjQUNVLFNBQXNCLEVBQ3RCLENBQVMsRUFDVCxDQUFTLEVBQ1QsT0FBeUI7UUFIekIsY0FBUyxHQUFULFNBQVMsQ0FBYTtRQUN0QixNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQ1QsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUNULFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBRWpDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQscUJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsa0JBQVcsQ0FBQyxDQUFFLENBQUM7WUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFhLENBQUMsQ0FBRSxDQUFDO2dCQUNsQyxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsRCxXQUFXLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztnQkFDdkMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFxQixDQUFDO2dCQUNqRSxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM5QixHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBQ0gsV0FBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUE1Qlksb0JBQUk7Ozs7O0FDQWpCLHlDQUF3QztBQUN4QywrQkFBOEI7QUFDOUIsMkRBQTBEO0FBRTFELElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFcEIsSUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuRCxZQUFZLENBQUMsR0FBRyxHQUFHLHdCQUF3QixDQUFDO0FBQzVDLFlBQVksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO0FBRXJDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztBQUNsQyxPQUFPLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUUzQixJQUFJLHFCQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFbkUsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQW9CLEVBQzdELFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBcUIsRUFDakUsVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFxQixFQUNqRSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLEVBQ3pFLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsRUFDekUsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFxQixFQUN6RSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsRUFDeEQsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDekMsY0FBYyxDQUNLLEVBQ3JCLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBc0IsRUFDckUsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDMUMsb0JBQW9CLENBQ0csQ0FBQztBQUM1QixPQUFPLENBQUMsR0FBRyxDQUNULFVBQVUsRUFDVixVQUFVLEVBQ1YsY0FBYyxFQUNkLGNBQWMsRUFDZCxjQUFjLEVBQ2QsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixZQUFZLENBQ2IsQ0FBQztBQUVGOzs7Ozs7R0FNRztBQUNILElBQU0sS0FBSyxHQUFHLFVBQUMsQ0FBYTtJQUMxQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbkIseUJBQXlCO0lBQ3pCLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQzdCLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXZDLDJCQUEyQjtJQUMzQixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsSUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQztJQUN2QyxJQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUM7SUFFN0MsSUFBSSxXQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFL0MsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLHVDQUFrQixDQUMvQyxTQUFTLEVBQ1QsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsS0FBSyxFQUNMLFlBQVksRUFDWixrQkFBa0IsQ0FDbkIsQ0FBQztJQUVGLGtCQUFrQixDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUN6RSxrQkFBa0IsQ0FBQyxXQUFXLEdBQUcsYUFBTSxTQUFTLGtCQUFRLFNBQVMsMEJBQWdCLFNBQVMsNEJBQWtCLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDO0lBRTlILFVBQVUsQ0FBQztRQUNULGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsV0FBVyxFQUFFLENBQUM7WUFDNUMsVUFBVSxDQUFDO2dCQUNULElBQU0sUUFBUSxHQUFHLENBQUMsS0FBSyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFDL0Msa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDL0Msa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDN0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRVQsd0JBQXdCO0lBQ3hCLFVBQVUsQ0FBQztRQUNULFlBQVksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzlCLFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDdkMsQ0FBQyxDQUFDO0FBRUYsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtJQUNwQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7SUFDcEMsY0FBYyxDQUFDLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbkUsQ0FBQyxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGNsYXNzIEF1dG9tYXRpY0FzcGlyYXRvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcG9zaXRpb25YOiBudW1iZXIsXG4gICAgcHJpdmF0ZSBwb3NpdGlvblk6IG51bWJlcixcbiAgICBwcml2YXRlIGRpcmVjdGlvbjogc3RyaW5nLFxuICAgIHByaXZhdGUgZ3JpZFg6IG51bWJlcixcbiAgICBwcml2YXRlIGdyaWRZOiBudW1iZXIsXG4gICAgcHJpdmF0ZSBhc3BpcmF0b3JJbWc6IEhUTUxJbWFnZUVsZW1lbnQsXG4gICAgcHJpdmF0ZSBpbnN0cnVjdGlvbkRpc3BsYXk6IEhUTUxQYXJhZ3JhcGhFbGVtZW50XG4gICkge1xuICAgIHRoaXMuaW5pdERpcmVjdGlvbihkaXJlY3Rpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0RGlyZWN0aW9uKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ04nKSB7XG4gICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oMCk7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdFJykge1xuICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDkwKTtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1MnKSB7XG4gICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oMTgwKTtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ1cnKSB7XG4gICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oMjcwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUltYWdlUm90YXRpb24oZGVncmVlczogbnVtYmVyKSB7XG4gICAgdGhpcy5hc3BpcmF0b3JJbWcuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke2RlZ3JlZXN9ZGVnKWA7XG4gIH1cblxuICBwbGFjZSgpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucm93LSR7dGhpcy5wb3NpdGlvblh9YCk7XG4gICAgY29uc3QgY2VsbCA9IHJvdy5xdWVyeVNlbGVjdG9yKGAuY2VsbC0ke3RoaXMucG9zaXRpb25ZfWApO1xuICAgIGNvbnNvbGUubG9nKGNlbGwpO1xuICAgIGNlbGwuaW5uZXJIVE1MID0gJyc7XG4gICAgY2VsbC5hcHBlbmRDaGlsZCh0aGlzLmFzcGlyYXRvckltZyk7XG4gIH1cblxuICBtb3ZlKGluc3RydWN0aW9uOiBzdHJpbmcsIGxhc3RNb3ZlOiBib29sZWFuKSB7XG4gICAgc3dpdGNoIChpbnN0cnVjdGlvbikge1xuICAgICAgY2FzZSAnQSc6XG4gICAgICAgIHRoaXMuYWR2YW5jZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0QnOlxuICAgICAgICB0aGlzLmluc3RydWN0aW9uRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdhbGVydCcpO1xuICAgICAgICB0aGlzLnR1cm5SaWdodCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0cnOlxuICAgICAgICB0aGlzLmluc3RydWN0aW9uRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdhbGVydCcpO1xuICAgICAgICB0aGlzLnR1cm5MZWZ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAobGFzdE1vdmUpIHtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25EaXNwbGF5LnRleHRDb250ZW50ID0gYFRoZSBhc3BpcmF0b3IgaXMgZmluaXNoZWQgYXQgeDogJHt0aGlzLnBvc2l0aW9uWH0sIHk6ICR7dGhpcy5wb3NpdGlvbll9LCBEaXJlY3Rpb246ICR7dGhpcy5kaXJlY3Rpb259YDtcbiAgICAgIHRoaXMuaW5zdHJ1Y3Rpb25EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FsZXJ0Jyk7XG4gICAgICB0aGlzLmluc3RydWN0aW9uRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdmaW5pc2hlZCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGB4OiAke3RoaXMucG9zaXRpb25YfSwgeTogJHt0aGlzLnBvc2l0aW9uWX0sIERpcmVjdGlvbjogJHt0aGlzLmRpcmVjdGlvbn0sIGluc3RydWN0aW9uOiAke2luc3RydWN0aW9ufWA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhZHZhbmNlKCkge1xuICAgIGlmIChcbiAgICAgICh0aGlzLnBvc2l0aW9uWCA9PT0gMCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ1cnKSB8fFxuICAgICAgKHRoaXMucG9zaXRpb25YID09PSB0aGlzLmdyaWRYIC0gMSAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ0UnKSB8fFxuICAgICAgKHRoaXMucG9zaXRpb25ZID09PSAwICYmIHRoaXMuZGlyZWN0aW9uID09PSAnUycpIHx8XG4gICAgICAodGhpcy5wb3NpdGlvblkgPT09IHRoaXMuZ3JpZFkgLSAxICYmIHRoaXMuZGlyZWN0aW9uID09PSAnTicpXG4gICAgKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9uRGlzcGxheS5jbGFzc0xpc3QuYWRkKCdhbGVydCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICdOJzpcbiAgICAgICAgdGhpcy5wb3NpdGlvblkrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFJzpcbiAgICAgICAgdGhpcy5wb3NpdGlvblgrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgdGhpcy5wb3NpdGlvblktLTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdXJzpcbiAgICAgICAgdGhpcy5wb3NpdGlvblgtLTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0dXJuUmlnaHQoKSB7XG4gICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSAnTic6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ0UnO1xuICAgICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oOTApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdTJztcbiAgICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDE4MCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ1cnO1xuICAgICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oMjcwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdXJzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnTic7XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2VSb3RhdGlvbigwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB0dXJuTGVmdCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlICdOJzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnVyc7XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2VSb3RhdGlvbigyNzApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0UnOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdOJztcbiAgICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1MnOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdFJztcbiAgICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDkwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdXJzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnUyc7XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2VSb3RhdGlvbigxODApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDcmVhdGVET00ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIERPTXRhcmdldDogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSBtYXhHcmlkWDogbnVtYmVyLFxuICAgIHByaXZhdGUgbWF4R3JpZFk6IG51bWJlclxuICApIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuaDEoKTtcbiAgICB0aGlzLmluc3RydWN0aW9uc1VMKCk7XG4gICAgdGhpcy5mb3JtKCk7XG4gICAgdGhpcy5pbnN0cnVjdGlvbkRpc3BsYXkoKTtcbiAgICB0aGlzLmdyaWRDb250YWluZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdHJ1Y3Rpb25EaXNwbGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IGluc3RydWN0aW9uRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbnN0cnVjdGlvbkRpc3BsYXkuaWQgPSAnaW5zdHJ1Y3Rpb25EaXNwbGF5JztcbiAgICB0aGlzLkRPTXRhcmdldC5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbkRpc3BsYXkpO1xuICB9XG5cbiAgcHJpdmF0ZSBncmlkQ29udGFpbmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBncmlkQ29udGFpbmVyLmlkID0gJ2dyaWRDb250YWluZXInO1xuICAgIGdyaWRDb250YWluZXIuY2xhc3NOYW1lID0gJ2dyaWQnO1xuICAgIHRoaXMuRE9NdGFyZ2V0LmFwcGVuZENoaWxkKGdyaWRDb250YWluZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5pZCA9ICdmb3JtJztcbiAgICB0aGlzLkRPTXRhcmdldC5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICBjb25zdCBncmlkWExhYmVsID0gdGhpcy5jcmVhdGVMYWJlbCgnR3JpZCBkaW1lbnNpb25zIChYKSA6JywgJ2dyaWRYJyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChncmlkWExhYmVsKTtcbiAgICBjb25zdCBncmlkWElucHV0ID0gdGhpcy5jcmVhdGVJbnB1dChcbiAgICAgICdudW1iZXInLFxuICAgICAgJ2dyaWRYJyxcbiAgICAgICdncmlkWCcsXG4gICAgICAnMScsXG4gICAgICB0aGlzLm1heEdyaWRYLnRvU3RyaW5nKCksXG4gICAgICB0cnVlLFxuICAgICAgdGhpcy5tYXhHcmlkWC50b1N0cmluZygpXG4gICAgKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGdyaWRYSW5wdXQpO1xuICAgIGNvbnN0IGdyaWRZTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdHcmlkIGRpbWVuc2lvbnMgKFkpIDonLCAnZ3JpZFknKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGdyaWRZTGFiZWwpO1xuICAgIGNvbnN0IGdyaWRZSW5wdXQgPSB0aGlzLmNyZWF0ZUlucHV0KFxuICAgICAgJ251bWJlcicsXG4gICAgICAnZ3JpZFknLFxuICAgICAgJ2dyaWRZJyxcbiAgICAgICcxJyxcbiAgICAgIHRoaXMubWF4R3JpZFkudG9TdHJpbmcoKSxcbiAgICAgIHRydWUsXG4gICAgICB0aGlzLm1heEdyaWRZLnRvU3RyaW5nKClcbiAgICApO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZ3JpZFlJbnB1dCk7XG4gICAgY29uc3QgcG9zaXRpb25YTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdQb3NpdGlvbiAoWCkgOicsICdwb3NpdGlvblgnKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHBvc2l0aW9uWExhYmVsKTtcbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgZ3JpZFhJbnB1dC52YWx1ZSk7XG5cbiAgICBjb25zdCBwb3NpdGlvblhJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXG4gICAgICAnbnVtYmVyJyxcbiAgICAgICdwb3NpdGlvblgnLFxuICAgICAgJ3Bvc2l0aW9uWCcsXG4gICAgICAnMCcsXG4gICAgICAocGFyc2VJbnQoZ3JpZFhJbnB1dC52YWx1ZSkgLSAxKS50b1N0cmluZygpLFxuICAgICAgdHJ1ZSxcbiAgICAgICc1J1xuICAgICk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwb3NpdGlvblhJbnB1dCk7XG4gICAgY29uc3QgcG9zaXRpb25ZTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdQb3NpdGlvbiAoWSkgOicsICdwb3NpdGlvblknKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHBvc2l0aW9uWUxhYmVsKTtcbiAgICBjb25zdCBwb3NpdGlvbllJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXG4gICAgICAnbnVtYmVyJyxcbiAgICAgICdwb3NpdGlvblknLFxuICAgICAgJ3Bvc2l0aW9uWScsXG4gICAgICAnMCcsXG4gICAgICAocGFyc2VJbnQoZ3JpZFlJbnB1dC52YWx1ZSkgLSAxKS50b1N0cmluZygpLFxuICAgICAgdHJ1ZSxcbiAgICAgICc1J1xuICAgICk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwb3NpdGlvbllJbnB1dCk7XG4gICAgY29uc3QgZGlyZWN0aW9uTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdJbml0aWFsIGRpcmVjdGlvbiA6JywgJ2RpcmVjdGlvbicpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGlyZWN0aW9uTGFiZWwpO1xuICAgIGNvbnN0IGRpcmVjdGlvblNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgIGRpcmVjdGlvblNlbGVjdC5pZCA9ICdkaXJlY3Rpb24nO1xuICAgIGRpcmVjdGlvblNlbGVjdC5uYW1lID0gJ2RpcmVjdGlvbic7XG4gICAgY29uc3QgZGlyZWN0aW9uT3B0aW9ucyA9IFsnTicsICdFJywgJ1MnLCAnVyddO1xuICAgIGRpcmVjdGlvbk9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3Rpb25PcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIGRpcmVjdGlvbk9wdGlvbi52YWx1ZSA9IG9wdGlvbjtcbiAgICAgIGRpcmVjdGlvbk9wdGlvbi50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICAgIGRpcmVjdGlvblNlbGVjdC5hcHBlbmRDaGlsZChkaXJlY3Rpb25PcHRpb24pO1xuICAgIH0pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGlyZWN0aW9uU2VsZWN0KTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnNMYWJlbCA9IHRoaXMuY3JlYXRlTGFiZWwoXG4gICAgICAnSW5zdHJ1Y3Rpb25zIDonLFxuICAgICAgJ2luc3RydWN0aW9ucydcbiAgICApO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5zdHJ1Y3Rpb25zTGFiZWwpO1xuICAgIGNvbnN0IGluc3RydWN0aW9uc0lucHV0ID0gdGhpcy5jcmVhdGVJbnB1dChcbiAgICAgICd0ZXh0JyxcbiAgICAgICdpbnN0cnVjdGlvbnMnLFxuICAgICAgJ2luc3RydWN0aW9ucycsXG4gICAgICAnJyxcbiAgICAgICcnLFxuICAgICAgdHJ1ZSxcbiAgICAgICdEQURBREFEQUEnXG4gICAgKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGluc3RydWN0aW9uc0lucHV0KTtcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24uaWQgPSAnc3VibWl0JztcbiAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3VibWl0Jyk7XG4gICAgc3VibWl0QnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdHJ1Y3Rpb25zVUwoKTogdm9pZCB7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnNIVE1MID0gYFxuICAgIDxsaT5UaGlzIGlzIGEgc2ltcGxlIGF1dG9tYXRpYyBhc3BpcmF0b3IgdGhhdCBjYW4gYmUgY29udHJvbGxlZCBieSBhIHNldCBvZiBpbnN0cnVjdGlvbnMuPC9saT5cbiAgICA8bGk+VGhlIGFzcGlyYXRvciBpcyBwbGFjZWQgb24gYSBncmlkIGFuZCBjYW4gYmUgbW92ZWQgZm9yd2FyZCwgdHVybmVkIGxlZnQgb3IgcmlnaHQuPC9saT5cbiAgICA8bGk+VGhlIGFzcGlyYXRvciBjYW4ndCBnbyBvdXRzaWRlIHRoZSBncmlkLjwvbGk+IFxuICAgIDxsaT5UaGUgZ3JpZCBpcyByZWN0YW5ndWxhciBhbmQgbWF4IHNpemUgaXMgMTAuPC9saT5cbiAgICA8bGk+QW4gZXhhbXBsZSBwb3NpdGlvbiBtaWdodCBiZSAwLCAwLCBOLCB3aGljaCBtZWFucyB0aGUgYXNwaXJhdG9yIGlzIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgYW5kIGZhY2luZyBOb3J0aC48L2xpPlxuICAgIDxsaT5JbiBvcmRlciB0byBjb250cm9sIHRoZSBhc3BpcmF0b3IsIHdlIHNlbmQgYSBzaW1wbGUgc3RyaW5nIG9mIGxldHRlcnM6PC9saT5cbiAgICA8dWw+XG4gICAgICA8bGk+J0QnIG1lYW5zIHR1cm4gcmlnaHQgOTAgZGVncmVlcy48L2xpPlxuICAgICAgPGxpPidHJyBtZWFucyB0dXJuIGxlZnQgOTAgZGVncmVlcy48L2xpPlxuICAgICAgPGxpPidBJyBtZWFucyBtb3ZlIGZvcndhcmQgb25lIHNwYWNlKGlmIHBvc3NpYmxlKS48L2xpPlxuICAgIDwvdWw+XG4gICAgPGxpPlRoZSBhc3BpcmF0b3Igd2lsbCBwcm9jZXNzIHRoaXMgc3RyaW5nIGFuZCBwZXJmb3JtIGFsbCBhY3Rpb25zIGluIHNlcXVlbmNlLjwvbGk+XG4gICAgPGxpPkFzc3VtZSB0aGF0IHRoZSBzcXVhcmUgZGlyZWN0bHkgTm9ydGggZnJvbSAoWCwgWSkgaXMgKFgsIFkrMSkuPC9saT4gXG4gICAgPGxpPklmIHRoZSBwb3NpdGlvbiBhZnRlciB0aGUgbW92ZW1lbnQgaXMgb3V0c2lkZSB0aGUgZ3JpZCwgdGhlIGFzcGlyYXRvciB3aWxsIG5vdCBtb3ZlLCByZXRhaW4gaXRzIG9yaWVudGF0aW9uIGFuZCBwcm9jZXNzIHRoZSBuZXh0IGNvbW1hbmQuPC9saT5cbiAgYDtcblxuICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IGluc3RydWN0aW9uc0hUTUw7XG5cbiAgICBjb25zdCBzZW50ZW5jZXMgPSBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQuc3BsaXQoJy4gJyk7XG4gICAgY29uc3QgZm9ybWF0dGVkVGV4dCA9IHNlbnRlbmNlc1xuICAgICAgLm1hcCgoc2VudGVuY2UpID0+IHNlbnRlbmNlLnRyaW0oKSlcbiAgICAgIC5qb2luKCcuPGJyPicpO1xuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBmb3JtYXR0ZWRUZXh0O1xuICAgIHRoaXMuRE9NdGFyZ2V0LmFwcGVuZENoaWxkKGluc3RydWN0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGgxKCkge1xuICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoMS50ZXh0Q29udGVudCA9ICdBdXRvbWF0aWMgYXNwaXJhdG9yJztcbiAgICB0aGlzLkRPTXRhcmdldC5hcHBlbmRDaGlsZChoMSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxhYmVsKGxhYmVsVGV4dDogc3RyaW5nLCBsYWJlbEZvcjogc3RyaW5nKTogSFRNTExhYmVsRWxlbWVudCB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gbGFiZWxUZXh0O1xuICAgIGxhYmVsLmh0bWxGb3IgPSBsYWJlbEZvcjtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUlucHV0KFxuICAgIGlucHV0VHlwZTogc3RyaW5nLFxuICAgIGlucHV0SWQ6IHN0cmluZyxcbiAgICBpbnB1dE5hbWU6IHN0cmluZyxcbiAgICBpbnB1dE1pbjogc3RyaW5nLFxuICAgIGlucHV0TWF4OiBzdHJpbmcsXG4gICAgaW5wdXRSZXF1aXJlZDogYm9vbGVhbixcbiAgICBpbnB1dFZhbHVlOiBzdHJpbmdcbiAgKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnR5cGUgPSBpbnB1dFR5cGU7XG4gICAgaW5wdXQuaWQgPSBpbnB1dElkO1xuICAgIGlucHV0Lm5hbWUgPSBpbnB1dE5hbWU7XG4gICAgaW5wdXQubWluID0gaW5wdXRNaW47XG4gICAgaW5wdXQubWF4ID0gaW5wdXRNYXg7XG4gICAgaW5wdXQucmVxdWlyZWQgPSBpbnB1dFJlcXVpcmVkO1xuICAgIGlucHV0LnZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBHcmlkIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb250YWluZXI6IEhUTUxFbGVtZW50LFxuICAgIHByaXZhdGUgeDogbnVtYmVyLFxuICAgIHByaXZhdGUgeTogbnVtYmVyLFxuICAgIHByaXZhdGUgZHVzdEltZzogSFRNTEltYWdlRWxlbWVudFxuICApIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy54OyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTmFtZSA9IGByb3cgcm93LSR7aX1gO1xuICAgICAgZm9yIChsZXQgaiA9IHRoaXMueSAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBgY2VsbCBjZWxsLSR7an1gO1xuICAgICAgICBjb25zdCBjZWxsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsQ29udGVudC5jbGFzc05hbWUgPSAnY2VsbC1jb250ZW50JztcbiAgICAgICAgY29uc3QgZHVzdEltZyA9IHRoaXMuZHVzdEltZy5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgY2VsbENvbnRlbnQuYXBwZW5kQ2hpbGQoZHVzdEltZyk7XG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoY2VsbENvbnRlbnQpO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgQ3JlYXRlRE9NIH0gZnJvbSAnLi9DcmVhdGVET00nO1xuaW1wb3J0IHsgR3JpZCB9IGZyb20gJy4vR3JpZCc7XG5pbXBvcnQgeyBBdXRvbWF0aWNBc3BpcmF0b3IgfSBmcm9tICcuL0F1dG9tYXRpY0FzcGlyYXRvcic7XG5cbmNvbnN0IG1heEdyaWRYID0gMTA7XG5jb25zdCBtYXhHcmlkWSA9IDEwO1xuXG5jb25zdCBhc3BpcmF0b3JJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbmFzcGlyYXRvckltZy5zcmMgPSAnLi9hc3NldHMvYXNwaXJhdG9yLnBuZyc7XG5hc3BpcmF0b3JJbWcuY2xhc3NOYW1lID0gJ2FzcGlyYXRvcic7XG5cbmNvbnN0IGR1c3RJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbmR1c3RJbWcuc3JjID0gJy4vYXNzZXRzL2R1c3QucG5nJztcbmR1c3RJbWcuY2xhc3NOYW1lID0gJ2R1c3QnO1xuXG5uZXcgQ3JlYXRlRE9NKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JyksIG1heEdyaWRYLCBtYXhHcmlkWSk7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudCxcbiAgZ3JpZFhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkWCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIGdyaWRZSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZFknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvblhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblgnKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvbllJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBkaXJlY3Rpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb24nKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWRDb250YWluZXInKSxcbiAgaW5zdHJ1Y3Rpb25zSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnaW5zdHJ1Y3Rpb25zJ1xuICApIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudCxcbiAgaW5zdHJ1Y3Rpb25EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ2luc3RydWN0aW9uRGlzcGxheSdcbiAgKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbmNvbnNvbGUubG9nKFxuICBncmlkWElucHV0LFxuICBncmlkWUlucHV0LFxuICBwb3NpdGlvblhJbnB1dCxcbiAgcG9zaXRpb25ZSW5wdXQsXG4gIGRpcmVjdGlvbklucHV0LFxuICBncmlkQ29udGFpbmVyLFxuICBpbnN0cnVjdGlvbnNJbnB1dCxcbiAgc3VibWl0QnV0dG9uXG4pO1xuXG4vKipcbiAqIFRoZSBmdW5jdGlvbiBzZXRzIHVwIGFuZCBleGVjdXRlcyB0aGUgYXV0b21hdGljIG1vdmVtZW50IG9mIGFuIGFzcGlyYXRvciBvbiBhIGdyaWQgYmFzZWQgb24gdXNlclxuICogaW5wdXQgaW5zdHJ1Y3Rpb25zLlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlIC0gVGhlIHBhcmFtZXRlciBgZWAgaXMgb2YgdHlwZSBgTW91c2VFdmVudGAsIHdoaWNoIHJlcHJlc2VudHMgYSBtb3VzZSBldmVudFxuICogdGhhdCBvY2N1cnMgd2hlbiBhIHVzZXIgaW50ZXJhY3RzIHdpdGggdGhlIG1vdXNlLiBJdCBpcyB1c2VkIGluIHRoZSBgc3RhcnRgIGZ1bmN0aW9uIGFzIGFuIGFyZ3VtZW50XG4gKiBmb3IgdGhlIGV2ZW50IGxpc3RlbmVyIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICovXG5jb25zdCBzdGFydCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gZGVzYWN0aXZlIGJ1dHRvbiBzdGFydFxuICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcblxuICAvLyByZXNldCBpbnN0cnVjdGlvbkRpc3BsYXlcbiAgaW5zdHJ1Y3Rpb25EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbmlzaGVkJyk7XG5cbiAgY29uc3QgZ3JpZFggPSBwYXJzZUludChncmlkWElucHV0LnZhbHVlKTtcbiAgY29uc3QgZ3JpZFkgPSBwYXJzZUludChncmlkWUlucHV0LnZhbHVlKTtcbiAgY29uc3QgcG9zaXRpb25YID0gcGFyc2VJbnQocG9zaXRpb25YSW5wdXQudmFsdWUpO1xuICBjb25zdCBwb3NpdGlvblkgPSBwYXJzZUludChwb3NpdGlvbllJbnB1dC52YWx1ZSk7XG4gIGNvbnN0IGRpcmVjdGlvbiA9IGRpcmVjdGlvbklucHV0LnZhbHVlO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnNJbnB1dC52YWx1ZTtcblxuICBuZXcgR3JpZChncmlkQ29udGFpbmVyLCBncmlkWCwgZ3JpZFksIGR1c3RJbWcpO1xuXG4gIGNvbnN0IGF1dG9tYXRpY0FzcGlyYXRvciA9IG5ldyBBdXRvbWF0aWNBc3BpcmF0b3IoXG4gICAgcG9zaXRpb25YLFxuICAgIHBvc2l0aW9uWSxcbiAgICBkaXJlY3Rpb24sXG4gICAgZ3JpZFgsXG4gICAgZ3JpZFksXG4gICAgYXNwaXJhdG9ySW1nLFxuICAgIGluc3RydWN0aW9uRGlzcGxheVxuICApO1xuXG4gIGluc3RydWN0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGluc3RydWN0aW9uc1swXSArIHBvc2l0aW9uWCArIHBvc2l0aW9uWTtcbiAgaW5zdHJ1Y3Rpb25EaXNwbGF5LnRleHRDb250ZW50ID0gYHg6ICR7cG9zaXRpb25YfSwgeTogJHtwb3NpdGlvbll9LCBEaXJlY3Rpb246ICR7ZGlyZWN0aW9ufSwgaW5zdHJ1Y3Rpb246ICR7aW5zdHJ1Y3Rpb25zWzBdfWA7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgYXV0b21hdGljQXNwaXJhdG9yLnBsYWNlKCk7XG4gICAgaW5zdHJ1Y3Rpb25zLnNwbGl0KCcnKS5mb3JFYWNoKChpbnN0cnVjdGlvbiwgaSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3RNb3ZlID0gaSA9PT0gaW5zdHJ1Y3Rpb25zLmxlbmd0aCAtIDE7XG4gICAgICAgIGF1dG9tYXRpY0FzcGlyYXRvci5tb3ZlKGluc3RydWN0aW9uLCBsYXN0TW92ZSk7XG4gICAgICAgIGF1dG9tYXRpY0FzcGlyYXRvci5wbGFjZSgpO1xuICAgICAgfSwgKGkgKyAxKSAqIDEwMDApO1xuICAgIH0pO1xuICB9LCAxMDAwKTtcblxuICAvLyByZWFjdGl2ZSBidXR0b24gc3RhcnRcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gIH0sIChpbnN0cnVjdGlvbnMubGVuZ3RoICsgMSkgKiAxMDAwKTtcbn07XG5cbmdyaWRYSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICBwb3NpdGlvblhJbnB1dC5tYXggPSAocGFyc2VJbnQoZ3JpZFhJbnB1dC52YWx1ZSkgLSAxKS50b1N0cmluZygpO1xufSk7XG5ncmlkWUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgcG9zaXRpb25ZSW5wdXQubWF4ID0gKHBhcnNlSW50KGdyaWRZSW5wdXQudmFsdWUpIC0gMSkudG9TdHJpbmcoKTtcbn0pO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdGFydCk7XG4iXX0=
