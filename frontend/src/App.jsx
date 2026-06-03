import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";

import Home from "./pages/Home";
import Channel from "./pages/Channel";
import Navbar from "./components/NavBar";

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/video/:id"
          element={<VideoPlayer />}
        />
        <Route
          path="channel/:id"
          element={<Channel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;