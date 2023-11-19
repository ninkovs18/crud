import { useState, useMemo } from "react";
import {
  Dialog,
  DialogFooter,
  DialogContent,
} from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useId, useBoolean } from "@fluentui/react-hooks";
import { Label, TextField } from "@fluentui/react";

const dialogStyles = { main: { maxWidth: 450 } };

const editIcon = {
  iconName: "EditContact",
  styles: { root: { fontSize: "25px", color: "blue" } },
};
const editStyle = {
  root: {
    border: "0px",
    backgroundColor: "transparent",
  },
};

const submitStyle = {
  root: {
    backgroundColor: "blue",
    border: "0px",
  },
};

const controlStyles = {
  fieldGroup: {
    selectors: {
      ":focus-within": {
        border: "2px solid rgb(137, 247, 11)",
      },
      "::after": {
        border: "0px",
      },
    },
  },
};

const EditDialog = ({ user, handleEdit }) => {
  const { id, name, surname, userType, city, address } = user;
  const [userEdit, setUserEdit] = useState({
    id: id,
    name: name,
    surname: surname,
    userType: userType,
    city: city,
    address: address,
  });

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId = useId("dialogLabel");
  const subTextId = useId("subTextLabel");

  const editOpen = () => {
    toggleHideDialog();
    console.log(user);
    console.log(userEdit);
  };

  const onClickEdit = () => {
    if (
      userEdit.name === "" ||
      userEdit.surname === "" ||
      userEdit.userType === "" ||
      userEdit.ciry === "" ||
      userEdit.address === ""
    )
      return;
    handleEdit(userEdit);
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
        onClick={editOpen}
        iconProps={editIcon}
        styles={editStyle}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={modalProps}
        minWidth={400}
      >
        <DialogContent title="Edit person">
          <Label required htmlFor={"name-input"}>
            Name:
          </Label>
          <TextField
            type="text"
            id={"name-input"}
            defaultValue={user.name}
            onChange={(e) => setUserEdit({ ...userEdit, name: e.target.value })}
            styles={controlStyles}
          />
          <Label required htmlFor={"surname-input"}>
            Surname:
          </Label>
          <TextField
            type="text"
            id={"surname-input"}
            defaultValue={user.surname}
            onChange={(e) =>
              setUserEdit({ ...userEdit, surname: e.target.value })
            }
            styles={controlStyles}
          />
          <Label required htmlFor={"userType-input"}>
            User type:
          </Label>
          <TextField
            type="text"
            id={"userType-input"}
            defaultValue={user.userType}
            onChange={(e) =>
              setUserEdit({ ...userEdit, userType: e.target.value })
            }
            styles={controlStyles}
          />
          <Label required htmlFor={"city-input"}>
            City:
          </Label>
          <TextField
            type="text"
            id={"city-input"}
            defaultValue={user.city}
            onChange={(e) => setUserEdit({ ...userEdit, ciry: e.target.value })}
            styles={controlStyles}
          />
          <Label required htmlFor={"Address-input"}>
            Address:
          </Label>
          <TextField
            type="text"
            id={"Address-input"}
            defaultValue={user.address}
            onChange={(e) =>
              setUserEdit({ ...userEdit, address: e.target.value })
            }
            styles={controlStyles}
          />
        </DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={onClickEdit}
            text="Edit"
          />
          <DefaultButton onClick={toggleHideDialog} text="Close" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EditDialog;
