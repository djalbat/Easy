'use strict';

var Element = require('./element');

class InputElement extends Element {
  constructor(selector) {
    super(selector);
  }

  hasFocus() {
    var focused = (document.activeElement === this.$element[0]);  ///

    return focused;
  }

  onFocus(focusHandler) {
    this.$element.focus(focusHandler);
  }

  onBlur(blurHandler) {
    this.$element.blur(blurHandler);
  }

  focus() {
    this.$element.focus();
  }
}

module.exports = InputElement;
