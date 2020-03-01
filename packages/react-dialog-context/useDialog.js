import { useContext } from "react";
import { DialogContext } from "./context";
export function useDialog() {
    const context = useContext(DialogContext);
    const { dialog } = context;
    return dialog;
}
//# sourceMappingURL=useDialog.js.map