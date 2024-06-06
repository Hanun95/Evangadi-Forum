import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import styles from "./askQuestion.module.css";
import { useState } from "react";

export default function AskQuestion() {
  const [input, setInput] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  console.log(input);

  const handleChange = (e) => {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/questions`, input, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/");
      setInput({ title: "", description: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.guide}>
        <h2>Answer From the Community</h2>
        <ul>
          <li>Summerize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your Question and post it to the site.</li>
        </ul>
      </div>

      <div className={styles.askQuestion}>
        <h2>Answer The Top Question</h2>
        <p>
          <Link to="/">Go to Question page</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            value={input?.title}
          />
          <textarea
            placeholder="Your Answer..."
            name="description"
            onChange={handleChange}
            value={input?.description}
          />
          <button type="submit">Ask Your Question</button>
        </form>
      </div>
    </div>
  );
}
