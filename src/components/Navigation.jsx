import { Nav, initializeIcons } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const links = [
  {
    links: [
      {
        name: "Home",
        url: "/",
        key: "1",
        isNavLink: true,
      },
      {
        name: "Add",
        url: "/create",
        key: "2",
        isNavLink: true,
        title: "Add new person",
      },
      {
        name: "Actions",
        url: "/",
        key: "3",
        isNavLink: true,
      },
    ],
  },
];

const navigationStyles = {
  root: {
    height: "100vh",
    boxSizing: "border-box",
    overflowY: "auto",
  },
};

const Navigation = () => {
  initializeIcons();
  const [selectedKey, setSelectedKey] = useState(1);
  const navigate = useNavigate();

  const handleClick = (ev, item) => {
    ev.preventDefault();
    setSelectedKey(item.key);
    navigate(item.url);
  };
  return (
    <Nav
      groups={links}
      selectedKey={String(selectedKey)}
      styles={navigationStyles}
      onLinkClick={(ev, item) => handleClick(ev, item)}
      className="nav"
    ></Nav>
  );
};

export default Navigation;
