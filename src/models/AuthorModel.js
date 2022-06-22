
        
const mongoose = require('mongoose');

// Author schema
const AuthorSchema = new mongoose.Schema(
  {
    
    FirsNtame: {
      type: String,
      required: true,
    },
    
    lastName: {
        type: String,
        required: true,
      },
      Title: {
        type: String,
        enum: ["Mr", "Mrs", "miss"] 
      },

    
     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
      },
password: {
    type: String,
    required: true,
  },
  
  },

  { timestamps: true });

  module.exports = mongoose.model('AuthorModel', authorSchema)