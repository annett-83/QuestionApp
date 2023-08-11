const { Schema, model } = require("mongoose");
const Answer = require("./Answer").schema;

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // кто задал вопрос
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answer:  {
      type:Answer,
      required: false,
    },
    price: {
      type: Number,
    },
    subject: { type: Schema.Types.ObjectId, ref: "Subject" },
  },
  {
    timestamps: true,
  }
);

schema.virtual('jsDate')
  .get(function () {
    return (new Date(this.updatedAt));
  });
module.exports = model("Question", schema);
