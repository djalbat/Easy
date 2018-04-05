'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TextElement = require('../textElement'),
    arrayUtilities = require('../utilities/array'),
    objectUtilities = require('../utilities/object');

var first = arrayUtilities.first,
    combine = objectUtilities.combine,
    prune = objectUtilities.prune;


function applyProperties() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProperties = arguments[1];
  var ignoredProperties = arguments[2];

  combine(properties, defaultProperties);

  var element = this,
      ///
  childElements = childElementsFromElementAndProperties(element, properties);

  prune(properties, ignoredProperties);

  var names = Object.keys(properties); ///

  names.forEach(function (name) {
    var value = properties[name];

    if (false) {} else if (isHandlerName(name)) {
      addHandler(this, name, value);
    } else if (isAttributeName(name)) {
      addAttribute(this, name, value);
    } else {
      if (!this.hasOwnProperty('properties')) {
        var _properties = {};

        Object.assign(this, {
          properties: _properties
        });
      }

      this.properties[name] = value;
    }
  }.bind(this));

  var parentElement = this; ///

  childElements.forEach(function (childElement) {
    updateParentElementContext(childElement, parentElement);

    childElement.addTo(parentElement);
  }.bind(this));
}

function getProperties() {
  return this.properties;
}

function getContext() {
  return this.context;
}

function getState() {
  return this.state;
}

function setState(state) {
  this.state = state;
}

function fromState(name) {
  var value = this.state[name];

  return value;
}

function updateState(update) {
  Object.assign(this.state, update);
}

function assignContext(names, thenDelete) {
  var argumentsLength = arguments.length;

  if (argumentsLength === 1) {
    var firstArgument = first(arguments);

    if (typeof firstArgument === 'boolean') {
      names = Object.keys(this.context);

      thenDelete = firstArgument;
    } else {
      thenDelete = true;
    }
  }

  if (argumentsLength === 0) {
    names = Object.keys(this.context);

    thenDelete = true;
  }

  names.forEach(function (name) {
    var value = this.context[name],
        propertyName = name,
        ///
    descriptor = {
      value: value
    };

    Object.defineProperty(this, propertyName, descriptor);

    if (thenDelete) {
      delete this.context[name];
    }
  }.bind(this), []);
}

module.exports = {
  applyProperties: applyProperties,
  getProperties: getProperties,
  getContext: getContext,
  getState: getState,
  setState: setState,
  fromState: fromState,
  updateState: updateState,
  assignContext: assignContext
};

function updateParentElementContext(childElement, parentElement) {
  var parentContext = typeof childElement.parentContext === 'function' ? childElement.parentContext() : childElement.context;

  parentElement.context = Object.assign({}, parentElement.context, parentContext);

  delete childElement.context;
}

function childElementsFromElementAndProperties(element, properties) {
  var childElements = typeof element.childElements === 'function' ? element.childElements(properties) : properties.childElements;

  childElements = childElements !== undefined ? childElements instanceof Array ? childElements : [childElements] : [];

  childElements = childElements.map(function (childElement) {
    if (typeof childElement === 'string') {
      var text = childElement,
          ///
      textElement = new TextElement(text);

      childElement = textElement; ///
    }

    return childElement;
  });

  return childElements;
}

function addHandler(element, name, value) {
  var eventType = name.substr(2).toLowerCase(),
      ///
  handler = value; ///

  element.on(eventType, handler);
}

function addAttribute(element, name, value) {
  if (name === 'className') {
    name = 'class';
  }

  if (name === 'htmlFor') {
    name = 'for';
  }

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var keys = Object.keys(value);

    keys.forEach(function (key) {
      element.domElement[name][key] = value[key];
    }.bind(this));
  } else if (typeof value === 'boolean') {
    if (value) {
      value = name; ///

      element.addAttribute(name, value);
    }
  } else {
    element.addAttribute(name, value);
  }
}

function isHandlerName(name) {
  return name.match(/^on/);
}

function isAttributeName(name) {
  return attributeNames.includes(name);
}

