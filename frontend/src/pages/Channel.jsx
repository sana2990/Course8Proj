import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002",
});

function Channel() {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const channelId = localStorage.getItem("channelId");

  useEffect(() => {
    if (!channelId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const channelRes = await api.get(`/channels/${channelId}`);
        const videoRes = await api.get(
          `/channels/${channelId}/videos`
        );

        setChannel(channelRes.data);
        setVideos(videoRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [channelId]);

  if (loading) return <h2>Loading channel...</h2>;

  if (!channel) return <h2>Channel not found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{channel.channelName}</h1>
      <p>{channel.description}</p>

      <h2>Your Videos</h2>

      {videos.length === 0 ? (
        <p>No videos uploaded yet</p>
      ) : (
        videos.map((v) => (
          <div key={v._id} style={{ marginBottom: "15px" }}>
            <img src={v.thumbnailUrl} width="200" />
            <h4>{v.title}</h4>
          </div>
        ))
      )}
    </div>
  );
}

export default Channel;