"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dialog_context_1 = require("react-dialog-context");
var cached = {};
var ReactDialogContext = /** @class */ (function (_super) {
    __extends(ReactDialogContext, _super);
    function ReactDialogContext(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            dialogs: {}
        };
        react_dialog_context_1.dialog.addContext(props.name || "default", _this);
        cached[_this.name] = {};
        return _this;
    }
    ReactDialogContext.prototype.addHost = function (theDialog) {
        var _this = this;
        cached[this.name][theDialog.id] = theDialog;
        return new Promise(function (resolve) {
            _this.setState({ dialogs: cached[_this.name] }, resolve);
        });
    };
    ReactDialogContext.prototype.removeHost = function (theDialog) {
        var _this = this;
        delete cached[this.name][theDialog.id];
        return new Promise(function (resolve) {
            _this.setState({ dialogs: cached[_this.name] }, resolve);
        });
    };
    ReactDialogContext.prototype.render = function () {
        var _a = this.props, name = _a.name, style = _a.style, children = _a.children, viewProps = __rest(_a, ["name", "style", "children"]);
        var viewStyles = [styles.dialogContext];
        if (style) {
            if (Array.isArray(style)) {
                viewStyles.push.apply(viewStyles, style);
            }
            else {
                viewStyles.push(style);
            }
        }
        var dialogs = this.state.dialogs;
        var components = [];
        for (var id in dialogs) {
            var dialog_1 = dialogs[id];
            if (dialog_1) {
                components.push(React.createElement(react_dialog_context_1.ReactDialog, { key: dialog_1.id, dialog: dialog_1 }));
            }
        }
        return React.createElement("div", __assign({}, viewProps),
            components,
            children);
    };
    return ReactDialogContext;
}(React.Component));
exports.default = ReactDialogContext;
var styles = {
    dialogContext: {}
};
//# sourceMappingURL=index.js.map