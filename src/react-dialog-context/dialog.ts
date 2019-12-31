import { IDialog, IDialogContext } from "./types";

const contexts: { [name: string]: IDialogContext } = {};

let last_dialogId = 1000;

const getNextDialogId = () => {
    last_dialogId = last_dialogId + 1;
    return "dialog-" + last_dialogId;
};

export class Dialog {
    /**
     * 新增context
     * @param name
     * @param dialogContext
     */
    addContext(name: string, dialogContext: IDialogContext) {
        dialogContext.name = name;
        contexts[name] = dialogContext;
        var helperName = "show" + name.substr(0, 1).toUpperCase() + name.substr(1);
        this[helperName] = function(obj, activationData) {
            return this.show(obj, activationData, name);
        };
    }

    /**
     * 删除context
     * @param name
     */
    removeContext(name: string) {
        if (contexts[name]) {
            delete contexts[name];
        }
    }

    /**
     * 获取context
     * @param name
     */
    getContext(name = "default") {
        return contexts[name];
    }

    /**
     * 获取对象关联的对话框
     * @param obj
     */
    getDialog(obj): IDialog {
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
    }

    /**
     * 关闭对话框
     * @param obj
     * @param rest
     */
    close(obj, ...args) {
        var theDialog = this.getDialog(obj);
        if (theDialog) {
            theDialog.close(...args);
        }
    }
    /**
     * 显示对话框
     * @param obj
     * @param activationData
     * @param context
     */
    show<T>(obj: any, activationData?, context = "default"): Promise<T> {
        var self = this;
        var dialogContext = contexts[context];
        if (!dialogContext) {
            throw new Error("dialogHost[" + context + "]不存在");
        }
        return new Promise(resolve => {
            var theDialog;
            if (obj.keep) {
                theDialog = this.getDialog(obj);
            }
            theDialog = theDialog || {
                id: getNextDialogId(),
                owner: obj,
                activationData,
                context: dialogContext,
                close: (...args) => {
                    dialogContext.removeHost(theDialog).then(() => {
                        resolve(...args);
                    });
                }
            };
            if (obj.prototype) {
                obj.prototype.__dialog__ = function() {
                    if (this.props) {
                        return this.props.dialog;
                    }
                };
            } else {
                obj.__dialog__ = theDialog;
            }
            dialogContext.addHost(theDialog);
        });
    }
}
export const dialog = new Dialog();
export default dialog;