var attributeNames = ['accept', 'acceptCharset', 'accessKey', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'challenge', 'charSet', 'checked', 'cite', 'classID', 'className', 'colSpan', 'cols', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'dir', 'disabled', 'download', 'draggable', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'hidden', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'icon', 'id', 'inputMode', 'integrity', 'is', 'keyParams', 'keyType', 'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'noValidate', 'nonce', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'profile', 'radioGroup', 'readOnly', 'rel', 'required', 'reversed', 'role', 'rowSpan', 'rows', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'style', 'summary', 'tabIndex', 'target', 'title', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9taXhpbnMvanN4LmpzIl0sIm5hbWVzIjpbIlRleHRFbGVtZW50IiwicmVxdWlyZSIsImFycmF5VXRpbGl0aWVzIiwib2JqZWN0VXRpbGl0aWVzIiwiZmlyc3QiLCJjb21iaW5lIiwicHJ1bmUiLCJhcHBseVByb3BlcnRpZXMiLCJwcm9wZXJ0aWVzIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJpZ25vcmVkUHJvcGVydGllcyIsImVsZW1lbnQiLCJjaGlsZEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyIsIm5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwidmFsdWUiLCJpc0hhbmRsZXJOYW1lIiwiYWRkSGFuZGxlciIsImlzQXR0cmlidXRlTmFtZSIsImFkZEF0dHJpYnV0ZSIsImhhc093blByb3BlcnR5IiwiYXNzaWduIiwiYmluZCIsInBhcmVudEVsZW1lbnQiLCJjaGlsZEVsZW1lbnQiLCJ1cGRhdGVQYXJlbnRFbGVtZW50Q29udGV4dCIsImFkZFRvIiwiZ2V0UHJvcGVydGllcyIsImdldENvbnRleHQiLCJjb250ZXh0IiwiZ2V0U3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwiZnJvbVN0YXRlIiwidXBkYXRlU3RhdGUiLCJ1cGRhdGUiLCJhc3NpZ25Db250ZXh0IiwidGhlbkRlbGV0ZSIsImFyZ3VtZW50c0xlbmd0aCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImZpcnN0QXJndW1lbnQiLCJwcm9wZXJ0eU5hbWUiLCJkZXNjcmlwdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJtb2R1bGUiLCJleHBvcnRzIiwicGFyZW50Q29udGV4dCIsInVuZGVmaW5lZCIsIkFycmF5IiwibWFwIiwidGV4dCIsInRleHRFbGVtZW50IiwiZXZlbnRUeXBlIiwic3Vic3RyIiwidG9Mb3dlckNhc2UiLCJoYW5kbGVyIiwib24iLCJrZXkiLCJkb21FbGVtZW50IiwibWF0Y2giLCJhdHRyaWJ1dGVOYW1lcyIsImluY2x1ZGVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7OztBQUVBLElBQU1BLGNBQWNDLFFBQVEsZ0JBQVIsQ0FBcEI7QUFBQSxJQUNNQyxpQkFBaUJELFFBQVEsb0JBQVIsQ0FEdkI7QUFBQSxJQUVNRSxrQkFBa0JGLFFBQVEscUJBQVIsQ0FGeEI7O0FBSU0sSUFBRUcsS0FBRixHQUFZRixjQUFaLENBQUVFLEtBQUY7QUFBQSxJQUNFQyxPQURGLEdBQ3FCRixlQURyQixDQUNFRSxPQURGO0FBQUEsSUFDV0MsS0FEWCxHQUNxQkgsZUFEckIsQ0FDV0csS0FEWDs7O0FBR04sU0FBU0MsZUFBVCxHQUFnRjtBQUFBLE1BQXZEQyxVQUF1RCx1RUFBMUMsRUFBMEM7QUFBQSxNQUF0Q0MsaUJBQXNDO0FBQUEsTUFBbkJDLGlCQUFtQjs7QUFDOUVMLFVBQVFHLFVBQVIsRUFBb0JDLGlCQUFwQjs7QUFFQSxNQUFNRSxVQUFVLElBQWhCO0FBQUEsTUFBc0I7QUFDaEJDLGtCQUFnQkMsc0NBQXNDRixPQUF0QyxFQUErQ0gsVUFBL0MsQ0FEdEI7O0FBR0FGLFFBQU1FLFVBQU4sRUFBa0JFLGlCQUFsQjs7QUFFQSxNQUFNSSxRQUFRQyxPQUFPQyxJQUFQLENBQVlSLFVBQVosQ0FBZCxDQVI4RSxDQVF0Qzs7QUFFeENNLFFBQU1HLE9BQU4sQ0FBYyxVQUFTQyxJQUFULEVBQWU7QUFDM0IsUUFBTUMsUUFBUVgsV0FBV1UsSUFBWCxDQUFkOztBQUVBLFFBQUksS0FBSixFQUFXLENBRVYsQ0FGRCxNQUVPLElBQUlFLGNBQWNGLElBQWQsQ0FBSixFQUF5QjtBQUM5QkcsaUJBQVcsSUFBWCxFQUFpQkgsSUFBakIsRUFBdUJDLEtBQXZCO0FBQ0QsS0FGTSxNQUVBLElBQUlHLGdCQUFnQkosSUFBaEIsQ0FBSixFQUEyQjtBQUNoQ0ssbUJBQWEsSUFBYixFQUFtQkwsSUFBbkIsRUFBeUJDLEtBQXpCO0FBQ0QsS0FGTSxNQUVBO0FBQ0wsVUFBSSxDQUFDLEtBQUtLLGNBQUwsQ0FBb0IsWUFBcEIsQ0FBTCxFQUF3QztBQUN0QyxZQUFNaEIsY0FBYSxFQUFuQjs7QUFFQU8sZUFBT1UsTUFBUCxDQUFjLElBQWQsRUFBb0I7QUFDbEJqQixzQkFBWUE7QUFETSxTQUFwQjtBQUdEOztBQUVELFdBQUtBLFVBQUwsQ0FBZ0JVLElBQWhCLElBQXdCQyxLQUF4QjtBQUNEO0FBQ0YsR0FwQmEsQ0FvQlpPLElBcEJZLENBb0JQLElBcEJPLENBQWQ7O0FBc0JBLE1BQU1DLGdCQUFnQixJQUF0QixDQWhDOEUsQ0FnQ2xEOztBQUU1QmYsZ0JBQWNLLE9BQWQsQ0FBc0IsVUFBU1csWUFBVCxFQUF1QjtBQUMzQ0MsK0JBQTJCRCxZQUEzQixFQUF5Q0QsYUFBekM7O0FBRUFDLGlCQUFhRSxLQUFiLENBQW1CSCxhQUFuQjtBQUNELEdBSnFCLENBSXBCRCxJQUpvQixDQUlmLElBSmUsQ0FBdEI7QUFLRDs7QUFFRCxTQUFTSyxhQUFULEdBQXlCO0FBQ3ZCLFNBQU8sS0FBS3ZCLFVBQVo7QUFDRDs7QUFFRCxTQUFTd0IsVUFBVCxHQUFzQjtBQUNwQixTQUFPLEtBQUtDLE9BQVo7QUFDRDs7QUFFRCxTQUFTQyxRQUFULEdBQW9CO0FBQ2xCLFNBQU8sS0FBS0MsS0FBWjtBQUNEOztBQUVELFNBQVNDLFFBQVQsQ0FBa0JELEtBQWxCLEVBQXlCO0FBQ3ZCLE9BQUtBLEtBQUwsR0FBYUEsS0FBYjtBQUNEOztBQUVELFNBQVNFLFNBQVQsQ0FBbUJuQixJQUFuQixFQUF5QjtBQUN2QixNQUFNQyxRQUFRLEtBQUtnQixLQUFMLENBQVdqQixJQUFYLENBQWQ7O0FBRUEsU0FBT0MsS0FBUDtBQUNEOztBQUVELFNBQVNtQixXQUFULENBQXFCQyxNQUFyQixFQUE2QjtBQUMzQnhCLFNBQU9VLE1BQVAsQ0FBYyxLQUFLVSxLQUFuQixFQUEwQkksTUFBMUI7QUFDRDs7QUFFRCxTQUFTQyxhQUFULENBQXVCMUIsS0FBdkIsRUFBOEIyQixVQUE5QixFQUEwQztBQUN4QyxNQUFNQyxrQkFBa0JDLFVBQVVDLE1BQWxDOztBQUVBLE1BQUlGLG9CQUFvQixDQUF4QixFQUEyQjtBQUN6QixRQUFNRyxnQkFBZ0J6QyxNQUFNdUMsU0FBTixDQUF0Qjs7QUFFQSxRQUFJLE9BQU9FLGFBQVAsS0FBeUIsU0FBN0IsRUFBd0M7QUFDdEMvQixjQUFRQyxPQUFPQyxJQUFQLENBQVksS0FBS2lCLE9BQWpCLENBQVI7O0FBRUFRLG1CQUFhSSxhQUFiO0FBQ0QsS0FKRCxNQUlPO0FBQ0xKLG1CQUFhLElBQWI7QUFDRDtBQUNGOztBQUVELE1BQUlDLG9CQUFvQixDQUF4QixFQUEyQjtBQUN6QjVCLFlBQVFDLE9BQU9DLElBQVAsQ0FBWSxLQUFLaUIsT0FBakIsQ0FBUjs7QUFFQVEsaUJBQWEsSUFBYjtBQUNEOztBQUVEM0IsUUFBTUcsT0FBTixDQUFjLFVBQVNDLElBQVQsRUFBZTtBQUMzQixRQUFNQyxRQUFRLEtBQUtjLE9BQUwsQ0FBYWYsSUFBYixDQUFkO0FBQUEsUUFDTTRCLGVBQWU1QixJQURyQjtBQUFBLFFBQzRCO0FBQ3RCNkIsaUJBQWE7QUFDWDVCLGFBQU9BO0FBREksS0FGbkI7O0FBTUFKLFdBQU9pQyxjQUFQLENBQXNCLElBQXRCLEVBQTRCRixZQUE1QixFQUEwQ0MsVUFBMUM7O0FBRUEsUUFBSU4sVUFBSixFQUFnQjtBQUNkLGFBQU8sS0FBS1IsT0FBTCxDQUFhZixJQUFiLENBQVA7QUFDRDtBQUNGLEdBWmEsQ0FZWlEsSUFaWSxDQVlQLElBWk8sQ0FBZCxFQVljLEVBWmQ7QUFhRDs7QUFFRHVCLE9BQU9DLE9BQVAsR0FBaUI7QUFDZjNDLG1CQUFpQkEsZUFERjtBQUVmd0IsaUJBQWVBLGFBRkE7QUFHZkMsY0FBWUEsVUFIRztBQUlmRSxZQUFVQSxRQUpLO0FBS2ZFLFlBQVVBLFFBTEs7QUFNZkMsYUFBV0EsU0FOSTtBQU9mQyxlQUFhQSxXQVBFO0FBUWZFLGlCQUFlQTtBQVJBLENBQWpCOztBQVdBLFNBQVNYLDBCQUFULENBQW9DRCxZQUFwQyxFQUFrREQsYUFBbEQsRUFBaUU7QUFDL0QsTUFBTXdCLGdCQUFpQixPQUFPdkIsYUFBYXVCLGFBQXBCLEtBQXNDLFVBQXZDLEdBQ0V2QixhQUFhdUIsYUFBYixFQURGLEdBRUl2QixhQUFhSyxPQUZ2Qzs7QUFJQU4sZ0JBQWNNLE9BQWQsR0FBd0JsQixPQUFPVSxNQUFQLENBQWMsRUFBZCxFQUFrQkUsY0FBY00sT0FBaEMsRUFBeUNrQixhQUF6QyxDQUF4Qjs7QUFFQSxTQUFPdkIsYUFBYUssT0FBcEI7QUFDRDs7QUFFRCxTQUFTcEIscUNBQVQsQ0FBK0NGLE9BQS9DLEVBQXdESCxVQUF4RCxFQUFvRTtBQUNsRSxNQUFJSSxnQkFBaUIsT0FBT0QsUUFBUUMsYUFBZixLQUFpQyxVQUFsQyxHQUNFRCxRQUFRQyxhQUFSLENBQXNCSixVQUF0QixDQURGLEdBRUlBLFdBQVdJLGFBRm5DOztBQUlBQSxrQkFBaUJBLGtCQUFrQndDLFNBQW5CLEdBQ0d4Qyx5QkFBeUJ5QyxLQUExQixHQUNHekMsYUFESCxHQUVJLENBQUNBLGFBQUQsQ0FITixHQUlRLEVBSnhCOztBQU1BQSxrQkFBZ0JBLGNBQWMwQyxHQUFkLENBQWtCLFVBQVMxQixZQUFULEVBQXVCO0FBQ3ZELFFBQUksT0FBT0EsWUFBUCxLQUF3QixRQUE1QixFQUFzQztBQUNwQyxVQUFNMkIsT0FBTzNCLFlBQWI7QUFBQSxVQUE0QjtBQUN0QjRCLG9CQUFjLElBQUl4RCxXQUFKLENBQWdCdUQsSUFBaEIsQ0FEcEI7O0FBR0EzQixxQkFBZTRCLFdBQWYsQ0FKb0MsQ0FJUjtBQUM3Qjs7QUFFRCxXQUFPNUIsWUFBUDtBQUNELEdBVGUsQ0FBaEI7O0FBV0EsU0FBT2hCLGFBQVA7QUFDRDs7QUFFRCxTQUFTUyxVQUFULENBQW9CVixPQUFwQixFQUE2Qk8sSUFBN0IsRUFBbUNDLEtBQW5DLEVBQTBDO0FBQ3hDLE1BQU1zQyxZQUFZdkMsS0FBS3dDLE1BQUwsQ0FBWSxDQUFaLEVBQWVDLFdBQWYsRUFBbEI7QUFBQSxNQUFnRDtBQUMxQ0MsWUFBVXpDLEtBRGhCLENBRHdDLENBRWhCOztBQUV4QlIsVUFBUWtELEVBQVIsQ0FBV0osU0FBWCxFQUFzQkcsT0FBdEI7QUFDRDs7QUFFRCxTQUFTckMsWUFBVCxDQUFzQlosT0FBdEIsRUFBK0JPLElBQS9CLEVBQXFDQyxLQUFyQyxFQUE0QztBQUMxQyxNQUFJRCxTQUFTLFdBQWIsRUFBMEI7QUFDeEJBLFdBQU8sT0FBUDtBQUNEOztBQUVELE1BQUlBLFNBQVMsU0FBYixFQUF3QjtBQUN0QkEsV0FBTyxLQUFQO0FBQ0Q7O0FBRUQsTUFBSSxRQUFPQyxLQUFQLHlDQUFPQSxLQUFQLE9BQWlCLFFBQXJCLEVBQStCO0FBQzdCLFFBQU1ILE9BQU9ELE9BQU9DLElBQVAsQ0FBWUcsS0FBWixDQUFiOztBQUVBSCxTQUFLQyxPQUFMLENBQWEsVUFBVTZDLEdBQVYsRUFBZTtBQUMxQm5ELGNBQVFvRCxVQUFSLENBQW1CN0MsSUFBbkIsRUFBeUI0QyxHQUF6QixJQUFnQzNDLE1BQU0yQyxHQUFOLENBQWhDO0FBQ0QsS0FGWSxDQUVYcEMsSUFGVyxDQUVOLElBRk0sQ0FBYjtBQUdELEdBTkQsTUFNTyxJQUFJLE9BQU9QLEtBQVAsS0FBaUIsU0FBckIsRUFBZ0M7QUFDckMsUUFBSUEsS0FBSixFQUFXO0FBQ1RBLGNBQVFELElBQVIsQ0FEUyxDQUNLOztBQUVkUCxjQUFRWSxZQUFSLENBQXFCTCxJQUFyQixFQUEyQkMsS0FBM0I7QUFDRDtBQUNGLEdBTk0sTUFNQTtBQUNMUixZQUFRWSxZQUFSLENBQXFCTCxJQUFyQixFQUEyQkMsS0FBM0I7QUFDRDtBQUNGOztBQUVELFNBQVNDLGFBQVQsQ0FBdUJGLElBQXZCLEVBQTZCO0FBQzNCLFNBQU9BLEtBQUs4QyxLQUFMLENBQVcsS0FBWCxDQUFQO0FBQ0Q7O0FBRUQsU0FBUzFDLGVBQVQsQ0FBeUJKLElBQXpCLEVBQStCO0FBQzdCLFNBQU8rQyxlQUFlQyxRQUFmLENBQXdCaEQsSUFBeEIsQ0FBUDtBQUNEOztBQUVELElBQU0rQyxpQkFBaUIsQ0FDckIsUUFEcUIsRUFDWCxlQURXLEVBQ00sV0FETixFQUNtQixRQURuQixFQUM2QixpQkFEN0IsRUFDZ0QsbUJBRGhELEVBQ3FFLEtBRHJFLEVBQzRFLE9BRDVFLEVBQ3FGLGNBRHJGLEVBQ3FHLFdBRHJHLEVBQ2tILFVBRGxILEVBRXJCLFNBRnFCLEVBRVYsYUFGVSxFQUVLLGFBRkwsRUFFb0IsV0FGcEIsRUFFaUMsU0FGakMsRUFFNEMsU0FGNUMsRUFFdUQsTUFGdkQsRUFFK0QsU0FGL0QsRUFFMEUsV0FGMUUsRUFFdUYsU0FGdkYsRUFFa0csTUFGbEcsRUFFMEcsU0FGMUcsRUFFcUgsaUJBRnJILEVBRXdJLGFBRnhJLEVBRXVKLFVBRnZKLEVBRW1LLFFBRm5LLEVBRTZLLGFBRjdLLEVBR3JCLE1BSHFCLEVBR2IsVUFIYSxFQUdELFNBSEMsRUFHVSxPQUhWLEVBR21CLEtBSG5CLEVBRzBCLFVBSDFCLEVBR3NDLFVBSHRDLEVBR2tELFdBSGxELEVBSXJCLFNBSnFCLEVBS3JCLE1BTHFCLEVBS2IsWUFMYSxFQUtDLGFBTEQsRUFLZ0IsWUFMaEIsRUFLOEIsZ0JBTDlCLEVBS2dELFlBTGhELEVBSzhELGFBTDlELEVBTXJCLFNBTnFCLEVBTVYsUUFOVSxFQU1BLFFBTkEsRUFNVSxNQU5WLEVBTWtCLE1BTmxCLEVBTTBCLFVBTjFCLEVBTXNDLFNBTnRDLEVBTWlELFdBTmpELEVBT3JCLE1BUHFCLEVBT2IsSUFQYSxFQU9QLFdBUE8sRUFPTSxXQVBOLEVBT21CLElBUG5CLEVBUXJCLFdBUnFCLEVBUVIsU0FSUSxFQVFHLE1BUkgsRUFTckIsT0FUcUIsRUFTWixNQVRZLEVBU0osTUFUSSxFQVNJLE1BVEosRUFTWSxLQVRaLEVBVXJCLFVBVnFCLEVBVVQsY0FWUyxFQVVPLGFBVlAsRUFVc0IsS0FWdEIsRUFVNkIsV0FWN0IsRUFVMEMsT0FWMUMsRUFVbUQsWUFWbkQsRUFVaUUsUUFWakUsRUFVMkUsS0FWM0UsRUFVa0YsV0FWbEYsRUFVK0YsVUFWL0YsRUFVMkcsT0FWM0csRUFXckIsTUFYcUIsRUFXYixZQVhhLEVBV0MsT0FYRCxFQVlyQixNQVpxQixFQVliLFNBWmEsRUFhckIsU0FicUIsRUFhVixhQWJVLEVBYUssUUFiTCxFQWFlLFNBYmYsRUFhMEIsU0FiMUIsRUFjckIsWUFkcUIsRUFjUCxVQWRPLEVBY0ssS0FkTCxFQWNZLFVBZFosRUFjd0IsVUFkeEIsRUFjb0MsTUFkcEMsRUFjNEMsU0FkNUMsRUFjdUQsTUFkdkQsRUFlckIsU0FmcUIsRUFlVixPQWZVLEVBZUQsUUFmQyxFQWVTLFdBZlQsRUFlc0IsVUFmdEIsRUFla0MsVUFmbEMsRUFlOEMsT0FmOUMsRUFldUQsTUFmdkQsRUFlK0QsT0FmL0QsRUFld0UsTUFmeEUsRUFlZ0YsWUFmaEYsRUFlOEYsS0FmOUYsRUFlcUcsUUFmckcsRUFlK0csU0FmL0csRUFlMEgsUUFmMUgsRUFlb0ksT0FmcEksRUFlNkksTUFmN0ksRUFlcUosT0FmckosRUFlOEosU0FmOUosRUFnQnJCLFVBaEJxQixFQWdCVCxRQWhCUyxFQWdCQyxPQWhCRCxFQWdCVSxNQWhCVixFQWlCckIsUUFqQnFCLEVBa0JyQixPQWxCcUIsRUFtQnJCLE9BbkJxQixFQW9CckIsT0FwQnFCLEVBcUJyQixNQXJCcUIsQ0FBdkIiLCJmaWxlIjoianN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUZXh0RWxlbWVudCA9IHJlcXVpcmUoJy4uL3RleHRFbGVtZW50JyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgb2JqZWN0VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL29iamVjdCcpO1xuXG5jb25zdCB7IGZpcnN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgY29tYmluZSwgcHJ1bmUgfSA9IG9iamVjdFV0aWxpdGllcztcblxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMgPSB7fSwgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKSB7XG4gIGNvbWJpbmUocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGVsZW1lbnQgPSB0aGlzLCAvLy9cbiAgICAgICAgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tRWxlbWVudEFuZFByb3BlcnRpZXMoZWxlbWVudCwgcHJvcGVydGllcyk7XG5cbiAgcHJ1bmUocHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7ICAvLy9cblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XG5cbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAoaXNIYW5kbGVyTmFtZShuYW1lKSkge1xuICAgICAgYWRkSGFuZGxlcih0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc0F0dHJpYnV0ZU5hbWUobmFtZSkpIHtcbiAgICAgIGFkZEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eSgncHJvcGVydGllcycpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzOiBwcm9wZXJ0aWVzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXM7IC8vL1xuXG4gIGNoaWxkRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICB1cGRhdGVQYXJlbnRFbGVtZW50Q29udGV4dChjaGlsZEVsZW1lbnQsIHBhcmVudEVsZW1lbnQpO1xuXG4gICAgY2hpbGRFbGVtZW50LmFkZFRvKHBhcmVudEVsZW1lbnQpO1xuICB9LmJpbmQodGhpcykpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKCkge1xuICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xufVxuXG5mdW5jdGlvbiBnZXRDb250ZXh0KCkge1xuICByZXR1cm4gdGhpcy5jb250ZXh0O1xufVxuXG5mdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgcmV0dXJuIHRoaXMuc3RhdGU7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XG4gIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gZnJvbVN0YXRlKG5hbWUpIHtcbiAgY29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlW25hbWVdO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3RhdGUodXBkYXRlKSB7XG4gIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSwgdXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gYXNzaWduQ29udGV4dChuYW1lcywgdGhlbkRlbGV0ZSkge1xuICBjb25zdCBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBmaXJzdEFyZ3VtZW50ID0gZmlyc3QoYXJndW1lbnRzKTtcblxuICAgIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgIHRoZW5EZWxldGUgPSBmaXJzdEFyZ3VtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVuRGVsZXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhlbkRlbGV0ZSA9IHRydWU7XG4gIH1cblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGV4dFtuYW1lXSxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBuYW1lLCAgLy8vXG4gICAgICAgICAgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yKTtcblxuICAgIGlmICh0aGVuRGVsZXRlKSB7XG4gICAgICBkZWxldGUgdGhpcy5jb250ZXh0W25hbWVdO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpLCBbXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhcHBseVByb3BlcnRpZXM6IGFwcGx5UHJvcGVydGllcyxcbiAgZ2V0UHJvcGVydGllczogZ2V0UHJvcGVydGllcyxcbiAgZ2V0Q29udGV4dDogZ2V0Q29udGV4dCxcbiAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICBzZXRTdGF0ZTogc2V0U3RhdGUsXG4gIGZyb21TdGF0ZTogZnJvbVN0YXRlLFxuICB1cGRhdGVTdGF0ZTogdXBkYXRlU3RhdGUsXG4gIGFzc2lnbkNvbnRleHQ6IGFzc2lnbkNvbnRleHRcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVBhcmVudEVsZW1lbnRDb250ZXh0KGNoaWxkRWxlbWVudCwgcGFyZW50RWxlbWVudCkge1xuICBjb25zdCBwYXJlbnRDb250ZXh0ID0gKHR5cGVvZiBjaGlsZEVsZW1lbnQucGFyZW50Q29udGV4dCA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQucGFyZW50Q29udGV4dCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY29udGV4dDtcblxuICBwYXJlbnRFbGVtZW50LmNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJlbnRFbGVtZW50LmNvbnRleHQsIHBhcmVudENvbnRleHQpO1xuXG4gIGRlbGV0ZSBjaGlsZEVsZW1lbnQuY29udGV4dDtcbn1cblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKSB7XG4gIGxldCBjaGlsZEVsZW1lbnRzID0gKHR5cGVvZiBlbGVtZW50LmNoaWxkRWxlbWVudHMgPT09ICdmdW5jdGlvbicpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuY2hpbGRFbGVtZW50cztcblxuICBjaGlsZEVsZW1lbnRzID0gKGNoaWxkRWxlbWVudHMgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgICAgICAgICgoY2hpbGRFbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudHMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NoaWxkRWxlbWVudHNdKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuXG4gIGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkRWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBjaGlsZEVsZW1lbnQsICAvLy9cbiAgICAgICAgICAgIHRleHRFbGVtZW50ID0gbmV3IFRleHRFbGVtZW50KHRleHQpO1xuXG4gICAgICBjaGlsZEVsZW1lbnQgPSB0ZXh0RWxlbWVudDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgLy8vXG4gICAgICAgIGhhbmRsZXIgPSB2YWx1ZTsgIC8vL1xuXG4gIGVsZW1lbnQub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gYWRkQXR0cmlidXRlKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChuYW1lID09PSAnY2xhc3NOYW1lJykge1xuICAgIG5hbWUgPSAnY2xhc3MnO1xuICB9XG5cbiAgaWYgKG5hbWUgPT09ICdodG1sRm9yJykge1xuICAgIG5hbWUgPSAnZm9yJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblxuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBlbGVtZW50LmRvbUVsZW1lbnRbbmFtZV1ba2V5XSA9IHZhbHVlW2tleV07XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBuYW1lOyAvLy9cblxuICAgICAgZWxlbWVudC5hZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNIYW5kbGVyTmFtZShuYW1lKSB7XG4gIHJldHVybiBuYW1lLm1hdGNoKC9eb24vKTtcbn1cblxuZnVuY3Rpb24gaXNBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVzLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBhdHRyaWJ1dGVOYW1lcyA9IFtcbiAgJ2FjY2VwdCcsICdhY2NlcHRDaGFyc2V0JywgJ2FjY2Vzc0tleScsICdhY3Rpb24nLCAnYWxsb3dGdWxsU2NyZWVuJywgJ2FsbG93VHJhbnNwYXJlbmN5JywgJ2FsdCcsICdhc3luYycsICdhdXRvQ29tcGxldGUnLCAnYXV0b0ZvY3VzJywgJ2F1dG9QbGF5JyxcbiAgJ2NhcHR1cmUnLCAnY2VsbFBhZGRpbmcnLCAnY2VsbFNwYWNpbmcnLCAnY2hhbGxlbmdlJywgJ2NoYXJTZXQnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzSUQnLCAnY2xhc3NOYW1lJywgJ2NvbFNwYW4nLCAnY29scycsICdjb250ZW50JywgJ2NvbnRlbnRFZGl0YWJsZScsICdjb250ZXh0TWVudScsICdjb250cm9scycsICdjb29yZHMnLCAnY3Jvc3NPcmlnaW4nLFxuICAnZGF0YScsICdkYXRlVGltZScsICdkZWZhdWx0JywgJ2RlZmVyJywgJ2RpcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLFxuICAnZW5jVHlwZScsXG4gICdmb3JtJywgJ2Zvcm1BY3Rpb24nLCAnZm9ybUVuY1R5cGUnLCAnZm9ybU1ldGhvZCcsICdmb3JtTm9WYWxpZGF0ZScsICdmb3JtVGFyZ2V0JywgJ2ZyYW1lQm9yZGVyJyxcbiAgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZkxhbmcnLCAnaHRtbEZvcicsICdodHRwRXF1aXYnLFxuICAnaWNvbicsICdpZCcsICdpbnB1dE1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzJyxcbiAgJ2tleVBhcmFtcycsICdrZXlUeXBlJywgJ2tpbmQnLFxuICAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvb3AnLCAnbG93JyxcbiAgJ21hbmlmZXN0JywgJ21hcmdpbkhlaWdodCcsICdtYXJnaW5XaWR0aCcsICdtYXgnLCAnbWF4TGVuZ3RoJywgJ21lZGlhJywgJ21lZGlhR3JvdXAnLCAnbWV0aG9kJywgJ21pbicsICdtaW5MZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLFxuICAnbmFtZScsICdub1ZhbGlkYXRlJywgJ25vbmNlJyxcbiAgJ29wZW4nLCAnb3B0aW11bScsXG4gICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3Byb2ZpbGUnLFxuICAncmFkaW9Hcm91cCcsICdyZWFkT25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dTcGFuJywgJ3Jvd3MnLFxuICAnc2FuZGJveCcsICdzY29wZScsICdzY29wZWQnLCAnc2Nyb2xsaW5nJywgJ3NlYW1sZXNzJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcGVsbENoZWNrJywgJ3NyYycsICdzcmNEb2MnLCAnc3JjTGFuZycsICdzcmNTZXQnLCAnc3RhcnQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JyxcbiAgJ3RhYkluZGV4JywgJ3RhcmdldCcsICd0aXRsZScsICd0eXBlJyxcbiAgJ3VzZU1hcCcsXG4gICd2YWx1ZScsXG4gICd3aWR0aCcsXG4gICd3bW9kZScsXG4gICd3cmFwJ1xuXTtcbiJdfQ==