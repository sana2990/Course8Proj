import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002",
});

function UploadVideo() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "",
  });

  const channelId = localStorage.getItem("channelId");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadVideo = async () => {
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/videos",
        {
          ...form,
          channelId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Video uploaded successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>

      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="videoUrl" placeholder="Video URL" onChange={handleChange} />
      <input name="thumbnailUrl" placeholder="Thumbnail URL" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />

      <button onClick={uploadVideo}>
        Upload
      </button>
    </div>
  );
}

export default UploadVideo;