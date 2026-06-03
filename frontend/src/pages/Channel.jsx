import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002",
});

function Channel() {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  const channelId = localStorage.getItem("channelId");

  useEffect(() => {
    fetchChannel();
    fetchVideos();
  }, []);

  const fetchChannel = async () => {
    const res = await api.get(`/channels/${channelId}`);
    setChannel(res.data);
  };

  const fetchVideos = async () => {
    const res = await api.get(`/channels/${channelId}/videos`);
    setVideos(res.data);
  };

  return (
    <div>
      <h1>{channel?.channelName}</h1>
      <p>{channel?.description}</p>

      <h2>Your Videos</h2>

      {videos.map((v) => (
        <div key={v._id}>
          <img src={v.thumbnailUrl} width="200" />
          <h4>{v.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default Channel;