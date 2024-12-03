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
      message: "The options array must have at least one item.",
    },
  },
});

const Dropdowns =
  mongoose.models.dropdowns || mongoose.model("dropdowns", dropdownSchema);

export default Dropdowns;
