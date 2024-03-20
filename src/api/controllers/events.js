const Event = require("../models/events");
const User = require("../models/users");

const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(404).json(error)
  }
};

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    return res.status(200).json(event);
  } catch (error) {
    return res.status(404).json(error)
  }
};

const postEvent = async (req, res, next) => {
  try {
    console.log(req.body);
    const newEvent = new Event(req.body);
    const event = await newEvent.save();
    console.log(event);
    return res.status(200).json(event);
  } catch (error) {
    return res.status(404).json(error)
  }
};

const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newEvent = new Event(req.body);
    newEvent._id = id;
    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, { new: true })
    return res.status(200).json(eventUpdated)
  } catch (error) {
    return res.status(404).json(error)
  }
};
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Evento eliminado con éxito",
      eventoEliminado: event,
    })
  } catch (error) {
    return res.status(404).json(error)
  }
};



module.exports = { getEvents, getEventById, postEvent, updateEvent, deleteEvent }