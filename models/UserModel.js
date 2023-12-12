import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName',
    },
    location: {
        type: String,
        default: 'my city',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
});

// This will remove the password field when retrieving user info.
UserSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}
export default mongoose.model('user', UserSchema);