const router = require("express").Router();

const Users = require("./users-model.js");

const restricted = require("../auth/authenticate-middleware.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => res.status(500).send(error));
});
// localhost:5000/api/users tested in Insomia

module.exports = router;
