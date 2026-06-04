// pages/MyChannel.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyChannel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate(`/channel/${user._id}`);
    }
  }, []);

  return <div>Loading...</div>;
};

export default MyChannel;