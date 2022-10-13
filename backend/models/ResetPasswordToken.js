// authentication token for password reset
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 }, // token expires after 3600 seconds (1 hour)
});

module.exports = mongoose.model("resetPasswordToken", tokenSchema);