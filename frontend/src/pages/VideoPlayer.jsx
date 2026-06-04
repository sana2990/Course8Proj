import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fix: Add [id] as a dependency
  useEffect(() => {
    fetchVideo();
  }, [id]); 

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/videos/${id}`);
      setVideo(res.data);
    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  const likeVideo = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.put(`/videos/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVideo();
    } catch (error) {
      console.error(error);
    }
  };

  const dislikeVideo = async () => {
    const token = localStorage.getItem("token");
    try {
      await api.put(`/videos/${id}/dislike`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchVideo();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!video) {
    return <h2>Video not found.</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      {/* 2. Fix: Added 'key' so the player forces a reload on URL change */}
      <video
        key={video.videoUrl} 
        width="800"
        controls
        src={video.videoUrl}
      >
        Your browser does not support the video tag.
      </video>

      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <p>{video.views} views</p>

      <div style={{ margin: "10px 0" }}>
        <button onClick={likeVideo} style={{ marginRight: "10px" }}>
          👍 {video.likes || 0}
        </button>
        <button onClick={dislikeVideo}>
          👎 {video.dislikes || 0}
        </button>
      </div>

      <CommentSection videoId={video._id} />
    </div>
  );
}

export default VideoPlayer;