import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, default: "customer" },
    phone: { type: String, required: true },
    domains: {
      type: [String],
      validate: {
        validator: function (value) {
          if (this.role === "analyst") {
            return value.length === 0;
          }
          return true;
        },
        message: "Analysts cannot have domains",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
