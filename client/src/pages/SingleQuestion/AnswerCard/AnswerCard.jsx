import propTypes from "prop-types";
import styles from "./answerCard.module.css";
import { BsPersonCircle } from "react-icons/bs";

export default function AnswerCard({ answer, isLast }) {
  console.log(answer);
  return (
    <div
      key={answer?.id}
      className={`${styles.answer} ${!isLast && styles.border}`}
    >
      <div>
        <div className={styles.user}>
          <BsPersonCircle className={styles.userAvatar} />
          <span>{answer?.username}</span>
        </div>

        <p className={styles.title}>{answer?.answer}</p>
      </div>
    </div>
  );
}

AnswerCard.propTypes = {
  answer: propTypes.object,
  isLast: propTypes.bool,
};
