export interface IDialogContext {
    name?: string;
    initialZIndex?: number;
    addHost: (dialog: IDialog) => Promise<void>;
    removeHost: (dialog: IDialog) => Promise<void>;
}
export interface IDialog {
    id: string;
    owner: any;
    zIndex: number;
    activationData: any;
    context: IDialogContext;
    closing: (fn) => void;
    close: (result?) => any;
    element?: any;
}
export interface IDialogObject {
    __dialog__?: IDialog;
    classList: Array<string>;
    keep?: boolean;
    componentDidMount?: (theDialog: IDialog) => void;
}
