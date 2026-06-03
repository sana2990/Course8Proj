import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: "none", color: "black" }}
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