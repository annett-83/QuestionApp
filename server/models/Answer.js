const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    // кто ответил
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }, { _id : false },
  {
    timestamps: true,
  }
);

module.exports = model("Answer", schema);
