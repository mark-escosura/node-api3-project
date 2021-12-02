const express = require("express");
const { validateUserId, validateUser } = require("../middleware/middleware");

// You will need `users-model.js` and `posts-model.js` both
const Users = require("./users-model");
const router = express.Router();
// The middleware functions also need to be required

router.get("/", async (req, res) => {
  try {
    const allUsers = await Users.get();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({
      message: "Error returning all users",
      error: err.message,
    });
  }
});

router.get("/:id", validateUserId, (req, res, next) => {
  // eslint-disable-line
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.status(200).json(req.user);
});

router.post("/", validateUser, async (req, res, next) => {
  // eslint-disable-line
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await Users.insert({ name: req.name });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", [validateUserId, validateUser], async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params;
  const name = { name: req.name };
  const updatedUser = await Users.update(id, name);
  const user = await Users.getById(id);
  try {
    res.status(200).json(updatedUser);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
