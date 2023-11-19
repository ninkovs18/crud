import * as React from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  DialogContent,
} from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { hiddenContentStyle, mergeStyles } from "@fluentui/react/lib/Styling";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { Label, TextField } from "@fluentui/react";

const dialogStyles = { main: { maxWidth: 450 } };
const screenReaderOnly = mergeStyles(hiddenContentStyle);

const DeleteDialog = ({ user }) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId = useId("dialogLabel");
  const subTextId = useId("subTextLabel");

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );
  const deleteIcon = {
    iconName: "Delete",
    styles: { root: { fontSize: "25px", color: "red" } },
  };
  const deleteStyle = {
    root: {
      border: "0px",
      backgroundColor: "transparent",
    },
  };

  const submitStyle = {
    root: {
      backgroundColor: "red",
      border: "0px",
    },
  };
  return (
    <div data-is-scrollable="true">
      <DefaultButton
        onClick={toggleHideDialog}
        iconProps={deleteIcon}
        styles={deleteStyle}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={modalProps}
        minWidth={400}
      >
        <DialogContent title="Do you want to delete this pearson?"></DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={toggleHideDialog}
            text="Delete"
          />
          <DefaultButton text="Close" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
