import { Link } from "react-router-dom";

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
      <h2>YouTube Clone</h2>

      <input
        value={search}
        placeholder="Search"
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {username ? (
        <h4>{username}</h4>
      ) : (
        <Link to="/login">
          Sign In
        </Link>
      )}
    </header>
  );
}

export default Header;