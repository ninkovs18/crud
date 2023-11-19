import { useMemo } from "react";
import {
  Dialog,
  DialogFooter,
  DialogContent,
} from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@fluentui/react-hooks";

const dialogStyles = { main: { maxWidth: 450 } };
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

const DeleteDialog = ({ handleDelete }) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId = useId("dialogLabel");
  const subTextId = useId("subTextLabel");

  const onClickDelete = () => {
    handleDelete();
    toggleHideDialog();
  };

  const modalProps = useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

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
            onClick={onClickDelete}
            text="Delete"
          />
          <DefaultButton text="Close" onClick={toggleHideDialog} />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
