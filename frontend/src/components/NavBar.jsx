import { useState, useEffect } from "react";

function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, []);

  return (
    <div className="navbar">
      
      <h2>YouTube Clone</h2>

      <div>
        {username ? (
          <div>
            {username}
          </div>
        ) : (
          <button>Sign In</button>
        )}
      </div>

    </div>
  );
}

export default Navbar;