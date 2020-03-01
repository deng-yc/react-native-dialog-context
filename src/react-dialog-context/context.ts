import React from "react";
import { IDialog } from "../../packages/react-dialog-context/types";

export const DialogContext = React.createContext<{ dialog?: IDialog }>({});
