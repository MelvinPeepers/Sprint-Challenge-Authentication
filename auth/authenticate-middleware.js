/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  // see if there is even a token
  // assuming there is one: check if it is valid =>
  //rehash the header + payload + secret to see if it matches our
  // verified signature
  // user id or username
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        console.log("failed verify", error);
        res.status(401).json({
          message: "not verified"
        });
      } else {
        // token is valid
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "no token provided"
    });
  }
};
// tested in Insomia Works
