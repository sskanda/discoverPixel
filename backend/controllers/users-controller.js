const HttpError = require("../models/http-error");
const { use } = require("../routes/places-routes");

const DUMMY_USERS = [
  {
    name: "skaz",
    email: "skaz@gmail.com",
    password: "12345",
  },
];

const getAllUsers = (req, res, next) => {
  res.status(200).json(DUMMY_USERS);
};

const singupUser = (req, res, next) => {
  const user = req.body; // { pid: 'p1' }
  DUMMY_USERS.push(user);

  res.status(200).send("User Signed Up"); // => { place } => { place: place }
};

const LoginUser = (req, res, next) => {
  const user = req.body;
  console.log(user);
  const currentUser = DUMMY_USERS.find(
    (p) => p.email === user.email && p.password === user.password
  );

  if (currentUser) res.status(200).send("User Logged In");
  else res.status(200).send("User Doesnt Exisits");
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

exports.singupUser = singupUser;
exports.LoginUser = LoginUser;
exports.getAllUsers = getAllUsers;
