import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

function Header({
  search,
  setSearch,
}) {
  const username =
    localStorage.getItem(
      "username"
    );

  return (
    <header
      style={{
        display: "flex",
        justifyContent:
          "space-between",
      }}
    >
    </header>
  );
}

export default Header;