import React = require('react');
import { IDialog } from './types';


export interface ReactDialogProps {
    dialog: IDialog
}

export class ReactDialog extends React.Component<ReactDialogProps, {}>{

    render() {
        const { dialog } = this.props;
        return <dialog.owner dialog={dialog} {...dialog.activationData} />
    }
}