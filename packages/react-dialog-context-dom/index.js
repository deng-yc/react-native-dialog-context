"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var react_dialog_context_2 = require("react-dialog-context");
var ReactDialogContext = /** @class */ (function (_super) {
    __extends(ReactDialogContext, _super);
    function ReactDialogContext(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            dialogs: []
        };
        react_dialog_context_2.dialog.addContext(props.name || "default", _this);
        return _this;
    }
    ReactDialogContext.prototype.addHost = function (theDialog) {
        var dialogs = this.state.dialogs.concat([theDialog]);
        this.setState({
            dialogs: dialogs
        });
    };
    ReactDialogContext.prototype.removeHost = function (theDialog) {
        var dialogs = this.state.dialogs.filter(function (dialog) { return dialog.id != theDialog.id; });
        this.setState({
            dialogs: dialogs
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
        for (var _i = 0, dialogs_1 = dialogs; _i < dialogs_1.length; _i++) {
            var dialog_1 = dialogs_1[_i];
            components.push(React.createElement(react_dialog_context_1.ReactDialog, { key: dialog_1.id, dialog: dialog_1 }));
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