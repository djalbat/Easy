'use strict';

class Bounds {
  constructor(top, left, bottom, right) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  getTop() {
    return this.top;
  }

  getLeft() {
    return this.left;
  }

  getBottom() {
    return this.bottom;
  }

  getRight() {
    return this.right;
  }

  isOverlappingMouse(mouseTop, mouseLeft) {
    return (  (this.top < mouseTop) &&
              (this.left < mouseLeft) &&
              (this.bottom > mouseTop) &&
              (this.right > mouseLeft)  );
  }

  areOverlapping(bounds) {
    return (  (this.top < bounds.bottom) &&
              (this.left < bounds.right) &&
              (this.bottom > bounds.top) &&
              (this.right > bounds.left)  );
  }

  static fromBoundingClientRect(boundingClientRect) {
    const windowScrollTop = window.pageYOffset, ///
          windowScrollLeft = window.pageXOffset,  ///
          top = boundingClientRect.top + windowScrollTop,
          left = boundingClientRect.left + windowScrollLeft,
          bottom = boundingClientRect.bottom + windowScrollTop,
          right = boundingClientRect.right + windowScrollLeft,
          bounds = new Bounds(top, left, bottom, right);

    return bounds;
  }
}

module.exports = Bounds;
