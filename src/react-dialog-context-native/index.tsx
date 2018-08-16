import * as React from 'react';
import { dialog, IDialog, ReactDialog, Dialog } from 'react-dialog-context';
import { View, ViewProps } from 'react-native';

export interface ReactNativeDialogContextProps extends ViewProps {
    name?: string;
}

export interface ReactNativeDialogContextState{
    dialogs: { [id: string]: Dialog }
}

let cached = {};

export default class ReactNativeDialogContext extends React.Component<ReactNativeDialogContextProps, ReactNativeDialogContextState> {

    name: string;

    constructor(props, context) {
        super(props, context);
        dialog.addContext(props.name || "default", this);
        cached[this.name] = {};       
    }

    state={
        dialogs: {}
    }
    addHost(theDialog: IDialog): Promise<void>  {
        cached[this.name][theDialog.id] = theDialog;
        return new Promise(resolve => {
            this.setState({ dialogs: cached[this.name] }, resolve);
        })
    }
    removeHost(theDialog: IDialog): Promise<void>  {
        delete cached[this.name][theDialog.id];
        return new Promise(resolve => {
            this.setState({ dialogs: cached[this.name] }, resolve);
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
        for (const id in dialogs) {
            const dialog = dialogs[id];
            if (dialog) {
                components.push(<ReactDialog key={dialog.id} dialog={dialog} />);
            }
        }
        return <View style={viewStyles} {...viewProps}>
            {components}
            {children}
        </View>
    }
}

const styles = {
    dialogContext: {

    }
}
