import React from "react";
import { IDialog } from "./types";
import { DialogContext } from "./context";
import { View, StyleSheet } from "react-native";

export interface ReactDialogProps {
    dialog: IDialog;
}

export function ReactDialog(props: ReactDialogProps) {
    const dialog = props.dialog;
    let content;
    if (React.isValidElement(dialog.owner)) {
        content = dialog.owner;
    } else {
        content = <dialog.owner dialog={dialog} {...dialog.activationData} />;
    }
    return <DialogContext.Provider value={{ dialog }}>{content}</DialogContext.Provider>;
}

export default ReactDialog;
