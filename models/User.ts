import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    settings: [
      {
        darkMode: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
    chats: [
      {
        chatId: {
          type: Schema.Types.ObjectId,
          ref: "Chat",
          required: true,
        },
        chatName: {
          type: String,
          required: true,
        },
        dateCreated: {
          type: Date,
          required: true,
        },
        dateEdited: {
          type: Date,
          required: true,
        },
        archived: {
          type: Boolean,
          required: true,
          default: false,
        },
        sharable: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
