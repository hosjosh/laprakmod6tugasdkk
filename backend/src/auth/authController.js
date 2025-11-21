import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const APP_USERNAME = process.env.APP_USERNAME;
const APP_PASSWORD = process.env.APP_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const STATIC_LOGIN_TOKEN = process.env.STATIC_LOGIN_TOKEN;

// ----------------------
// LOGIN USERNAME/PASSWORD
// ----------------------
export async function loginUser(req, res) {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username dan password wajib." });

  if (username !== APP_USERNAME)
    return res.status(401).json({ error: "Username salah" });

  const isValid = await bcrypt.compare(password, await bcrypt.hash(APP_PASSWORD, 10));

  if (!isValid)
    return res.status(401).json({ error: "Password salah" });

  const token = jwt.sign({ username, name: process.env.APP_NAME }, JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({
    token,
    user: { username, name: process.env.APP_NAME },
  });
}

// ----------------------
// LOGIN TOKEN MANUAL
// ----------------------
export function loginWithToken(req, res) {
  const { token } = req.body;

  if (!token)
    return res.status(400).json({ error: "Token harus diisi" });

  if (token !== STATIC_LOGIN_TOKEN)
    return res.status(401).json({ error: "Token salah" });

  const jwtToken = jwt.sign(
    { username: "token_user", name: "Token Login" },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token: jwtToken,
    user: { username: "token_user", name: "Token Login" },
  });
}
