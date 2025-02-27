import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    alertType: { type: String, required: true },
    severity: { type: String, required: true },
    mitreAttck: {
      tactic: { type: String, required: true },
      technique: { type: String, required: true },
      subTechnique: { type: String, required: true },
    },
    cve: { type: String, required: true },
    malware: { type: String, required: true },
    details: { type: String, required: true },
    correctiveAction: { type: String, required: true },
  },
  { timestamps: true }
);

const Alerts = mongoose.models.alerts || mongoose.model("alerts", alertSchema);

export default Alerts;
