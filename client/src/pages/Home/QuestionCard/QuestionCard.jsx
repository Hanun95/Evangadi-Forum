import { Link } from "react-router-dom";
import propTypes from "prop-types";
import styles from "./questionCard.module.css";
import { BsPersonCircle } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";

export default function QuestionCard({ question, isLast }) {
  return (
    <div
      key={question?.id}
      className={`${styles.question} ${!isLast && styles.border}`}
    >
      <div>
        <div className={styles.user}>
          <BsPersonCircle className={styles.userAvatar} />
          <span>{question?.username}</span>
        </div>

        <Link to={`/question/${question?.id}`} className={styles.title}>
          {question?.title}
        </Link>
      </div>
      <MdNavigateNext className={styles.nextIcon} />
      <Link to={`/question/${question?.id}`} className={styles.view}>
        read more
      </Link>
    </div>
  );
}

QuestionCard.propTypes = {
  question: propTypes.object,
  isLast: propTypes.bool,
};
