const mongoose = require("mongoose");
import { v4 as uuidv4 } from "uuid";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is requried!"],
    },
    email: {
      type: String,
      required: [true, "Email is requried!"],
    },
    userInfo: String,
    password: {
      type: String,
      required: [true, "Password is requried!"],
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
    favourites: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (plainPassword) {
    this._password = plainPassword;
    this.salt = uuidv4();
    this.password = this.securePassword(plainPassword);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.securePassword(plainPassword) === this.password;
  },
  securePassword: function (plainPassword) {
    if (!plainPassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
