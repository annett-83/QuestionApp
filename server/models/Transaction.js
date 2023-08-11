const { Schema, model } = require("mongoose");

const schema = new Schema(
    {
        // это еще не реализовано, это система платежей
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seceiver: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Transaction", schema);
