const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getUsers, getUsersById, login, register, updateUser, deleteUserEvent, getUsersByEvent, deleteUser } = require("../controllers/users");

const usersRouter = require("express").Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUsersById);
usersRouter.get("/events/:events", isAdmin, getUsersByEvent)
usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.put("/:id", isAuth, updateUser);
usersRouter.delete("/:id", isAdmin, deleteUser)
usersRouter.delete("/:userId/events/:eventId", isAuth, deleteUserEvent)

module.exports = usersRouter;