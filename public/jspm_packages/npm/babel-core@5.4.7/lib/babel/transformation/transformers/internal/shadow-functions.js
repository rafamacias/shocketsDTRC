/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.ThisExpression = ThisExpression;
exports.ReferencedIdentifier = ReferencedIdentifier;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

var metadata = {
  group: "builtin-trailing"
};

exports.metadata = metadata;
function remap(path, key, create) {
  // ensure that we're shadowed
  if (!path.inShadow()) return;

  var fnPath = path.findParent(function (node, path) {
    return !node.shadow && (path.isFunction() || path.isProgram());
  });

  var cached = fnPath.getData(key);
  if (cached) return cached;

  var init = create();
  var id = path.scope.generateUidIdentifier(key);

  fnPath.setData(key, id);
  fnPath.scope.push({ id: id, init: init });

  return id;
}

function ThisExpression() {
  return remap(this, "this", function () {
    return t.thisExpression();
  });
}

function ReferencedIdentifier(node) {
  if (node.name === "arguments" && !node._shadowedFunctionLiteral) {
    return remap(this, "arguments", function () {
      return t.identifier("arguments");
    });
  }
}