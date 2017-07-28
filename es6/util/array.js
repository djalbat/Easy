'use strict';

class arrayUtil {
  static first(array) { return array[0]; }

  static splice(array, start, deleteCount, itemsArray = []) {
    const args = [start, deleteCount, ...itemsArray],
          deletedItemsArray = Array.prototype.splice.apply(array, args);

    return deletedItemsArray;
  }

  static combine(targetArray, sourceArray = []) {
    targetArray = sourceArray.reduce(function(targetArray, sourceArrayElement) {
      if (!targetArray.includes(sourceArrayElement)) {
        const targetArrayElement = sourceArrayElement;  ///
        
        targetArray.push(targetArrayElement);
      }

      return targetArray;
    }, targetArray);

    return targetArray;
  }
  
  static find(array, test) {
    let foundElement = null;

    array.some(function(element) {
      const found = test(element);
      
      if (found === true) {
        foundElement = element;

        return true;
      }
    });

    const element = foundElement; ///

    return element;
  }
}

module.exports = arrayUtil;