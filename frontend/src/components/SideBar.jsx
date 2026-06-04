import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ display: "flex" }}>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          fontSize: "24px",
          margin: "10px",
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {/* Sidebar */}
      {open && (
        <div
          style={{
            width: "200px",
            borderRight: "1px solid gray",
            padding: "10px",
          }}
        >
          <Link to="/" style={{ display: "block", margin: "10px 0" }}>
            Home
          </Link>

          <p>Subscriptions</p>
          <p>Library</p>
          <p>History</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;