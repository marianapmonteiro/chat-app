import { genSalt, hash } from "bcrypt"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false,

    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup: {
        type: Boolean,
        required: false,
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Users"
        },
    ],
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
});

const User = mongoose.model("Users", userSchema);

export default User;