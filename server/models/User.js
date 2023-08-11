const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],
    sex: { type: String, enum: ["male", "female", "other"] },
  },
  {
    timestamps: true,
  }
);
//mongoos doc ( виртуальное поле) для проверки юзера (учитель или нет)
schema.virtual('isTeacher')
  .get(function () {
    return ((this.subjects) && (this.subjects.length > 0));
  });

schema.methods.teachesSubject = function (subjectId) {
  return ((this.subjects) && (this.subjects.filter(s => s.toString() === subjectId.toString()).length > 0));
};


module.exports = model("User", schema);

