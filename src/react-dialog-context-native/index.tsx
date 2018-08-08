import * as React from 'react';
import { IDialog, ReactDialog } from 'react-dialog-context';
import { View, ViewProps } from 'react-native';

export interface ReactNativeDialogContextProps extends ViewProps {
    name?: string;
}

export interface ReactNativeDialogContextState{
    dialogs:IDialog[]
}

export default class ReactNativeDialogContext extends React.Component<ReactNativeDialogContextProps, ReactNativeDialogContextState> {
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
