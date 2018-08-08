/// <reference types="react" />
import * as React from 'react';
import { DetailedHTMLProps } from 'react';
import { IDialog } from 'react-dialog-context';
export interface ReactDialogContextProps extends DetailedHTMLProps<React.HTMLAttributes<any>, any> {
    name?: string;
}
export interface ReactDialogContextState {
    dialogs: IDialog[];
}
export default class ReactDialogContext extends React.Component<ReactDialogContextProps, ReactDialogContextState> {
    constructor(props: any, context: any);
    state: {
        dialogs: any[];
    };
    addHost(theDialog: IDialog): void;
    removeHost(theDialog: IDialog): void;
    render(): JSX.Element;
}
