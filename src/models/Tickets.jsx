import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  dateCreated: { type: Date, default: Date.now },
  comments: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Tickets =
  mongoose.models.tickets || mongoose.model("tickets", ticketSchema);

export default Tickets;
