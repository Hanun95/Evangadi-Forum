import { useContext, useEffect, useState } from "react";
import axios from "../../axiosConfig";
import { AppState } from "../../App";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import QuestionCard from "./QuestionCard/QuestionCard";
import { IoSearch } from "react-icons/io5";

export default function Home() {
  const {
    user: { username },
  } = useContext(AppState);
  const [questions, setQuestions] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("/questions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(data);

        const updatedQuestions = await Promise.all(
          data.map(async (question) => {
            const username = await getUsername(question.userid);
            return { ...question, username };
          })
        );

        setQuestions(updatedQuestions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, []);

  const getUsername = async (userId) => {
    const res = await axios.get(`/users/${userId}`);
    return res.data[0].username;
  };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.get(`/questions/search/${searchQuery}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });

  //     const updatedQuestions = await Promise.all(
  //       data.map(async (question) => {
  //         const username = await getUsername(question.userid);
  //         return { ...question, username };
  //       })
  //     );

  //     setQuestions(updatedQuestions);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/questions/search/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedQuestions = await Promise.all(
        data.map(async (question) => {
          const username = await getUsername(question.userid);
          return { ...question, username };
        })
      );

      setQuestions(updatedQuestions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.welcomeWrapper}>
        <div className={styles.button}>
          <Link to="/ask-question">Ask Question</Link>
        </div>
        <span className={styles.username}>Welcome {username}</span>
      </div>

      <div>
        <div className={styles.searchWrapper}>
          <p>Questions</p>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search Questions"
              className={styles.search}
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              onChange={(e) => handleSearch(e)}
            />
            <button type="submit" className={styles.button}>
              <IoSearch />
            </button>
          </form>
        </div>
        <div className={styles.questionsWrapper}>
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              isLast={index == questions.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
