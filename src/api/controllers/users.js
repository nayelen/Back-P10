const bcrypt = require('bcrypt');
const User = require('../models/users');
const { getToken } = require('../../utils/jwt');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("events")
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("error")
  }
};

const getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("events");

    if (!user) {
      return res.status(404).json("Usuario no encontrado")
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json("error")
  }
};

const getUsersByEvent = async (req, res, next) => {
  try {
    const { events } = req.params;
    const users = await User.find({ events });
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json("error")
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Email o contraseña incorrectos")
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = getToken(user._id);
      return res.status(200).json({ token, user })
    } else {
      return res.status(400).json("Email o contraseña incorrectos")
    }
  } catch (error) {
    return res.status(400).json(error)
  }
};

const register = async (req, res, next) => {
  try {
    const userDuplicated = await User.findOne({ email: req.body.email });
    if (userDuplicated) {
      return res.status(400).json("Usuario ya existente")
    };
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: "user"
    })

    const user = await newUser.save();
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json("error")
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res.status(400).json("No puedes modificar a alguien que no seas tú! ❌")
    }

    const oldUser = await User.findById(id);
    const newUser = new User(req.body);
    newUser._id = id;
    newUser.rol = "user";

    if (req.user.rol === "admin") {
      newUser.rol = req.body.rol;
    }

    if (newUser.events) {
      newUser.events = [...oldUser.events, ...newUser.events];
    }
    const userUpdate = await User.findByIdAndUpdate(id, newUser, { new: true, });
    return res.status(200).json(userUpdate)
  } catch (error) {
    return res.status(400).json("error")
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({
      mensaje: "Usuario eliminado con éxito",
      usuarioEliminado: user,
    })
  } catch (error) {
    return res.status(404).json(error)
  }
};
const deleteUserEvent = async (req, res, next) => {
  try {
    const { userId, eventId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" })
    }

    const indiceEvent = user.events.findIndex(event => event.toString() === eventId)
    console.log(indiceEvent)
    if (indiceEvent === -1) {
      return res.status(404).json({ mensaje: 'Evento no asociado con este asistente' });
    }
    user.events.splice(indiceEvent, 1);
    console.log(user.events)

    await User.updateOne({ _id: userId }, { $set: { events: user.events } });
    console.log(user)

    return res.status(200).json({
      mensaje: "Evento eliminado con éxito",
      user
    })
  } catch (error) {
    return res.status(400).json(error)
  }
};




module.exports = { getUsers, getUsersById, login, register, updateUser, deleteUser, deleteUserEvent, getUsersByEvent }