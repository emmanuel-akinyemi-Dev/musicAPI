const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    
        email:{
            type: String,
            required: true
        }, 
        password: {
            type: String,
            required: true
        }, 
        fullName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: String, 
        bio: {
            type: String,
            default: 'tell us about yourself',
        },
        avatar: {
            type: String,
             default: 'https://i.ibb.co/5Y3m5Y1/default.jpg',
        },
          playlist: { type: [mongoose.Types.ObjectId] ,
              ref:   'Playlist' 
          },  
         created_at: Date,  
    });

module.exports = mongoose.model('User', UserSchema);