# EasyUI

A V-framework.

EasyUI is an MVC framework without the M and without the C. It's without a model, only abstracting away from the view, namely the document object model. There is some irony here. It's without a controller, or whatever. It will not help you with the architecture of your large application. It is about the leaves of an application, not its branches. 

It abstracts away from the DOM to provide a set of classes for elements such as buttons, links, etc. It covers up some of the more idiosyncratic syntax from the JavaScript browser API and is hopefully a bit more readable. 

## Related projects

- [EasyUI-JSX](https://github.com/djalbat/EasyUI-JSX) JSX support for Easy-UI.
- [EasyUI-Layout](https://github.com/djalbat/EasyUI-Layout) Layout elements that work with CSS flexbox.
- [EasyUI-DragAndDrop](https://github.com/djalbat/EasyUI-DragAndDrop) Drag and drop elements including an explorer and a rubbish bin.
- [EasyUI-RichTextArea](https://github.com/djalbat/EasyUI-RichTextArea) A textarea component that handles and hands off events well.

### Are these projects actually used anywhere?

Actually they are, here:

- [Occam Proof Assistant](http://djalbat.com/occam)

## Installation

You can install EasyUI with [npm](https://www.npmjs.com/):

    npm install easyui

You can also clone the repository with [Git](https://git-scm.com/)...

    git clone https://github.com/djalbat/EasyUI.git

...and then install the necessary modules with npm from within the project's root directory:

    npm install

You will need to do this if you want to look at the examples.

## Usage

If you are building with [Node.js](http://nodejs.org) the usage is as follows:

```js
const easyui = require('easyui'),
      Select = easyui.Select,
      Checkbox = easyui.Checkbox;
```

To use EasyUI in the browser, take the `easyui.js` file from the project's `dist/` directory and put it somewhere such as a `public/scripts/lib` directory. Referencing this distribution file from a `script` element...

```html
<script src="scripts/lib/easyui.js"> </script>
```

...will give you a global `easyui` variable which can be used directly:

```js
const Button = easyui.Button;
```

Alternatively, if you are using an AMD style `require` the usage is similar to the Node.js case, only make sure that the path to the distribution file is correct. The following script should work, assuming it lives in the the `public/scripts/` directory:

```js
const easyui = require('lib/easyui'),
      Button = easyui.Button;
```

## Compiling from source

Automation is done with [npm scripts](https://docs.npmjs.com/misc/scripts), have a look at the `package.json` file. The pertinent commands are:

    npm run build-debug
    npm run watch-debug

## Creating elements

You can pass CSS-style selectors to constructors:

```js
const link = new Link('#link', function(href) {
  console.log('Link click with href ' + href);
});
```

You can also use existing DOM elements or HTML snippets with the static `fromDOMElement()` or `fromHTML()` factory methods of the relevant class, respectively:

```js
const bodyDOMElements = document.getElementsByTagName('body'),
      firstBodyDOMElement = first(bodyDOMElements),
      bodyDOMElement = firstBodyDOMElement;
    
const body = Body.fromDOMElement(bodyDOMElement),
      checkbox = Checkbox.fromHTML('<input type="checkbox" />');
```

Note that `document` here is the global document reference, not EasyUI's `document` singleton.

If constructors take handlers or other additional arguments, you can pass these to the corresponding `fromDOMElement()` or `fromHTML()` factory methods and they will be passed on the constructor. 

## Cloning elements

You can call the `clone()` method of an element to clone it, or the equivalent static factory method. In either case, if the original element has an `id` attribute, it is best to remove this from the cloned element:
 
```js
const button = new Button('#button'),
      clonedButton1 = button.clone(),
      clonedButton2 = Button.clone(button)
     
clonedButton1.removeAttribute('id');
clonedButton2.removeAttribute('id');
```

As in the case of `fromDOMElement()` and `fromHTML()` factory methods, the `clone()` methods will pass additional arguments on to the corresponding constructor. Note that when you clone an element you will need to re-register handlers. 

## Adding elements to the DOM
 
The methods to add elements to the DOM are hopefully intuitive. Note the difference between the `append()` and `appendTo()` methods:

```js
const body = new Body(),
      form = Element.fromHTML('<form></form>');

body.append(form); // what you want, the form element becomes a child of the body element

form.appendTo(body); // also what you want, the form element becomes a child of the body element
```

Similarly for the prepend methods.

## Supported elements

-  Body
-  Div
-  Span
-  Button
-  Checkbox
-  Input
-  Link
-  TextArea
-  Select
-  window
-  document

The `Window` and `Document` classes are not exported, only singletons, hence the lowercase. 

Obviously the list is incomplete. If you do not want to roll your own classes, use the `Element` class:

```js
const br = Element.fromHTML('<br />');
```

## Rolling your own classes

Using the existing `Div` class as an example:

```js
const Element = require('../element');

class Div extends Element {
  constructor(selector) {
    super(selector);
  }

  clone() { return Div.clone(this); }
  
  ...

  static clone(element) {
    return Element.clone(Div, element);
  }

  static fromHTML(html) {
    return Element.fromHTML(Div, html);
  }

  static fromDOMElement(domElement) {
    return Element.fromDOMElement(Div, domElement);
  }
}
```

You can then use the private `domElement` property to create methods that abstract away from DOM functionality.
    
## Standard methods

Each class bar the `Window` and `Document` classes has the following methods. They are taken from the `Element` class and are overridden in many cases, in which case the signatures may change:

- `getOffset()`
- `getBounds(includeBorder = false)`
- `getWidth(includeBorder = false)`
- `setWidth(width)`
- `getHeight(includeBorder = false)`
- `setHeight(height)`
- `getAttribute(name)`
- `setAttribute(name, value)`
- `clearAttribute(name)`
- `addAttribute(name, value)`
- `removeAttribute(name)`
- `setClass(className)`
- `addClass(className)`
- `removeClass(className)`
- `toggleClass(className)`
- `hasClass(className)`
- `clearClasses()`
- `prepend(elementOrString)`
- `append(elementOrString)`
- `appendTo(parentElement)`
- `prependTo(parentElement)`
- `removeFrom(parentElement)`
- `remove(element)`
- `insertBefore(siblingElement)`
- `insertAfter(siblingElement)`
- `show(displayStyle = 'block')`
- `hide()`
- `enable()`
- `disable()`
- `html(html)`
- `css(css)`
- `getDescendantElements(selector = '*')`
- `getChildElements(selector = '*')`
- `getParentElement(selector = '*')`
- `getAscendantElements(selector = '*')`
- `on(eventTypes, handler, preventDefault = false)`
- `off(eventTypes, handler)`
- `onClick(handler, preventDefault)`
- `offClick(handler)`
- `onMouseUp(handler, preventDefault)`
- `onMouseDown(handler, preventDefault)`
- `onMouseOver(handler, preventDefault)`
- `onMouseOut(handler, preventDefault)`
- `onMouseMove(handler, preventDefault)`
- `offMouseUp(handler)`
- `offMouseDown(handler)`
- `offMouseOver(handler)`
- `offMouseOut(handler)`
- `offMouseMove(handler)`
- `onResize(handler)`
- `offResize(handler)`

The `html()` and `css()` methods allow you to both get and set HTML and CSS, respectively.

Aside from the above methods there are the aforementioned static factory methods.
 
- `static clone(Class, element, ...remainingArguments)`
- `static fromHTML(Class, html, ...remainingArguments)`
- `static fromDOMElement(Class, domElement, ...remainingArguments)`

Again bear in mind that the signatures will change for classes that inherit from the `Element` class.

The `Link`, `Input`, `Select`, `Button`, `Checkbox` and `Textarea` classes have the following additional methods:

- `hasFocus`
- `focus`

The `Checkbox` class has the following additional methods:

- `onChange(handler)`
- `check(checked = true)`
- `isChecked()`

The `Input` class has the following additional methods:

- `getValue()`
- `getSelectionStart()`
- `getSelectionEnd()`
- `setValue(value)`
- `setSelectionStart(selectionStart)`
- `setSelectionEnd(selectionEnd)`
- `onChange(handler)`
- `offChange(handler)`

The `Select` class has the following additional methods:

- `getSelectedOptionValue()`
- `setSelectedOptionByValue(value)`
- `onChange(handler)`
- `offChange(handler)`
  
The `TextArea` class has the following additional methods:
  
- `getValue()`
- `getSelectionStart()`
- `getSelectionEnd()`
- `getScrollTop()`
- `getScrollLeft()`
- `setValue(value)`
- `setSelectionStart(selectionStart)`
- `setSelectionEnd(selectionEnd)`
- `setScrollTop(scrollTop)`
- `setScrollLeft(scrollLeft)`
- `onChange(handler)`
- `offChange(handler)`
- `onScroll(handler)`
- `offScroll(handler)`
- `onResize(resizeHandler)`
- `offResize(resizeHandler)`

Both the `Window` and `Document` singletons have the following methods:

- `on(eventTypes, handler, preventDefault = false)`
- `off(eventTypes, handler)`
- `onClick(handler, preventDefault)`
- `onMouseUp(handler, preventDefault)`
- `onMouseDown(handler, preventDefault)`
- `onMouseOver(handler, preventDefault)`
- `onMouseOut(handler, preventDefault)`
- `onMouseMove(handler, preventDefault)`
- `offClick(handler)`
- `offMouseUp(handler)`
- `offMouseDown(handler)`
- `offMouseOver(handler)`
- `offMouseOut(handler)`
- `offMouseMove(handler)`

The `Window` class, but not the `Document` class, has the following methods:

- `onResize`
- `offResize`

Remember that the `Window` and `Document` classes are exported as singletons.

## Contact

- james.smith@djalbat.com
- http://djalbat.com
