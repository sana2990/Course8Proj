import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (
    e
  ) => {
    e.preventDefault();

    try {
      await api.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button type="submit">
        Register
      </button>
    </form>
  );
}

export default Register;