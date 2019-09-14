const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // installed this library

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      // a jwt should be generated
      const token = generateToken(saved);
      res.status(201).json({
        user: saved,
        token
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // a jwt should be generated
        const token = generateToken(user);
        // console.log('token', token);
        console.log(user.username);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
// tested localhost:5000/api/auth/login in Insomia

function generateToken(user) {
  // header payload and verify signature
  // payload -> username, id, roles, expiration date
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };
  // verify signature -> a secret
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
