const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId:{type:String},
    email: { type: String, required: true, unique: true },
    googleAccessToken:{type:String},
    googleRefreshToken:{type:String}
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
