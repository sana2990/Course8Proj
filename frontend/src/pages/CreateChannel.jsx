import { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5002",
});

function CreateChannel() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const createChannel = async () => {
    const token = localStorage.getItem("token");

    const res = await api.post(
      "/channels",
      {
        channelName: name,
        description: desc,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    localStorage.setItem("channelId", res.data._id);

    alert("Channel Created!");

  };

  return (
    <div>
      <input placeholder="Channel Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Description" onChange={(e) => setDesc(e.target.value)} />

      <button onClick={createChannel}>
        Create Channel
      </button>
    </div>
  );
}

export default CreateChannel;