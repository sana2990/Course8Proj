import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import VideoCard from "../components/VideoCard";

function Home() {
  const [videos, setVideos] = useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    fetchVideos();
  }, [search, category]);

  const fetchVideos = async () => {
    try {
      const res = await api.get(
        `/videos?search=${search}&category=${category}`
      );

      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header
        search={search}
        setSearch={setSearch}
      />

      <FilterBar
        setCategory={setCategory}
      />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3,1fr)",
            gap: "20px",
            padding: "20px",
            flex: 1,
          }}
        >
          {videos.map((video) => (
            <VideoCard
              key={video._id}
              video={video}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;