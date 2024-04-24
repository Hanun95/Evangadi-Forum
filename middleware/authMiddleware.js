import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Authentication invalid" });
  }

  try {
    const { username, userid } = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication invalid" });
  }
  //   res.redirect("/login");
}
