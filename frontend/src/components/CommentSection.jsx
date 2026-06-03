import { useEffect, useState } from "react";
import api from "../services/api";

function CommentSection({ videoId }) {
  const [comments, setComments] =
    useState([]);

  const [text, setText] =
    useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const res = await api.get(
      `/comments/${videoId}`
    );

    setComments(res.data);
  };

  const addComment = async () => {
    const token =
      localStorage.getItem("token");

    await api.post(
      "/comments",
      {
        text,
        videoId,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setText("");

    fetchComments();
  };

  return (
    <div>
      <h3>Comments</h3>

      <input
        value={text}
        placeholder="Add comment"
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={addComment}>
        Comment
      </button>

      {comments.map((comment) => (
        <div key={comment._id}>
          <b>
            {
              comment.userId
                ?.username
            }
          </b>

          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;