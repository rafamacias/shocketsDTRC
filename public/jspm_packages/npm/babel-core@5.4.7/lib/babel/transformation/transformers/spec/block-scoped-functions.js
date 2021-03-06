/* */ 
"format cjs";
"use strict";

exports.__esModule = true;
exports.BlockStatement = BlockStatement;
exports.SwitchCase = SwitchCase;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _types = require("../../../types");

var t = _interopRequireWildcard(_types);

function statementList(key, path, file) {
  var paths = path.get(key);

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];

    var func = path.node;
    if (!t.isFunctionDeclaration(func)) continue;

    var declar = t.variableDeclaration("let", [t.variableDeclarator(func.id, t.toExpression(func))]);

    // hoist it up above everything else
    declar._blockHoist = 2;

    // todo: name this
    func.id = null;

    path.replaceWith(declar);
  }
}

function BlockStatement(node, parent, scope, file) {
  if (t.isFunction(parent) && parent.body === node || t.isExportDeclaration(parent)) {
    return;
  }

  statementList("body", this, file);
}

function SwitchCase(node, parent, scope, file) {
  statementList("consequent", this, file);
}