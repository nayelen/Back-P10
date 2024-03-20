const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  rol: {
    type: String,
    required: true,
    default: "user",
    enum: ["admin", "user"]
  },
  events: [{ type: mongoose.Types.ObjectId, required: false, ref: "events" }],

},
  {
    timestamps: true,
    collection: "users",
  });

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10)
});

const User = mongoose.model("users", userSchema, "users");
module.exports = User;