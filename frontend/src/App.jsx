import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoPlayer from "./pages/VideoPlayer";

import Home from "./pages/Home";
import Channel from "./pages/Channel";
import Navbar from "./components/NavBar";
import CreateChannel from "./pages/CreateChannel";
import UploadVideo from "./pages/UploadVideo";
import Sidebar from "./components/SideBar";
import MyChannel from "./pages/MyChannel";
import { AuthContext, AuthProvider } from "./context/AuthContext";

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

function App() {
  return (
    <AuthProvider>
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
        <Route path="/channel" element={<MyChannel />} />
        <Route
          path="channel/:id"
          element={<Channel />} />
           <Route path="/create-channel" element={<CreateChannel />} />
        <Route path="/upload-video" element={<UploadVideo />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;