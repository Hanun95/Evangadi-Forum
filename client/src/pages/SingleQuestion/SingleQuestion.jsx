import { Link, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import styles from "./singleQuestion.module.css";
import { useContext, useEffect, useState } from "react";
import AnswerCard from "./AnswerCard/AnswerCard";
import { AppState } from "../../App";

export default function SingleQuestion() {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const { questionId } = useParams();
  const { user } = useContext(AppState);
  console.log(user);

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const { data } = await axios.get(`/questions/${questionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuestion(data[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchQuestion();
  }, [questionId]);

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const { data } = await axios.get(`/answers/${questionId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const updatedAnswers = await Promise.all(
          data.map(async (question) => {
            const username = await getUsername(question.userid);
            return { ...question, username };
          })
        );

        setAnswers(updatedAnswers);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAnswers();
  }, [questionId]);

  const getUsername = async (userId) => {
    const res = await axios.get(`/users/${userId}`);
    return res.data[0].username;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `/answers/${questionId}`,
        {
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { answer, username: user.username },
      ]);

      setAnswer("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.question}>
        <h2>Question</h2>
        <div></div>
        <h3>{question?.title}</h3>
        <p>{question?.description}</p>
      </div>

      <div className={styles.answers}>
        <h2>Answer From the Community</h2>
        <div>
          {answers.map((answer, index) => (
            <AnswerCard
              key={answer.id}
              answer={answer}
              isLast={index == answers.length - 1}
            />
          ))}
        </div>
      </div>

      <div className={styles.answerQuestion}>
        <h2>Answer The Top Question</h2>
        <p>
          <Link to="">Go to Question page</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Answer..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
          />
          <button type="submit">Post Your Answer</button>
        </form>
      </div>
    </div>
  );
}
