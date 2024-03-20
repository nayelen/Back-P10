const jwt = require("jsonwebtoken");

const getToken = (id) => {
  return jwt.sign({ id },
    process.env.JWT_SECRET,
    { expiresIn: "1y" }
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { getToken, verifyToken }