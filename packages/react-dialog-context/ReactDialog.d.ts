/// <reference types="react" />
import React = require('react');
import { IDialog } from './types';
export interface ReactDialogProps {
    dialog: IDialog;
}
export declare class ReactDialog extends React.Component<ReactDialogProps, {}> {
    render(): JSX.Element;
}
