export interface IDialogContext {
    name?: string;
    addHost: (dialog: IDialog) => any;
    removeHost: (dialog: IDialog) => any;
}
export interface IDialog {
    id: string;
    owner: any;
    activationData: any;
    context: IDialogContext;
    close: (...args) => any;
    element?: any;
}
export interface IDialogObject {
    __dialog__?: IDialog;
    classList: Array<string>;
    keep?: boolean;
    componentDidMount?: (theDialog: IDialog) => void;
}
