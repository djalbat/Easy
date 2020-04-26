"use strict";

import InputElement from "../inputElement";

export default class Input extends InputElement {
  clone(changeHandler) { return Input.clone(this, changeHandler); }

  static tagName = "input";

  static clone(element, changeHandler) { return InputElement.clone(Input, element, changeHandler); }

  static fromHTML(html, changeHandler) { return InputElement.fromHTML(Input, html, changeHandler); }

  static fromDOMElement(domElement, changeHandler) { return InputElement.fromDOMElement(Input, domElement, changeHandler); }

  static fromProperties(properties) { return InputElement.fromProperties(Input, properties); }
}
