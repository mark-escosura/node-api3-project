const User = require("../users/users-model.js");

// next() -> tells the computer to continue with the program

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString();
  const method = req.method;
  const url = req.oiginalURL;
  console.log(`[${timestamp}] ${method} to ${url}`);
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
    const user = await User.getById(id);
    if (!user) {
      res.status(404).json({
        message: "user not found",
      });
    } else {
      req.user = user; // saves other middlewares a db trip
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    req.name = name.trim(); // saves other middlewares a db trip
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text || !text.trim()) {
    res.status(400).json({
      message: "missing required text field",
    });
    next();
  } else {
    req.text = text.trim(); // saves other middlewares a db trip
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
