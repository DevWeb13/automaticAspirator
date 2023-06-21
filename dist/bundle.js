(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = AutomaticAspirator;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = CreateDOM;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    function Grid(container, x, y, dustImg) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.dustImg = dustImg;
        this.render();
    }
    Grid.prototype.reset = function () {
        this.render();
    };
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
exports.default = Grid;

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
new CreateDOM_1.default(document.getElementById('root'), maxGridX, maxGridY);
var form = document.getElementById('form'), gridXInput = document.getElementById('gridX'), gridYInput = document.getElementById('gridY'), positionXInput = document.getElementById('positionX'), positionYInput = document.getElementById('positionY'), directionInput = document.getElementById('direction'), gridContainer = document.getElementById('gridContainer'), instructionsInput = document.getElementById('instructions'), submitButton = document.getElementById('submit'), instructionDisplay = document.getElementById('instructionDisplay');
console.log(gridXInput, gridYInput, positionXInput, positionYInput, directionInput, gridContainer, instructionsInput, submitButton);
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
    new Grid_1.default(gridContainer, gridX, gridY, dustImg);
    var automaticAspirator = new AutomaticAspirator_1.default(positionX, positionY, direction, gridX, gridY, aspiratorImg, instructionDisplay);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQXV0b21hdGljQXNwaXJhdG9yLnRzIiwic3JjL0NyZWF0ZURPTS50cyIsInNyYy9HcmlkLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtJQUNFLDRCQUNVLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLEtBQWEsRUFDYixLQUFhLEVBQ2IsWUFBOEIsRUFDOUIsa0JBQXdDO1FBTnhDLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQzlCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBc0I7UUFFaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU8sMENBQWEsR0FBckIsVUFBc0IsU0FBaUI7UUFDckMsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtRQUNELElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtZQUNyQixJQUFJLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUI7UUFDRCxJQUFJLFNBQVMsS0FBSyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxTQUFTLEtBQUssR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7SUFFTyxnREFBbUIsR0FBM0IsVUFBNEIsT0FBZTtRQUN6QyxJQUFJLENB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Q0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM3QixDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFVCx3QkFBd0I7SUFDeEIsVUFBVSxDQUFDO1FBQ1QsWUFBWSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDOUIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDNUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUM7QUFFRixVQUFVLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0lBQ3BDLGNBQWMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ25FLENBQUMsQ0FBQyxDQUFDO0FBQ0gsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRTtJQUNwQyxjQUFjLENBQUMsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNuRSxDQUFDLENBQUMsQ0FBQztBQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBBdXRvbWF0aWNBc3BpcmF0b3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBvc2l0aW9uWDogbnVtYmVyLFxuICAgIHByaXZhdGUgcG9zaXRpb25ZOiBudW1iZXIsXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb246IHN0cmluZyxcbiAgICBwcml2YXRlIGdyaWRYOiBudW1iZXIsXG4gICAgcHJpdmF0ZSBncmlkWTogbnVtYmVyLFxuICAgIHByaXZhdGUgYXNwaXJhdG9ySW1nOiBIVE1MSW1hZ2VFbGVtZW50LFxuICAgIHByaXZhdGUgaW5zdHJ1Y3Rpb25EaXNwbGF5OiBIVE1MUGFyYWdyYXBoRWxlbWVudFxuICApIHtcbiAgICB0aGlzLmluaXREaXJlY3Rpb24oZGlyZWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdERpcmVjdGlvbihkaXJlY3Rpb246IHN0cmluZykge1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdOJykge1xuICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDApO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aW9uID09PSAnRScpIHtcbiAgICAgIHRoaXMudXBkYXRlSW1hZ2VSb3RhdGlvbig5MCk7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdTJykge1xuICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDE4MCk7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gPT09ICdXJykge1xuICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDI3MCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVJbWFnZVJvdGF0aW9uKGRlZ3JlZXM6IG51bWJlcikge1xuICAgIHRoaXMuYXNwaXJhdG9ySW1nLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHtkZWdyZWVzfWRlZylgO1xuICB9XG5cbiAgcGxhY2UoKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnJvdy0ke3RoaXMucG9zaXRpb25YfWApO1xuICAgIGNvbnN0IGNlbGwgPSByb3cucXVlcnlTZWxlY3RvcihgLmNlbGwtJHt0aGlzLnBvc2l0aW9uWX1gKTtcbiAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgICBjZWxsLmlubmVySFRNTCA9ICcnO1xuICAgIGNlbGwuYXBwZW5kQ2hpbGQodGhpcy5hc3BpcmF0b3JJbWcpO1xuICB9XG5cbiAgbW92ZShpbnN0cnVjdGlvbjogc3RyaW5nLCBsYXN0TW92ZTogYm9vbGVhbikge1xuICAgIHN3aXRjaCAoaW5zdHJ1Y3Rpb24pIHtcbiAgICAgIGNhc2UgJ0EnOlxuICAgICAgICB0aGlzLmFkdmFuY2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdEJzpcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbkRpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWxlcnQnKTtcbiAgICAgICAgdGhpcy50dXJuUmlnaHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdHJzpcbiAgICAgICAgdGhpcy5pbnN0cnVjdGlvbkRpc3BsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWxlcnQnKTtcbiAgICAgICAgdGhpcy50dXJuTGVmdCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGxhc3RNb3ZlKSB7XG4gICAgICB0aGlzLmluc3RydWN0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGBUaGUgYXNwaXJhdG9yIGlzIGZpbmlzaGVkIGF0IHg6ICR7dGhpcy5wb3NpdGlvblh9LCB5OiAke3RoaXMucG9zaXRpb25ZfSwgRGlyZWN0aW9uOiAke3RoaXMuZGlyZWN0aW9ufWA7XG4gICAgICB0aGlzLmluc3RydWN0aW9uRGlzcGxheS5jbGFzc0xpc3QucmVtb3ZlKCdhbGVydCcpO1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbkRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnZmluaXNoZWQnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbkRpc3BsYXkudGV4dENvbnRlbnQgPSBgeDogJHt0aGlzLnBvc2l0aW9uWH0sIHk6ICR7dGhpcy5wb3NpdGlvbll9LCBEaXJlY3Rpb246ICR7dGhpcy5kaXJlY3Rpb259LCBpbnN0cnVjdGlvbjogJHtpbnN0cnVjdGlvbn1gO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWR2YW5jZSgpIHtcbiAgICBpZiAoXG4gICAgICAodGhpcy5wb3NpdGlvblggPT09IDAgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdXJykgfHxcbiAgICAgICh0aGlzLnBvc2l0aW9uWCA9PT0gdGhpcy5ncmlkWCAtIDEgJiYgdGhpcy5kaXJlY3Rpb24gPT09ICdFJykgfHxcbiAgICAgICh0aGlzLnBvc2l0aW9uWSA9PT0gMCAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ1MnKSB8fFxuICAgICAgKHRoaXMucG9zaXRpb25ZID09PSB0aGlzLmdyaWRZIC0gMSAmJiB0aGlzLmRpcmVjdGlvbiA9PT0gJ04nKVxuICAgICkge1xuICAgICAgdGhpcy5pbnN0cnVjdGlvbkRpc3BsYXkuY2xhc3NMaXN0LmFkZCgnYWxlcnQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSAnTic6XG4gICAgICAgIHRoaXMucG9zaXRpb25ZKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnRSc6XG4gICAgICAgIHRoaXMucG9zaXRpb25YKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIHRoaXMucG9zaXRpb25ZLS07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVyc6XG4gICAgICAgIHRoaXMucG9zaXRpb25YLS07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHVyblJpZ2h0KCkge1xuICAgIHN3aXRjaCAodGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgJ04nOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdFJztcbiAgICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDkwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFJzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnUyc7XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2VSb3RhdGlvbigxODApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1MnOlxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9ICdXJztcbiAgICAgICAgdGhpcy51cGRhdGVJbWFnZVJvdGF0aW9uKDI3MCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVyc6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ04nO1xuICAgICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oMCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdHVybkxlZnQoKSB7XG4gICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSAnTic6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ1cnO1xuICAgICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oMjcwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFJzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnTic7XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2VSb3RhdGlvbigwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAnRSc7XG4gICAgICAgIHRoaXMudXBkYXRlSW1hZ2VSb3RhdGlvbig5MCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVyc6XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ1MnO1xuICAgICAgICB0aGlzLnVwZGF0ZUltYWdlUm90YXRpb24oMTgwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVET00ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIERPTXRhcmdldDogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSBtYXhHcmlkWDogbnVtYmVyLFxuICAgIHByaXZhdGUgbWF4R3JpZFk6IG51bWJlclxuICApIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCk6IHZvaWQge1xuICAgIHRoaXMuaDEoKTtcbiAgICB0aGlzLmluc3RydWN0aW9uc1VMKCk7XG4gICAgdGhpcy5mb3JtKCk7XG4gICAgdGhpcy5pbnN0cnVjdGlvbkRpc3BsYXkoKTtcbiAgICB0aGlzLmdyaWRDb250YWluZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdHJ1Y3Rpb25EaXNwbGF5KCk6IHZvaWQge1xuICAgIGNvbnN0IGluc3RydWN0aW9uRGlzcGxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBpbnN0cnVjdGlvbkRpc3BsYXkuaWQgPSAnaW5zdHJ1Y3Rpb25EaXNwbGF5JztcbiAgICB0aGlzLkRPTXRhcmdldC5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbkRpc3BsYXkpO1xuICB9XG5cbiAgcHJpdmF0ZSBncmlkQ29udGFpbmVyKCk6IHZvaWQge1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBncmlkQ29udGFpbmVyLmlkID0gJ2dyaWRDb250YWluZXInO1xuICAgIGdyaWRDb250YWluZXIuY2xhc3NOYW1lID0gJ2dyaWQnO1xuICAgIHRoaXMuRE9NdGFyZ2V0LmFwcGVuZENoaWxkKGdyaWRDb250YWluZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgZm9ybS5pZCA9ICdmb3JtJztcbiAgICB0aGlzLkRPTXRhcmdldC5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICBjb25zdCBncmlkWExhYmVsID0gdGhpcy5jcmVhdGVMYWJlbCgnR3JpZCBkaW1lbnNpb25zIChYKSA6JywgJ2dyaWRYJyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChncmlkWExhYmVsKTtcbiAgICBjb25zdCBncmlkWElucHV0ID0gdGhpcy5jcmVhdGVJbnB1dChcbiAgICAgICdudW1iZXInLFxuICAgICAgJ2dyaWRYJyxcbiAgICAgICdncmlkWCcsXG4gICAgICAnMScsXG4gICAgICB0aGlzLm1heEdyaWRYLnRvU3RyaW5nKCksXG4gICAgICB0cnVlLFxuICAgICAgdGhpcy5tYXhHcmlkWC50b1N0cmluZygpXG4gICAgKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGdyaWRYSW5wdXQpO1xuICAgIGNvbnN0IGdyaWRZTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdHcmlkIGRpbWVuc2lvbnMgKFkpIDonLCAnZ3JpZFknKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGdyaWRZTGFiZWwpO1xuICAgIGNvbnN0IGdyaWRZSW5wdXQgPSB0aGlzLmNyZWF0ZUlucHV0KFxuICAgICAgJ251bWJlcicsXG4gICAgICAnZ3JpZFknLFxuICAgICAgJ2dyaWRZJyxcbiAgICAgICcxJyxcbiAgICAgIHRoaXMubWF4R3JpZFkudG9TdHJpbmcoKSxcbiAgICAgIHRydWUsXG4gICAgICB0aGlzLm1heEdyaWRZLnRvU3RyaW5nKClcbiAgICApO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZ3JpZFlJbnB1dCk7XG4gICAgY29uc3QgcG9zaXRpb25YTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdQb3NpdGlvbiAoWCkgOicsICdwb3NpdGlvblgnKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHBvc2l0aW9uWExhYmVsKTtcbiAgICBjb25zb2xlLmxvZyh0eXBlb2YgZ3JpZFhJbnB1dC52YWx1ZSk7XG5cbiAgICBjb25zdCBwb3NpdGlvblhJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXG4gICAgICAnbnVtYmVyJyxcbiAgICAgICdwb3NpdGlvblgnLFxuICAgICAgJ3Bvc2l0aW9uWCcsXG4gICAgICAnMCcsXG4gICAgICAocGFyc2VJbnQoZ3JpZFhJbnB1dC52YWx1ZSkgLSAxKS50b1N0cmluZygpLFxuICAgICAgdHJ1ZSxcbiAgICAgICc1J1xuICAgICk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwb3NpdGlvblhJbnB1dCk7XG4gICAgY29uc3QgcG9zaXRpb25ZTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdQb3NpdGlvbiAoWSkgOicsICdwb3NpdGlvblknKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHBvc2l0aW9uWUxhYmVsKTtcbiAgICBjb25zdCBwb3NpdGlvbllJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXG4gICAgICAnbnVtYmVyJyxcbiAgICAgICdwb3NpdGlvblknLFxuICAgICAgJ3Bvc2l0aW9uWScsXG4gICAgICAnMCcsXG4gICAgICAocGFyc2VJbnQoZ3JpZFlJbnB1dC52YWx1ZSkgLSAxKS50b1N0cmluZygpLFxuICAgICAgdHJ1ZSxcbiAgICAgICc1J1xuICAgICk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwb3NpdGlvbllJbnB1dCk7XG4gICAgY29uc3QgZGlyZWN0aW9uTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdJbml0aWFsIGRpcmVjdGlvbiA6JywgJ2RpcmVjdGlvbicpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGlyZWN0aW9uTGFiZWwpO1xuICAgIGNvbnN0IGRpcmVjdGlvblNlbGVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgIGRpcmVjdGlvblNlbGVjdC5pZCA9ICdkaXJlY3Rpb24nO1xuICAgIGRpcmVjdGlvblNlbGVjdC5uYW1lID0gJ2RpcmVjdGlvbic7XG4gICAgY29uc3QgZGlyZWN0aW9uT3B0aW9ucyA9IFsnTicsICdFJywgJ1MnLCAnVyddO1xuICAgIGRpcmVjdGlvbk9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3Rpb25PcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIGRpcmVjdGlvbk9wdGlvbi52YWx1ZSA9IG9wdGlvbjtcbiAgICAgIGRpcmVjdGlvbk9wdGlvbi50ZXh0Q29udGVudCA9IG9wdGlvbjtcbiAgICAgIGRpcmVjdGlvblNlbGVjdC5hcHBlbmRDaGlsZChkaXJlY3Rpb25PcHRpb24pO1xuICAgIH0pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZGlyZWN0aW9uU2VsZWN0KTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnNMYWJlbCA9IHRoaXMuY3JlYXRlTGFiZWwoXG4gICAgICAnSW5zdHJ1Y3Rpb25zIDonLFxuICAgICAgJ2luc3RydWN0aW9ucydcbiAgICApO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5zdHJ1Y3Rpb25zTGFiZWwpO1xuICAgIGNvbnN0IGluc3RydWN0aW9uc0lucHV0ID0gdGhpcy5jcmVhdGVJbnB1dChcbiAgICAgICd0ZXh0JyxcbiAgICAgICdpbnN0cnVjdGlvbnMnLFxuICAgICAgJ2luc3RydWN0aW9ucycsXG4gICAgICAnJyxcbiAgICAgICcnLFxuICAgICAgdHJ1ZSxcbiAgICAgICdEQURBREFEQUEnXG4gICAgKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGluc3RydWN0aW9uc0lucHV0KTtcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24uaWQgPSAnc3VibWl0JztcbiAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3VibWl0Jyk7XG4gICAgc3VibWl0QnV0dG9uLnR5cGUgPSAnc3VibWl0JztcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnU3RhcnQnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zdHJ1Y3Rpb25zVUwoKTogdm9pZCB7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBjb25zdCBpbnN0cnVjdGlvbnNIVE1MID0gYFxuICAgIDxsaT5UaGlzIGlzIGEgc2ltcGxlIGF1dG9tYXRpYyBhc3BpcmF0b3IgdGhhdCBjYW4gYmUgY29udHJvbGxlZCBieSBhIHNldCBvZiBpbnN0cnVjdGlvbnMuPC9saT5cbiAgICA8bGk+VGhlIGFzcGlyYXRvciBpcyBwbGFjZWQgb24gYSBncmlkIGFuZCBjYW4gYmUgbW92ZWQgZm9yd2FyZCwgdHVybmVkIGxlZnQgb3IgcmlnaHQuPC9saT5cbiAgICA8bGk+VGhlIGFzcGlyYXRvciBjYW4ndCBnbyBvdXRzaWRlIHRoZSBncmlkLjwvbGk+IFxuICAgIDxsaT5UaGUgZ3JpZCBpcyByZWN0YW5ndWxhciBhbmQgbWF4IHNpemUgaXMgMTAuPC9saT5cbiAgICA8bGk+QW4gZXhhbXBsZSBwb3NpdGlvbiBtaWdodCBiZSAwLCAwLCBOLCB3aGljaCBtZWFucyB0aGUgYXNwaXJhdG9yIGlzIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgYW5kIGZhY2luZyBOb3J0aC48L2xpPlxuICAgIDxsaT5JbiBvcmRlciB0byBjb250cm9sIHRoZSBhc3BpcmF0b3IsIHdlIHNlbmQgYSBzaW1wbGUgc3RyaW5nIG9mIGxldHRlcnM6PC9saT5cbiAgICA8dWw+XG4gICAgICA8bGk+J0QnIG1lYW5zIHR1cm4gcmlnaHQgOTAgZGVncmVlcy48L2xpPlxuICAgICAgPGxpPidHJyBtZWFucyB0dXJuIGxlZnQgOTAgZGVncmVlcy48L2xpPlxuICAgICAgPGxpPidBJyBtZWFucyBtb3ZlIGZvcndhcmQgb25lIHNwYWNlKGlmIHBvc3NpYmxlKS48L2xpPlxuICAgIDwvdWw+XG4gICAgPGxpPlRoZSBhc3BpcmF0b3Igd2lsbCBwcm9jZXNzIHRoaXMgc3RyaW5nIGFuZCBwZXJmb3JtIGFsbCBhY3Rpb25zIGluIHNlcXVlbmNlLjwvbGk+XG4gICAgPGxpPkFzc3VtZSB0aGF0IHRoZSBzcXVhcmUgZGlyZWN0bHkgTm9ydGggZnJvbSAoWCwgWSkgaXMgKFgsIFkrMSkuPC9saT4gXG4gICAgPGxpPklmIHRoZSBwb3NpdGlvbiBhZnRlciB0aGUgbW92ZW1lbnQgaXMgb3V0c2lkZSB0aGUgZ3JpZCwgdGhlIGFzcGlyYXRvciB3aWxsIG5vdCBtb3ZlLCByZXRhaW4gaXRzIG9yaWVudGF0aW9uIGFuZCBwcm9jZXNzIHRoZSBuZXh0IGNvbW1hbmQuPC9saT5cbiAgYDtcblxuICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IGluc3RydWN0aW9uc0hUTUw7XG5cbiAgICBjb25zdCBzZW50ZW5jZXMgPSBpbnN0cnVjdGlvbnMudGV4dENvbnRlbnQuc3BsaXQoJy4gJyk7XG4gICAgY29uc3QgZm9ybWF0dGVkVGV4dCA9IHNlbnRlbmNlc1xuICAgICAgLm1hcCgoc2VudGVuY2UpID0+IHNlbnRlbmNlLnRyaW0oKSlcbiAgICAgIC5qb2luKCcuPGJyPicpO1xuICAgIGluc3RydWN0aW9ucy5pbm5lckhUTUwgPSBmb3JtYXR0ZWRUZXh0O1xuICAgIHRoaXMuRE9NdGFyZ2V0LmFwcGVuZENoaWxkKGluc3RydWN0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGgxKCkge1xuICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoMS50ZXh0Q29udGVudCA9ICdBdXRvbWF0aWMgYXNwaXJhdG9yJztcbiAgICB0aGlzLkRPTXRhcmdldC5hcHBlbmRDaGlsZChoMSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxhYmVsKGxhYmVsVGV4dDogc3RyaW5nLCBsYWJlbEZvcjogc3RyaW5nKTogSFRNTExhYmVsRWxlbWVudCB7XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gbGFiZWxUZXh0O1xuICAgIGxhYmVsLmh0bWxGb3IgPSBsYWJlbEZvcjtcbiAgICByZXR1cm4gbGFiZWw7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUlucHV0KFxuICAgIGlucHV0VHlwZTogc3RyaW5nLFxuICAgIGlucHV0SWQ6IHN0cmluZyxcbiAgICBpbnB1dE5hbWU6IHN0cmluZyxcbiAgICBpbnB1dE1pbjogc3RyaW5nLFxuICAgIGlucHV0TWF4OiBzdHJpbmcsXG4gICAgaW5wdXRSZXF1aXJlZDogYm9vbGVhbixcbiAgICBpbnB1dFZhbHVlOiBzdHJpbmdcbiAgKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LnR5cGUgPSBpbnB1dFR5cGU7XG4gICAgaW5wdXQuaWQgPSBpbnB1dElkO1xuICAgIGlucHV0Lm5hbWUgPSBpbnB1dE5hbWU7XG4gICAgaW5wdXQubWluID0gaW5wdXRNaW47XG4gICAgaW5wdXQubWF4ID0gaW5wdXRNYXg7XG4gICAgaW5wdXQucmVxdWlyZWQgPSBpbnB1dFJlcXVpcmVkO1xuICAgIGlucHV0LnZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSB4OiBudW1iZXIsXG4gICAgcHJpdmF0ZSB5OiBudW1iZXIsXG4gICAgcHJpdmF0ZSBkdXN0SW1nOiBIVE1MSW1hZ2VFbGVtZW50XG4gICkge1xuICAgIHRoaXMucmVuZGVyKCk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy54OyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTmFtZSA9IGByb3cgcm93LSR7aX1gO1xuICAgICAgZm9yIChsZXQgaiA9IHRoaXMueSAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBgY2VsbCBjZWxsLSR7an1gO1xuICAgICAgICBjb25zdCBjZWxsQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsQ29udGVudC5jbGFzc05hbWUgPSAnY2VsbC1jb250ZW50JztcbiAgICAgICAgY29uc3QgZHVzdEltZyA9IHRoaXMuZHVzdEltZy5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEltYWdlRWxlbWVudDtcbiAgICAgICAgY2VsbENvbnRlbnQuYXBwZW5kQ2hpbGQoZHVzdEltZyk7XG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoY2VsbENvbnRlbnQpO1xuICAgICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IENyZWF0ZURPTSBmcm9tICcuL0NyZWF0ZURPTSc7XG5pbXBvcnQgR3JpZCBmcm9tICcuL0dyaWQnO1xuaW1wb3J0IEF1dG9tYXRpY0FzcGlyYXRvciBmcm9tICcuL0F1dG9tYXRpY0FzcGlyYXRvcic7XG5cbmNvbnN0IG1heEdyaWRYID0gMTA7XG5jb25zdCBtYXhHcmlkWSA9IDEwO1xuXG5jb25zdCBhc3BpcmF0b3JJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbmFzcGlyYXRvckltZy5zcmMgPSAnLi9hc3NldHMvYXNwaXJhdG9yLnBuZyc7XG5hc3BpcmF0b3JJbWcuY2xhc3NOYW1lID0gJ2FzcGlyYXRvcic7XG5cbmNvbnN0IGR1c3RJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbmR1c3RJbWcuc3JjID0gJy4vYXNzZXRzL2R1c3QucG5nJztcbmR1c3RJbWcuY2xhc3NOYW1lID0gJ2R1c3QnO1xuXG5uZXcgQ3JlYXRlRE9NKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JyksIG1heEdyaWRYLCBtYXhHcmlkWSk7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudCxcbiAgZ3JpZFhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkWCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIGdyaWRZSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZFknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvblhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblgnKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvbllJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBkaXJlY3Rpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb24nKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWRDb250YWluZXInKSxcbiAgaW5zdHJ1Y3Rpb25zSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnaW5zdHJ1Y3Rpb25zJ1xuICApIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudCxcbiAgaW5zdHJ1Y3Rpb25EaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgJ2luc3RydWN0aW9uRGlzcGxheSdcbiAgKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcbmNvbnNvbGUubG9nKFxuICBncmlkWElucHV0LFxuICBncmlkWUlucHV0LFxuICBwb3NpdGlvblhJbnB1dCxcbiAgcG9zaXRpb25ZSW5wdXQsXG4gIGRpcmVjdGlvbklucHV0LFxuICBncmlkQ29udGFpbmVyLFxuICBpbnN0cnVjdGlvbnNJbnB1dCxcbiAgc3VibWl0QnV0dG9uXG4pO1xuXG5jb25zdCBzdGFydCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gZGVzYWN0aXZlIGJ1dHRvbiBzdGFydFxuICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcblxuICAvLyByZXNldCBpbnN0cnVjdGlvbkRpc3BsYXlcbiAgaW5zdHJ1Y3Rpb25EaXNwbGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbmlzaGVkJyk7XG5cbiAgY29uc3QgZ3JpZFggPSBwYXJzZUludChncmlkWElucHV0LnZhbHVlKTtcbiAgY29uc3QgZ3JpZFkgPSBwYXJzZUludChncmlkWUlucHV0LnZhbHVlKTtcbiAgY29uc3QgcG9zaXRpb25YID0gcGFyc2VJbnQocG9zaXRpb25YSW5wdXQudmFsdWUpO1xuICBjb25zdCBwb3NpdGlvblkgPSBwYXJzZUludChwb3NpdGlvbllJbnB1dC52YWx1ZSk7XG4gIGNvbnN0IGRpcmVjdGlvbiA9IGRpcmVjdGlvbklucHV0LnZhbHVlO1xuICBjb25zdCBpbnN0cnVjdGlvbnMgPSBpbnN0cnVjdGlvbnNJbnB1dC52YWx1ZTtcblxuICBuZXcgR3JpZChncmlkQ29udGFpbmVyLCBncmlkWCwgZ3JpZFksIGR1c3RJbWcpO1xuXG4gIGNvbnN0IGF1dG9tYXRpY0FzcGlyYXRvciA9IG5ldyBBdXRvbWF0aWNBc3BpcmF0b3IoXG4gICAgcG9zaXRpb25YLFxuICAgIHBvc2l0aW9uWSxcbiAgICBkaXJlY3Rpb24sXG4gICAgZ3JpZFgsXG4gICAgZ3JpZFksXG4gICAgYXNwaXJhdG9ySW1nLFxuICAgIGluc3RydWN0aW9uRGlzcGxheVxuICApO1xuXG4gIGluc3RydWN0aW9uRGlzcGxheS50ZXh0Q29udGVudCA9IGluc3RydWN0aW9uc1swXSArIHBvc2l0aW9uWCArIHBvc2l0aW9uWTtcbiAgaW5zdHJ1Y3Rpb25EaXNwbGF5LnRleHRDb250ZW50ID0gYHg6ICR7cG9zaXRpb25YfSwgeTogJHtwb3NpdGlvbll9LCBEaXJlY3Rpb246ICR7ZGlyZWN0aW9ufSwgaW5zdHJ1Y3Rpb246ICR7aW5zdHJ1Y3Rpb25zWzBdfWA7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgYXV0b21hdGljQXNwaXJhdG9yLnBsYWNlKCk7XG4gICAgaW5zdHJ1Y3Rpb25zLnNwbGl0KCcnKS5mb3JFYWNoKChpbnN0cnVjdGlvbiwgaSkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhc3RNb3ZlID0gaSA9PT0gaW5zdHJ1Y3Rpb25zLmxlbmd0aCAtIDE7XG4gICAgICAgIGF1dG9tYXRpY0FzcGlyYXRvci5tb3ZlKGluc3RydWN0aW9uLCBsYXN0TW92ZSk7XG4gICAgICAgIGF1dG9tYXRpY0FzcGlyYXRvci5wbGFjZSgpO1xuICAgICAgfSwgKGkgKyAxKSAqIDEwMDApO1xuICAgIH0pO1xuICB9LCAxMDAwKTtcblxuICAvLyByZWFjdGl2ZSBidXR0b24gc3RhcnRcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gIH0sIChpbnN0cnVjdGlvbnMubGVuZ3RoICsgMSkgKiAxMDAwKTtcbn07XG5cbmdyaWRYSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICBwb3NpdGlvblhJbnB1dC5tYXggPSAocGFyc2VJbnQoZ3JpZFhJbnB1dC52YWx1ZSkgLSAxKS50b1N0cmluZygpO1xufSk7XG5ncmlkWUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgcG9zaXRpb25ZSW5wdXQubWF4ID0gKHBhcnNlSW50KGdyaWRZSW5wdXQudmFsdWUpIC0gMSkudG9TdHJpbmcoKTtcbn0pO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdGFydCk7XG4iXX0=
