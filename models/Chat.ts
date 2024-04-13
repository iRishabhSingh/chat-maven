import mongoose from "mongoose";

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agent: {
      type: String,
      default: "ChatVirtuoso",
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "agent"],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Chat || mongoose.model("Chat", chatSchema);
