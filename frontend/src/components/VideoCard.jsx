import { Link } from "react-router-dom";

function VideoCard({ video }) {
  console.log("Video Data in Card:", video);

  // Fallback check: Use video._id, if missing try video.id, if missing default to a fallback string
  const videoId = video._id || video.id;
    return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: "none" }}
    >
      <div className="video-card">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          width="100%"
        />

        <h4>{video.title}</h4>

        <p>
          {video.channelId?.channelName}
        </p>

        <p>{video.views} views</p>
      </div>
    </Link>
  );
}

export default VideoCard;