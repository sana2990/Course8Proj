import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
  navigate(`/?search=${value}`);
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSearch(search);
  }
};

   const handleSearchClick = () => {
    navigate(`/?search=${search}`);
  };

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("channelId");
    setUsername("");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>

      {/* LEFT SIDE */}
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        YouTube Clone
      </h2>

      {/* CENTER (optional search placeholder) */}
      <input
        placeholder="Search videos..."
        value={search}
        onChange={(e) => {
    const value = e.target.value;
    setSearch(value);
    handleSearch(value); // 🔥 live search
  }}
  onKeyDown={handleKeyDown}
  style={styles.search}
      />

      {/* RIGHT SIDE */}
      <div style={styles.right}>

        {username ? (
          <>
            <span style={styles.username}>
              {username}
            </span>

            <button onClick={() => navigate("/create-channel")}>
              Create Channel
            </button>

            <button onClick={() => navigate("/upload-video")}>
              Upload Video
            </button>

            <button onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}

      </div>

    </div>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#202020",
    color: "white",
  },

  search: {
    width: "40%",
    padding: "6px",
    borderRadius: "4px",
    border: "none",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  username: {
    fontWeight: "bold",
  },
};

export default Navbar;