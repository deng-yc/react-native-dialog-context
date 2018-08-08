"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contexts = {};
var last_dialogId = 1000;
var getNextDialogId = function () {
    last_dialogId = last_dialogId + 1;
    return "dialog-" + last_dialogId;
};
var Dialog = /** @class */ (function () {
    function Dialog() {
    }
    /**
     * 新增context
     * @param name
     * @param dialogContext
     */
    Dialog.prototype.addContext = function (name, dialogContext) {
        dialogContext.name = name;
        contexts[name] = dialogContext;
        var helperName = 'show' + name.substr(0, 1).toUpperCase() + name.substr(1);
        this[helperName] = function (obj, activationData) {
            return this.show(obj, activationData, name);
        };
    };
    /**
     * 获取context
     * @param name
     */
    Dialog.prototype.getContext = function (name) {
        if (name === void 0) { name = "default"; }
        return contexts[name];
    };
    /**
     * 获取对象关联的对话框
     * @param obj
     */
    Dialog.prototype.getDialog = function (obj) {
        if (obj) {
            var __dialog__ = obj.__dialog__;
            if (__dialog__) {
                if (typeof __dialog__ == "function") {
                    return __dialog__.call(obj);
                }
                return obj.__dialog__;
            }
        }
        return undefined;
    };
    /**
     * 关闭对话框
     * @param obj
     * @param rest
     */
    Dialog.prototype.close = function (obj) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var theDialog = this.getDialog(obj);
        if (theDialog) {
            theDialog.close.apply(theDialog, rest);
        }
    };
    /**
     * 显示对话框
     * @param obj
     * @param activationData
     * @param context
     */
    Dialog.prototype.show = function (obj, activationData, context) {
        var _this = this;
        if (context === void 0) { context = "default"; }
        var self = this;
        var dialogContext = contexts[context];
        return new Promise(function (resolve) {
            var theDialog;
            if (obj.keep) {
                theDialog = _this.getDialog(obj);
            }
            theDialog = theDialog || {
                id: getNextDialogId(),
                owner: obj,
                activationData: activationData,
                context: dialogContext,
                close: function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    dialogContext.removeHost(theDialog);
                    if (args.length === 0) {
                        resolve();
                    }
                    else if (args.length === 1) {
                        resolve(args[0]);
                    }
                    else {
                        resolve.apply(self, args);
                    }
                }
            };
            if (typeof obj == "function") {
                obj.prototype.__dialog__ = function () {
                    if (this.props) {
                        return this.props.dialog;
                    }
                };
            }
            else {
                obj.__dialog__ = theDialog;
            }
            dialogContext.addHost(theDialog);
        });
    };
    return Dialog;
}());
exports.Dialog = Dialog;
exports.dialog = new Dialog();
exports.default = exports.dialog;
//# sourceMappingURL=dialog.js.map