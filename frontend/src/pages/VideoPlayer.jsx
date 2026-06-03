import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import CommentSection from "../components/CommentSection";

function VideoPlayer() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetchVideo();
  }, []);

  const fetchVideo = async () => {
    try {
        console.log(id);
      const res = await api.get(`/videos/${id}`);

      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const likeVideo = async () => {
  const token =
    localStorage.getItem("token");

  await api.put(
    `/videos/${id}/like`,
    {},
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  fetchVideo();
};

const dislikeVideo = async () => {
  const token =
    localStorage.getItem("token");

  await api.put(
    `/videos/${id}/dislike`,
    {},
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  fetchVideo();
};

  if (!video) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <video
        width="800"
        controls
        src={video.videoUrl}
      />

      <h2>{video.title}</h2>

      <p>{video.description}</p>

      <p>{video.views} views</p>

      <CommentSection
        videoId={video._id}
    />
    <button onClick={likeVideo}>
  👍 {video.likes}
</button>
<button onClick={dislikeVideo}>
  👎 {video.dislikes}
</button>
    </div>
  );
}

export default VideoPlayer;