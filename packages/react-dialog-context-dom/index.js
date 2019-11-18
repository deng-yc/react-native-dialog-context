var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { dialog, ReactDialog } from 'react-dialog-context';
let cached = {};
export default class ReactDialogContext extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dialogs: {}
        };
        dialog.addContext(props.name || "default", this);
        cached[this.name] = {};
    }
    addHost(theDialog) {
        cached[this.name][theDialog.id] = theDialog;
        return new Promise(resolve => {
            this.setState({ dialogs: cached[this.name] }, resolve);
        });
    }
    removeHost(theDialog) {
        delete cached[this.name][theDialog.id];
        return new Promise(resolve => {
            this.setState({ dialogs: cached[this.name] }, resolve);
        });
    }
    render() {
        const _a = this.props, { name, style, children } = _a, viewProps = __rest(_a, ["name", "style", "children"]);
        var viewStyles = [styles.dialogContext];
        if (style) {
            if (Array.isArray(style)) {
                viewStyles.push(...style);
            }
            else {
                viewStyles.push(style);
            }
        }
        var dialogs = this.state.dialogs;
        var components = [];
        for (const id in dialogs) {
            const dialog = dialogs[id];
            if (dialog) {
                components.push(React.createElement(ReactDialog, { key: dialog.id, dialog: dialog }));
            }
        }
        return React.createElement(React.Fragment, null,
            components,
            children);
    }
}
const styles = {
    dialogContext: {}
};
//# sourceMappingURL=index.js.map