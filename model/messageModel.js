const { Schema, model, default: mongoose } = require("mongoose");

const messageModel = Schema({
    message: {
        text: {
            type: String,
            required: true,
        },
    },
    users: Array,
    sender: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    }
}, { timestamps: true })

module.exports = model("Messages", messageModel)