const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: 'user', enum: ['user', 'admin']},
        name: { type: String, required: false }
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);

module.exports = User;