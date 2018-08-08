/// <reference types="react" />
import * as React from 'react';
import { IDialog } from 'react-dialog-context';
import { ViewProps } from 'react-native';
export interface ReactNativeDialogContextProps extends ViewProps {
    name?: string;
}
export interface ReactNativeDialogContextState {
    dialogs: IDialog[];
}
export default class ReactNativeDialogContext extends React.Component<ReactNativeDialogContextProps, ReactNativeDialogContextState> {
    state: {
        dialogs: any[];
    };
    addHost(theDialog: IDialog): void;
    removeHost(theDialog: IDialog): void;
    render(): JSX.Element;
}
