const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
    
      
      URL: {
        type: Map,
        of: String, 
        required: false,
      }
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;
