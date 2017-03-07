'use strict';

var util = require('./util');

class event {
  static delegateTo(element, Class) {
    var prototype = util.findPrototype(element, Class);

    prototype.on = on;
    prototype.off = off;
  }

  static appendNamespaceToEvents(events, namespace) {
    if (namespace !== undefined) {
      var eventsString = events, ///
          eventStrings = eventsString.split(/ /);

      eventStrings = eventStrings.map(function(eventString) {
        eventString = `${eventString}.${namespace}`;  ///

        return eventString;
      });

      events = eventStrings.join(' ');  ///
    }

    return events;
  }
}

module.exports = event;

function on(events, handler, namespace = undefined) {
  events = event.appendNamespaceToEvents(events, namespace);

  this.$element.on(events, handler);
}

function off(events, namespace = undefined) {
  events = event.appendNamespaceToEvents(events, namespace);

  this.$element.off(events);
}