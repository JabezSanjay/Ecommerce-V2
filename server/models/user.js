const mongoose = require("mongoose");
const crypto = require("crypto");
var uuid = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is requried!"],
    },
    email: {
      type: String,
      required: [true, "Email is requried!"],
    },
    user_info: String,
    encrypted_password: {
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

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid.v4();
    this.encrypted_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encrypted_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", UserSchema);
