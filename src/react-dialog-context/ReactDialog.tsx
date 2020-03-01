import React from "react";
import { IDialog } from "./types";
import { DialogContext } from "./context";

export interface ReactDialogProps {
    dialog: IDialog;
}

export function ReactDialog(props: ReactDialogProps) {
    const { dialog } = props;
    return (
        <DialogContext.Provider value={{ dialog }}>
            <dialog.owner dialog={dialog} {...dialog.activationData}></dialog.owner>
        </DialogContext.Provider>
    );
}

export default ReactDialog;
