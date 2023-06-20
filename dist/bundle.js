(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateDOM = /** @class */ (function () {
    function CreateDOM(DOMtarget) {
        this.DOMtarget = DOMtarget;
        this.render();
    }
    CreateDOM.prototype.render = function () {
        var h1 = document.createElement('h1');
        h1.textContent = 'Automatic aspirator';
        this.DOMtarget.appendChild(h1);
        var instructions = document.createElement('p');
        instructions.textContent = "This is a simple automatic aspirator that can be controlled by a set of\n    instructions. The aspirator is placed on a grid and can be moved forward,\n    turned left or right. The aspirator can't go outside the grid. The grid is\n    rectangular and can be of any size. The aspirator's position is\n    represented by a combination of X and Y coordinates and a letter\n    representing the direction it is facing. The grid is divided up into a\n    matrix to simplify navigation. An example position might be 0, 0, N, which\n    means the aspirator is in the bottom left corner and facing North. In\n    order to control the aspirator, we send a simple string of letters. The\n    possible letters are 'D', 'G' and 'A'. 'D' and 'G' make the aspirator spin\n    90 degrees right or left respectively, without moving from its current\n    spot. 'A' means move forward one space, and maintain the same direction.\n    Assume that the square directly North from (X, Y) is (X, Y+1). If the\n    position after the movement is outside the grid, the aspirator will not\n    move, retain its orientation and process the next command.";
        this.DOMtarget.appendChild(instructions);
        var form = document.createElement('form');
        form.id = 'form';
        this.DOMtarget.appendChild(form);
        var gridXLabel = this.createLabel('Grid dimensions (X) :', 'gridX');
        form.appendChild(gridXLabel);
        var gridXInput = this.createInput('number', 'gridX', 'gridX', '0', '9', true, '9');
        form.appendChild(gridXInput);
        var gridYLabel = this.createLabel('Grid dimensions (Y) :', 'gridY');
        form.appendChild(gridYLabel);
        var gridYInput = this.createInput('number', 'gridY', 'gridY', '0', '9', true, '9');
        form.appendChild(gridYInput);
        var positionXLabel = this.createLabel('Position (X) :', 'positionX');
        form.appendChild(positionXLabel);
        var positionXInput = this.createInput('number', 'positionX', 'positionX', '0', '9', true, '0');
        form.appendChild(positionXInput);
        var positionYLabel = this.createLabel('Position (Y) :', 'positionY');
        form.appendChild(positionYLabel);
        var positionYInput = this.createInput('number', 'positionY', 'positionY', '0', '9', true, '0');
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
        submitButton.type = 'submit';
        submitButton.textContent = 'Start';
        form.appendChild(submitButton);
        var gridContainer = document.createElement('div');
        gridContainer.id = 'gridContainer';
        gridContainer.className = 'grid';
        this.DOMtarget.appendChild(gridContainer);
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid = /** @class */ (function () {
    function Grid(container, x, y) {
        this.container = container;
        this.x = x;
        this.y = y;
        this.init();
        this.display();
    }
    Grid.prototype.init = function () {
        this.container.innerHTML = '';
        for (var i = 0; i < this.x; i++) {
            var row = document.createElement('div');
            row.className = 'row';
            for (var j = this.y - 1; j >= 0; j--) {
                var cell = document.createElement('div');
                cell.className = 'cell';
                cell.innerHTML = 'x:' + i.toString() + ' ' + 'y:' + j.toString();
                row.appendChild(cell);
            }
            this.container.appendChild(row);
        }
    };
    Grid.prototype.reset = function () {
        this.container.innerHTML = '';
    };
    Grid.prototype.display = function () {
        return this.container;
    };
    return Grid;
}());
exports.default = Grid;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CreateDOM_1 = require("./CreateDOM");
var Grid_1 = require("./Grid");
var createDOM = new CreateDOM_1.default(document.getElementById('app'));
console.log(createDOM);
var form = document.getElementById('form'), gridXInput = document.getElementById('gridX'), gridYInput = document.getElementById('gridY'), positionXInput = document.getElementById('positionX'), positionYInput = document.getElementById('positionY'), directionInput = document.getElementById('direction'), gridContainer = document.getElementById('gridContainer'), instructionsInput = document.getElementById('instructions'), submitButton = document.getElementById('submit');
console.log(gridXInput, gridYInput, positionXInput, positionYInput, directionInput, gridContainer, instructionsInput, submitButton);
var start = function (e) {
    e.preventDefault();
    var gridX = parseInt(gridXInput.value);
    var gridY = parseInt(gridYInput.value);
    var grid = new Grid_1.default(gridContainer, gridX, gridY);
};
form.addEventListener('submit', start);

},{"./CreateDOM":1,"./Grid":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQ3JlYXRlRE9NLnRzIiwic3JjL0dyaWQudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBO0lBQ0UsbUJBQW9CLFNBQXNCO1FBQXRCLGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDeEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQ0UsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsWUFBWSxDQUFDLFdBQVcsR0FBRyx5bUNBY2dDLENBQUM7UUFDNUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0IsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FDakMsUUFBUSxFQUNSLE9BQU8sRUFDUCxPQUFPLEVBQ1AsR0FBRyxFQUNILEdBQUcsRUFDSCxJQUFJLEVBQ0osR0FBRyxD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LGNBQWMsRUFBRSxDQUFDO0lBQ25CLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxJQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQztBQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVET00ge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIERPTXRhcmdldDogSFRNTEVsZW1lbnQpIHtcbiAgICB0aGlzLnJlbmRlcigpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICBoMS50ZXh0Q29udGVudCA9ICdBdXRvbWF0aWMgYXNwaXJhdG9yJztcbiAgICB0aGlzLkRPTXRhcmdldC5hcHBlbmRDaGlsZChoMSk7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGluc3RydWN0aW9ucy50ZXh0Q29udGVudCA9IGBUaGlzIGlzIGEgc2ltcGxlIGF1dG9tYXRpYyBhc3BpcmF0b3IgdGhhdCBjYW4gYmUgY29udHJvbGxlZCBieSBhIHNldCBvZlxuICAgIGluc3RydWN0aW9ucy4gVGhlIGFzcGlyYXRvciBpcyBwbGFjZWQgb24gYSBncmlkIGFuZCBjYW4gYmUgbW92ZWQgZm9yd2FyZCxcbiAgICB0dXJuZWQgbGVmdCBvciByaWdodC4gVGhlIGFzcGlyYXRvciBjYW4ndCBnbyBvdXRzaWRlIHRoZSBncmlkLiBUaGUgZ3JpZCBpc1xuICAgIHJlY3Rhbmd1bGFyIGFuZCBjYW4gYmUgb2YgYW55IHNpemUuIFRoZSBhc3BpcmF0b3IncyBwb3NpdGlvbiBpc1xuICAgIHJlcHJlc2VudGVkIGJ5IGEgY29tYmluYXRpb24gb2YgWCBhbmQgWSBjb29yZGluYXRlcyBhbmQgYSBsZXR0ZXJcbiAgICByZXByZXNlbnRpbmcgdGhlIGRpcmVjdGlvbiBpdCBpcyBmYWNpbmcuIFRoZSBncmlkIGlzIGRpdmlkZWQgdXAgaW50byBhXG4gICAgbWF0cml4IHRvIHNpbXBsaWZ5IG5hdmlnYXRpb24uIEFuIGV4YW1wbGUgcG9zaXRpb24gbWlnaHQgYmUgMCwgMCwgTiwgd2hpY2hcbiAgICBtZWFucyB0aGUgYXNwaXJhdG9yIGlzIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgYW5kIGZhY2luZyBOb3J0aC4gSW5cbiAgICBvcmRlciB0byBjb250cm9sIHRoZSBhc3BpcmF0b3IsIHdlIHNlbmQgYSBzaW1wbGUgc3RyaW5nIG9mIGxldHRlcnMuIFRoZVxuICAgIHBvc3NpYmxlIGxldHRlcnMgYXJlICdEJywgJ0cnIGFuZCAnQScuICdEJyBhbmQgJ0cnIG1ha2UgdGhlIGFzcGlyYXRvciBzcGluXG4gICAgOTAgZGVncmVlcyByaWdodCBvciBsZWZ0IHJlc3BlY3RpdmVseSwgd2l0aG91dCBtb3ZpbmcgZnJvbSBpdHMgY3VycmVudFxuICAgIHNwb3QuICdBJyBtZWFucyBtb3ZlIGZvcndhcmQgb25lIHNwYWNlLCBhbmQgbWFpbnRhaW4gdGhlIHNhbWUgZGlyZWN0aW9uLlxuICAgIEFzc3VtZSB0aGF0IHRoZSBzcXVhcmUgZGlyZWN0bHkgTm9ydGggZnJvbSAoWCwgWSkgaXMgKFgsIFkrMSkuIElmIHRoZVxuICAgIHBvc2l0aW9uIGFmdGVyIHRoZSBtb3ZlbWVudCBpcyBvdXRzaWRlIHRoZSBncmlkLCB0aGUgYXNwaXJhdG9yIHdpbGwgbm90XG4gICAgbW92ZSwgcmV0YWluIGl0cyBvcmllbnRhdGlvbiBhbmQgcHJvY2VzcyB0aGUgbmV4dCBjb21tYW5kLmA7XG4gICAgdGhpcy5ET010YXJnZXQuYXBwZW5kQ2hpbGQoaW5zdHJ1Y3Rpb25zKTtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIGZvcm0uaWQgPSAnZm9ybSc7XG4gICAgdGhpcy5ET010YXJnZXQuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgY29uc3QgZ3JpZFhMYWJlbCA9IHRoaXMuY3JlYXRlTGFiZWwoJ0dyaWQgZGltZW5zaW9ucyAoWCkgOicsICdncmlkWCcpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoZ3JpZFhMYWJlbCk7XG4gICAgY29uc3QgZ3JpZFhJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXG4gICAgICAnbnVtYmVyJyxcbiAgICAgICdncmlkWCcsXG4gICAgICAnZ3JpZFgnLFxuICAgICAgJzAnLFxuICAgICAgJzknLFxuICAgICAgdHJ1ZSxcbiAgICAgICc5J1xuICAgICk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChncmlkWElucHV0KTtcbiAgICBjb25zdCBncmlkWUxhYmVsID0gdGhpcy5jcmVhdGVMYWJlbCgnR3JpZCBkaW1lbnNpb25zIChZKSA6JywgJ2dyaWRZJyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChncmlkWUxhYmVsKTtcbiAgICBjb25zdCBncmlkWUlucHV0ID0gdGhpcy5jcmVhdGVJbnB1dChcbiAgICAgICdudW1iZXInLFxuICAgICAgJ2dyaWRZJyxcbiAgICAgICdncmlkWScsXG4gICAgICAnMCcsXG4gICAgICAnOScsXG4gICAgICB0cnVlLFxuICAgICAgJzknXG4gICAgKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGdyaWRZSW5wdXQpO1xuICAgIGNvbnN0IHBvc2l0aW9uWExhYmVsID0gdGhpcy5jcmVhdGVMYWJlbCgnUG9zaXRpb24gKFgpIDonLCAncG9zaXRpb25YJyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwb3NpdGlvblhMYWJlbCk7XG4gICAgY29uc3QgcG9zaXRpb25YSW5wdXQgPSB0aGlzLmNyZWF0ZUlucHV0KFxuICAgICAgJ251bWJlcicsXG4gICAgICAncG9zaXRpb25YJyxcbiAgICAgICdwb3NpdGlvblgnLFxuICAgICAgJzAnLFxuICAgICAgJzknLFxuICAgICAgdHJ1ZSxcbiAgICAgICcwJ1xuICAgICk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChwb3NpdGlvblhJbnB1dCk7XG4gICAgY29uc3QgcG9zaXRpb25ZTGFiZWwgPSB0aGlzLmNyZWF0ZUxhYmVsKCdQb3NpdGlvbiAoWSkgOicsICdwb3NpdGlvblknKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHBvc2l0aW9uWUxhYmVsKTtcbiAgICBjb25zdCBwb3NpdGlvbllJbnB1dCA9IHRoaXMuY3JlYXRlSW5wdXQoXG4gICAgICAnbnVtYmVyJyxcbiAgICAgICdwb3NpdGlvblknLFxuICAgICAgJ3Bvc2l0aW9uWScsXG4gICAgICAnMCcsXG4gICAgICAnOScsXG4gICAgICB0cnVlLFxuICAgICAgJzAnXG4gICAgKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKHBvc2l0aW9uWUlucHV0KTtcbiAgICBjb25zdCBkaXJlY3Rpb25MYWJlbCA9IHRoaXMuY3JlYXRlTGFiZWwoJ0luaXRpYWwgZGlyZWN0aW9uIDonLCAnZGlyZWN0aW9uJyk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkaXJlY3Rpb25MYWJlbCk7XG4gICAgY29uc3QgZGlyZWN0aW9uU2VsZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgZGlyZWN0aW9uU2VsZWN0LmlkID0gJ2RpcmVjdGlvbic7XG4gICAgZGlyZWN0aW9uU2VsZWN0Lm5hbWUgPSAnZGlyZWN0aW9uJztcbiAgICBjb25zdCBkaXJlY3Rpb25PcHRpb25zID0gWydOJywgJ0UnLCAnUycsICdXJ107XG4gICAgZGlyZWN0aW9uT3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbk9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgZGlyZWN0aW9uT3B0aW9uLnZhbHVlID0gb3B0aW9uO1xuICAgICAgZGlyZWN0aW9uT3B0aW9uLnRleHRDb250ZW50ID0gb3B0aW9uO1xuICAgICAgZGlyZWN0aW9uU2VsZWN0LmFwcGVuZENoaWxkKGRpcmVjdGlvbk9wdGlvbik7XG4gICAgfSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChkaXJlY3Rpb25TZWxlY3QpO1xuICAgIGNvbnN0IGluc3RydWN0aW9uc0xhYmVsID0gdGhpcy5jcmVhdGVMYWJlbChcbiAgICAgICdJbnN0cnVjdGlvbnMgOicsXG4gICAgICAnaW5zdHJ1Y3Rpb25zJ1xuICAgICk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnN0cnVjdGlvbnNMYWJlbCk7XG4gICAgY29uc3QgaW5zdHJ1Y3Rpb25zSW5wdXQgPSB0aGlzLmNyZWF0ZUlucHV0KFxuICAgICAgJ3RleHQnLFxuICAgICAgJ2luc3RydWN0aW9ucycsXG4gICAgICAnaW5zdHJ1Y3Rpb25zJyxcbiAgICAgICcnLFxuICAgICAgJycsXG4gICAgICB0cnVlLFxuICAgICAgJ0RBREFEQURBQSdcbiAgICApO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5zdHJ1Y3Rpb25zSW5wdXQpO1xuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN1Ym1pdEJ1dHRvbi5pZCA9ICdzdWJtaXQnO1xuICAgIHN1Ym1pdEJ1dHRvbi50eXBlID0gJ3N1Ym1pdCc7XG4gICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ1N0YXJ0JztcbiAgICBmb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdyaWRDb250YWluZXIuaWQgPSAnZ3JpZENvbnRhaW5lcic7XG4gICAgZ3JpZENvbnRhaW5lci5jbGFzc05hbWUgPSAnZ3JpZCc7XG4gICAgdGhpcy5ET010YXJnZXQuYXBwZW5kQ2hpbGQoZ3JpZENvbnRhaW5lcik7XG4gIH1cblxuICBjcmVhdGVMYWJlbChsYWJlbFRleHQ6IHN0cmluZywgbGFiZWxGb3I6IHN0cmluZykge1xuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcbiAgICBsYWJlbC5odG1sRm9yID0gbGFiZWxGb3I7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgY3JlYXRlSW5wdXQoXG4gICAgaW5wdXRUeXBlOiBzdHJpbmcsXG4gICAgaW5wdXRJZDogc3RyaW5nLFxuICAgIGlucHV0TmFtZTogc3RyaW5nLFxuICAgIGlucHV0TWluOiBzdHJpbmcsXG4gICAgaW5wdXRNYXg6IHN0cmluZyxcbiAgICBpbnB1dFJlcXVpcmVkOiBib29sZWFuLFxuICAgIGlucHV0VmFsdWU6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQudHlwZSA9IGlucHV0VHlwZTtcbiAgICBpbnB1dC5pZCA9IGlucHV0SWQ7XG4gICAgaW5wdXQubmFtZSA9IGlucHV0TmFtZTtcbiAgICBpbnB1dC5taW4gPSBpbnB1dE1pbjtcbiAgICBpbnB1dC5tYXggPSBpbnB1dE1heDtcbiAgICBpbnB1dC5yZXF1aXJlZCA9IGlucHV0UmVxdWlyZWQ7XG4gICAgaW5wdXQudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgIHJldHVybiBpbnB1dDtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29udGFpbmVyOiBIVE1MRWxlbWVudCxcbiAgICBwcml2YXRlIHg6IG51bWJlcixcbiAgICBwcml2YXRlIHk6IG51bWJlclxuICApIHtcbiAgICB0aGlzLmluaXQoKTtcbiAgICB0aGlzLmRpc3BsYXkoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLng7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICByb3cuY2xhc3NOYW1lID0gJ3Jvdyc7XG4gICAgICBmb3IgKGxldCBqID0gdGhpcy55IC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdjZWxsJztcbiAgICAgICAgY2VsbC5pbm5lckhUTUwgPSAneDonICsgaS50b1N0cmluZygpICsgJyAnICsgJ3k6JyArIGoudG9TdHJpbmcoKTtcbiAgICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgfVxuICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQocm93KTtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIGRpc3BsYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyO1xuICB9XG59XG4iLCJpbXBvcnQgQ3JlYXRlRE9NIGZyb20gJy4vQ3JlYXRlRE9NJztcbmltcG9ydCBHcmlkIGZyb20gJy4vR3JpZCc7XG5cbmNvbnN0IGNyZWF0ZURPTSA9IG5ldyBDcmVhdGVET00oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcbmNvbnNvbGUubG9nKGNyZWF0ZURPTSk7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudCxcbiAgZ3JpZFhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkWCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIGdyaWRZSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZFknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvblhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblgnKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvbllJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBkaXJlY3Rpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb24nKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWRDb250YWluZXInKSxcbiAgaW5zdHJ1Y3Rpb25zSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnaW5zdHJ1Y3Rpb25zJ1xuICApIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuY29uc29sZS5sb2coXG4gIGdyaWRYSW5wdXQsXG4gIGdyaWRZSW5wdXQsXG4gIHBvc2l0aW9uWElucHV0LFxuICBwb3NpdGlvbllJbnB1dCxcbiAgZGlyZWN0aW9uSW5wdXQsXG4gIGdyaWRDb250YWluZXIsXG4gIGluc3RydWN0aW9uc0lucHV0LFxuICBzdWJtaXRCdXR0b25cbik7XG5cbmNvbnN0IHN0YXJ0ID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBncmlkWCA9IHBhcnNlSW50KGdyaWRYSW5wdXQudmFsdWUpO1xuICBjb25zdCBncmlkWSA9IHBhcnNlSW50KGdyaWRZSW5wdXQudmFsdWUpO1xuICBjb25zdCBncmlkID0gbmV3IEdyaWQoZ3JpZENvbnRhaW5lciwgZ3JpZFgsIGdyaWRZKTtcbn07XG5cbmZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0Jywgc3RhcnQpO1xuIl19
