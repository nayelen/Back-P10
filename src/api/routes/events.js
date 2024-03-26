const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/files");
const { getEvents, getEventById, postEvent, updateEvent, deleteEvent } = require("../controllers/events");



const eventsRouter = require("express").Router();

eventsRouter.get("/", getEvents);
eventsRouter.get("/:id", getEventById);
eventsRouter.post("/", isAdmin, upload.single("img"), postEvent);
eventsRouter.put("/:id", isAuth, upload.single("img"), updateEvent);
eventsRouter.delete("/:id", isAdmin, deleteEvent);


module.exports = eventsRouter;