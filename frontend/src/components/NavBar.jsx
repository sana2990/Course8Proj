import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      setUsername(localStorage.getItem("username") || "");
    };

    // Initial load
    updateUser();

    // Listen for login/logout
    window.addEventListener("userChanged", updateUser);

    return () => {
      window.removeEventListener("userChanged", updateUser);
    };
  }, []);

  const handleSearch = (value) => {
    setSearch(value);

    if (value.trim() === "") {
      navigate("/");
    } else {
      navigate(`/?search=${value}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("channelId");

    // Tell Navbar to update
    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h2
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        YouTube Clone
      </h2>

      <input
        placeholder="Search videos..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        style={styles.search}
      />

      <div style={styles.right}>
        {username ? (
          <>
            <span style={styles.username}>
              {username}
            </span>

           <button
  onClick={() => {
    const channelId = localStorage.getItem("channelId");

    if (channelId) {
      navigate("/channel");
    } else {
      navigate("/create-channel");
    }
  }}
>
  Channel
</button>

            <button
              onClick={() => navigate("/upload-video")}
            >
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