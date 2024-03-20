const { isAuth } = require("../../middlewares/auth");
const { getEvents, getEventById, postEvent, updateEvent, deleteEvent } = require("../controllers/events");



const eventsRouter = require("express").Router();

eventsRouter.get("/", getEvents);
eventsRouter.get("/:id", getEventById);
eventsRouter.post("/", postEvent);
eventsRouter.put("/:id", isAuth, updateEvent);
eventsRouter.delete("/:id", isAuth, deleteEvent);


module.exports = eventsRouter;