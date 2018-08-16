"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var theDialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        theDialog = this.getDialog(obj);
                        if (!theDialog) return [3 /*break*/, 2];
                        return [4 /*yield*/, theDialog.close.apply(theDialog, args)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
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
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, dialogContext.removeHost(theDialog)];
                                case 1:
                                    _a.sent();
                                    resolve.apply(void 0, args);
                                    return [2 /*return*/];
                            }
                        });
                    });
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