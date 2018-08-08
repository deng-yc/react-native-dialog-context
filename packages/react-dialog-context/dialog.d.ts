import { IDialog, IDialogContext } from './types';
export declare class Dialog {
    /**
     * 新增context
     * @param name
     * @param dialogContext
     */
    addContext(name: string, dialogContext: IDialogContext): void;
    /**
     * 获取context
     * @param name
     */
    getContext(name?: string): IDialogContext;
    /**
     * 获取对象关联的对话框
     * @param obj
     */
    getDialog(obj: any): IDialog;
    /**
     * 关闭对话框
     * @param obj
     * @param rest
     */
    close(obj: any, ...rest: any[]): void;
    /**
     * 显示对话框
     * @param obj
     * @param activationData
     * @param context
     */
    show<T>(obj: any, activationData?: any, context?: string): Promise<T>;
}
declare var dialog: Dialog;
export default dialog;
