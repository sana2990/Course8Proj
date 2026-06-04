import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import VideoCard from "../components/VideoCard";
import Sidebar from "../components/SideBar";

function Home() {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("All");

  const location = useLocation();

  // ✅ GET SEARCH FROM URL (FIXED)
  const search =
    new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await api.get("/videos");
    setVideos(res.data);
  };

  // 🔍 FILTER LOGIC
  const filteredVideos = videos.filter((video) => {
    const matchTitle =
      video.title?.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" || video.category === category;

    return matchTitle && matchCategory;
  });

  return (
    <div>

      <Sidebar />

      {/* CATEGORY FILTER */}
      <div style={{ margin: "10px" }}>
        {["All", "Music", "Gaming", "Education", "React"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              marginRight: "10px",
              background: category === cat ? "black" : "#eee",
              color: category === cat ? "white" : "black",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* VIDEOS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          margin: "10px",
          padding: "10px",
          gap: "20px",
        }}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <h3>No videos found</h3>
        )}
      </div>

    </div>
  );
}

export default Home;