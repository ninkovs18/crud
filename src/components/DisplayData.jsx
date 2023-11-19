import {
  DetailsList,
  DetailsRow,
  TextField,
  IconButton,
  ComboBox,
  SelectionMode,
} from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { useState, useEffect } from "react";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
const columns = [
  {
    key: "column1",
    name: "Name",
    fieldName: "name",
    minWidth: 50,
    maxWidth: 150,
    styles: {
      root: {
        color: "blue",
      },
    },
  },
  {
    key: "column2",
    name: "Surname",
    fieldName: "surname",
    minWidth: 50,
    maxWidth: 150,
    styles: {
      root: {
        color: "blue",
      },
    },
  },
  {
    key: "column3",
    name: "User type",
    fieldName: "userType",
    minWidth: 50,
    maxWidth: 150,
    styles: {
      root: {
        color: "blue",
      },
    },
  },
  {
    key: "column4",
    name: "City",
    fieldName: "city",
    minWidth: 50,
    maxWidth: 150,
    styles: {
      root: {
        color: "blue",
      },
    },
  },
  {
    key: "column5",
    name: "Address",
    fieldName: "address",
    minWidth: 50,
    maxWidth: 150,
    styles: {
      root: {
        color: "blue",
      },
    },
  },
  {
    key: "edit",
    name: "Edit",
    fieldName: "edit",
    styles: {
      root: {
        color: "blue",
      },
    },
    onRender: (item) => <EditDialog user={item} />,
  },
  {
    key: "delete",
    name: "Delete",
    fieldName: "delete",
    styles: {
      root: {
        color: "red",
      },
    },
    onRender: (item) => <DeleteDialog user={item} />,
  },
];
const controlStyles = {
  root: {
    margin: "0 30px 20px 0",
    maxWidth: "300px",
  },
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

const classNames = mergeStyleSets({
  table: {
    margin: "auto",
  },
});

function DisplayData({
  setData,
  data,
  setSelectedItem,
  selectedItem,
  handleDelete,
}) {
  const [search, setSeatch] = useState("");
  const [type, setType] = useState("All");
  const userTypes = data.reduce(
    (arr, type) => {
      if (!arr.map((el) => el.text).includes(type.userType))
        return [
          ...arr,
          { text: type.userType, key: type.userType.toLowerCase() },
        ];
      else return arr;
    },
    [
      {
        key: "",
        text: "All",
      },
    ]
  );
  console.log(userTypes);

  const comboBoxStyles = {
    root: {
      maxWidth: 300,
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

  return (
    <div data-is-scrollable="true">
      <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
        <div style={{ display: "flex" }}>
          <TextField
            label="Filter by name:"
            value={search}
            onChange={(e) => setSeatch(e.target.value)}
            styles={controlStyles}
          />
          <ComboBox
            label="Filter by user type:"
            options={userTypes}
            styles={comboBoxStyles}
            allowFreeInput
            autoComplete="on"
            onChange={(e, i, o, v) => setType(v)}
            defaultSelectedKey={""}
          />
        </div>
        <DetailsList
          columns={columns}
          items={
            type === "All"
              ? data.filter((d) =>
                  d.name.toLowerCase().includes(search.toLocaleLowerCase())
                )
              : search
              ? data
                  .filter((d) =>
                    d.name.toLowerCase().includes(search.toLocaleLowerCase())
                  )
                  .filter((d) => d.userType === type)
              : data.filter((d) => d.userType === type)
          }
          setKey="multiple"
          selectionMode={SelectionMode.none}
          selectionPreservedOnEmptyClick={true}
          isHeaderVisible={true}
        />
      </div>
    </div>
  );
}

export default DisplayData;
