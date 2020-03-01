import { useContext } from "react";

import { DialogContext } from "./context";
import { IDialog } from "./types";

export function useDialog(): IDialog {
    const context = useContext(DialogContext);
    const { dialog } = context;
    return dialog as IDialog;
}
