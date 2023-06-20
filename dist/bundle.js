(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
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
exports.Grid = Grid;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Grid_1 = require("./Grid");
var form = document.getElementById('form'), gridXInput = document.getElementById('gridX'), gridYInput = document.getElementById('gridY'), positionXInput = document.getElementById('positionX'), positionYInput = document.getElementById('positionY'), directionInput = document.getElementById('direction'), gridContainer = document.getElementById('gridContainer'), instructionsInput = document.getElementById('instructions'), submitButton = document.getElementById('submit');
console.log(gridXInput, gridYInput, positionXInput, positionYInput, directionInput, gridContainer, instructionsInput, submitButton);
var start = function (e) {
    e.preventDefault();
    var gridX = parseInt(gridXInput.value);
    var gridY = parseInt(gridYInput.value);
    new Grid_1.Grid(gridContainer, gridX, gridY);
};
form.addEventListener('submit', start);

},{"./Grid":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR3JpZC50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBO0lBQ0UsY0FDVSxTQUFzQixFQUN0QixDQUFTLEVBQ1QsQ0FBUztRQUZULGNBQVMsR0FBVCxTQUFTLENBQWE7UUFDdEIsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUNULE1BQUMsR0FBRCxDQUFDLENBQVE7UUFFakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxtQkFBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9CLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqRSxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsb0JBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsc0JBQU8sR0FBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0gsV0FBQztBQUFELENBaENBLEFBZ0NDLElBQUE7QUFoQ1ksb0JBQUk7Ozs7O0FDQWpCLCtCQUE4QjtBQUU5QixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBb0IsRUFDN0QsVUFBVSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFxQixFQUNqRSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXFCLEVBQ2pFLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsRUFDekUsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFxQixFQUN6RSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLEVBQ3pFLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUN4RCxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUN6QyxjQUFjLENBQ0ssRUFDckIsWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFzQixDQUFDO0FBRXhFLE9BQU8sQ0FBQyxHQUFHLENBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixjQUFjLEVBQ2QsY0FBYyxFQUNkLGNBQWMsRUFDZCxhQUFhLEVBQ2IsaUJBQWlCLEVBQ2pCLFlBQVksQ0FDYixDQUFDO0FBRUYsSUFBTSxLQUFLLEdBQUcsVUFBQyxDQUFhO0lBQzFCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsSUFBSSxXQUFJLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUM7QUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGNsYXNzIEdyaWQge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgcHJpdmF0ZSB4OiBudW1iZXIsXG4gICAgcHJpdmF0ZSB5OiBudW1iZXJcbiAgKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5kaXNwbGF5KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy54OyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcm93LmNsYXNzTmFtZSA9ICdyb3cnO1xuICAgICAgZm9yIChsZXQgaiA9IHRoaXMueSAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSAnY2VsbCc7XG4gICAgICAgIGNlbGwuaW5uZXJIVE1MID0gJ3g6JyArIGkudG9TdHJpbmcoKSArICcgJyArICd5OicgKyBqLnRvU3RyaW5nKCk7XG4gICAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHJvdyk7XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICBkaXNwbGF5KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lcjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgR3JpZCB9IGZyb20gJy4vR3JpZCc7XG5cbmNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudCxcbiAgZ3JpZFhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkWCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIGdyaWRZSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZFknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvblhJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblgnKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBwb3NpdGlvbllJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3NpdGlvblknKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBkaXJlY3Rpb25JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb24nKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxuICBncmlkQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWRDb250YWluZXInKSxcbiAgaW5zdHJ1Y3Rpb25zSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnaW5zdHJ1Y3Rpb25zJ1xuICApIGFzIEhUTUxJbnB1dEVsZW1lbnQsXG4gIHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXQnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcblxuY29uc29sZS5sb2coXG4gIGdyaWRYSW5wdXQsXG4gIGdyaWRZSW5wdXQsXG4gIHBvc2l0aW9uWElucHV0LFxuICBwb3NpdGlvbllJbnB1dCxcbiAgZGlyZWN0aW9uSW5wdXQsXG4gIGdyaWRDb250YWluZXIsXG4gIGluc3RydWN0aW9uc0lucHV0LFxuICBzdWJtaXRCdXR0b25cbik7XG5cbmNvbnN0IHN0YXJ0ID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBncmlkWCA9IHBhcnNlSW50KGdyaWRYSW5wdXQudmFsdWUpO1xuICBjb25zdCBncmlkWSA9IHBhcnNlSW50KGdyaWRZSW5wdXQudmFsdWUpO1xuICBuZXcgR3JpZChncmlkQ29udGFpbmVyLCBncmlkWCwgZ3JpZFkpO1xufTtcblxuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBzdGFydCk7XG4iXX0=
