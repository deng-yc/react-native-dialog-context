import * as React from 'react';
import { DetailedHTMLProps } from 'react';
import { IDialog, ReactDialog } from 'react-dialog-context';

export interface ReactDialogContextProps extends DetailedHTMLProps<React.HTMLAttributes<any>,any> {
    name?: string;
}

export interface ReactDialogContextState{
    dialogs:IDialog[]
}

export default class ReactDialogContext extends React.Component<ReactDialogContextProps, ReactDialogContextState> {
    state={
        dialogs:[]
    }

    addHost(theDialog: IDialog) {
        var dialogs=[...this.state.dialogs,theDialog];
        this.setState({
            dialogs
        })
    }

    removeHost(theDialog: IDialog) {
        var dialogs=this.state.dialogs.filter(dialog=>dialog.id!=theDialog.id);
        this.setState({
            dialogs
        })
    }

    public render() {
        const { name, style,children, ...viewProps } = this.props;
        var viewStyles = [styles.dialogContext];
        if (style) {
            if (Array.isArray(style)) {
                viewStyles.push(...style)
            } else {
                viewStyles.push(style)
            }
        }
        var dialogs=this.state.dialogs;
        var components=[];
        for (const dialog of dialogs) {
            components.push(<ReactDialog key={dialog.id} dialog={dialog}/>);
        }
        return <div {...viewProps}>
            {components}
            {children}
        </div>
    }
}

const styles = {
    dialogContext: {

    }
}
