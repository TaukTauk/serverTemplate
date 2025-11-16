import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["superadmin", "admin", "moderator", "user"],
		default: "user",
	},
	profile_url: {
		type: String,
		default: "",
	},
	last_login: {
		type: Date,
		default: null,
	},
	is_active: {
		type: Boolean,
		default: true,
	}
},
	{
		timestamps: true,
	}
);

// hash password before saving
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

// compare password
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);