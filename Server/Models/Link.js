const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    links: [
        {
            shortenLink: { type: String, required: true },
            originalLink: { type: String, required: true }
        }
    ]
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
