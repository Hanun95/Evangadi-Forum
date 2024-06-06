import { dbConn } from "../db/dbConfig.js";

export const postQuestion = async (req, res) => {
  console.log(req.body);
  if (!req.body.title || !req.body.description) {
    return res.status(400).send("Title and description are required");
  }

  let response = null;
  if (req.body.tag) {
    const [question] = await dbConn.query(
      "INSERT INTO questions (title, description, tag, userid) VALUES (?,?,?,?)",
      [req.body.title, req.body.description, req.body.tag, req.user.userid]
    );
    response = question;
  } else {
    const [question] = await dbConn.query(
      "INSERT INTO questions (title, description, userid) VALUES (?,?,?)",
      [req.body.title, req.body.description, req.user.userid]
    );
    response = question;
  }

  if (response?.length === 0) {
    return res.status(500).send("Failed to post question");
  }

  res.send("Question posted");
};

export const getQuestions = async (req, res) => {
  const [questions] = await dbConn.query("SELECT * FROM questions");
  res.send(questions);
};

export const getQuestion = async (req, res) => {
  const [question] = await dbConn.query(
    "SELECT * FROM questions WHERE id = ?",
    [req.params.questionId]
  );

  if (question.length === 0) {
    return res.status(404).send("Question not found");
  }

  res.send(question);
};
