'use strict';

class mouse {
  static initialise(element) {
    element.onMouseUp = onMouseUp;
    element.onMouseDown = onMouseDown;
    element.onMouseOver = onMouseOver;
    element.onMouseOut = onMouseOut;
    element.onMouseMove = onMouseMove;

    element.offMouseUp = offMouseUp;
    element.offMouseDown = offMouseDown;
    element.offMouseOver = offMouseOver;
    element.offMouseOut = offMouseOut;
    element.offMouseMove = offMouseMove;
  }
}

module.exports = mouse;

function onMouseUp(mouseUpHandler, namespace) { this.on('mouseup', adjustMouseEvent(mouseUpHandler), namespace); }
function onMouseDown(mouseDownHandler, namespace) { this.on('mousedown', adjustMouseEvent(mouseDownHandler), namespace); }
function onMouseOver(mouseOverHandler, namespace) { this.on('mouseover', adjustMouseEvent(mouseOverHandler), namespace); }
function onMouseOut(mouseOutHandler, namespace) { this.on('mouseout', adjustMouseEvent(mouseOutHandler), namespace); }
function onMouseMove(mouseMoveHandler, namespace) { this.on('mousemove', adjustMouseEvent(mouseMoveHandler), namespace); }

function offMouseUp(namespace) { this.off('mouseup', namespace); }
function offMouseDown(namespace) { this.off('mousedown', namespace); }
function offMouseOver(namespace) { this.off('mouseover', namespace); }
function offMouseOut(namespace) { this.off('mouseout', namespace); }
function offMouseMove(namespace) { this.off('mousemove', namespace); }

function adjustMouseEvent(handler) {
  return function(event) {
    var mouseTop = event.pageY,  ///
        mouseLeft = event.pageX, ///
        mouseButton = event.which; ///

    handler(mouseTop, mouseLeft, mouseButton);
  };
}
