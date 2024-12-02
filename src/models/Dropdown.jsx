import mongoose from "mongoose";

const dropdownSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  options: {
    type: [String],
    required: [true, "Options are required"],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "Options array must have at least one item",
    },
  },
});

const Dropdown =
  mongoose.models.Dropdown || mongoose.model("Dropdown", dropdownSchema);

export default Dropdown;
