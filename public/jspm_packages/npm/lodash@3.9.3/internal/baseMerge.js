/* */ 
var arrayEach = require("./arrayEach"),
    baseMergeDeep = require("./baseMergeDeep"),
    isArray = require("../lang/isArray"),
    isArrayLike = require("./isArrayLike"),
    isObject = require("../lang/isObject"),
    isObjectLike = require("./isObjectLike"),
    isTypedArray = require("../lang/isTypedArray"),
    keys = require("../object/keys");
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? null : keys(source);
  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    } else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;
      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) && (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}
module.exports = baseMerge;
