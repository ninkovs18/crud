import { useState, useEffect } from "react";

import {
  DetailsList,
  TextField,
  ComboBox,
  SelectionMode,
} from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import apiRequest from "../apiRequest";

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

function DisplayData() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3003/persons");
      const data = await response.json();
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setData((data) => data.filter((d) => d.id !== id));

    const result = await apiRequest(`http://localhost:3003/persons/${id}`, {
      method: "DELETE",
    });

    console.log(result);
  };

  const handleEdit = async (editUser) => {
    setData((data) => data.map((d) => (d.id === editUser.id ? editUser : d)));

    const editOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    };

    const result = await apiRequest(
      `http://localhost:3003/persons/${editUser.id}`,
      editOptions
    );
    console.log(result);
  };

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

  const columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 50,
      maxWidth: 150,
      styles: {
        root: {
          color: "rgb(137, 247, 11)",
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
          color: "rgb(137, 247, 11)",
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
          color: "rgb(137, 247, 11)",
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
          color: "rgb(137, 247, 11)",
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
          color: "rgb(137, 247, 11)",
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
      onRender: (item) => <EditDialog handleEdit={handleEdit} user={item} />,
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
      onRender: (item) => (
        <DeleteDialog handleDelete={() => handleDelete(item.id)} />
      ),
    },
  ];

  const filterData =
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
      : data.filter((d) => d.userType === type);

  return (
    <div data-is-scrollable="true">
      <div className={`s-Grid-col ms-sm9 ms-xl9 ${classNames.table}`}>
        <div style={{ display: "flex" }}>
          <TextField
            label="Filter by name:"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
        <div
          data-is-scrollable="true"
          style={{ overflow: "auto", height: "70vh" }}
        >
          <DetailsList
            columns={columns}
            items={filterData}
            setKey="multiple"
            selectionMode={SelectionMode.none}
            selectionPreservedOnEmptyClick={true}
          />
          {!data.length && (
            <p style={{ textAlign: "center" }}>
              there is no person in the list
            </p>
          )}
          {!filterData.length && (
            <p style={{ textAlign: "center" }}>
              There is no result for the given search filter
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
