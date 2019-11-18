import React = require("react");
import { IDialog } from "./types";

export interface ReactDialogProps {
  dialog: IDialog;
}

export function ReactDialog(props: ReactDialogProps) {
  const { dialog } = props;
  return (
    <dialog.owner dialog={dialog} {...dialog.activationData}></dialog.owner>
  );
}

export default ReactDialog;
