import React from "react";
import { DialogContext } from "./context";
export function ReactDialog(props) {
    const { dialog } = props;
    return (React.createElement(DialogContext.Provider, { value: { dialog } },
        React.createElement(dialog.owner, Object.assign({ dialog: dialog }, dialog.activationData))));
}
export default ReactDialog;
//# sourceMappingURL=ReactDialog.js.map