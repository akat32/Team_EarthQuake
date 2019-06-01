import * as mongoose from 'mongoose'

interface IUsers extends mongoose.Document {
    email: String,
    passwd: String,
    token: String,
    name: String,
    isCompany: Boolean,
    myDonate: [{
        title: String,
        photoUrl : String,
        donate: Number,
        address: String,
        price: Number,
        token: String
    }],
    myBidding: [{
        title: String,
        photoUrl : String,
        donate: Number,
        address: String,
        price: Number,
        token: String    
    }],
    myRequest: [{
        title: String,
        photoUrl : String,
        donate: Number,
        address: String,
        price: Number,
        token: String
    }]
}
const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    passwd: {type: String, required: true},
    token: {type: String, required: true},
    name: {type : String, unique: true},
    isCompany: {type: Boolean, default: false},
    myDonate: [{
        title: String,
        photoUrl : String,
        donate: Number,
        address: String,
        price: Number,
        token: String
    }],
    myBidding: [{
        title: String,
        photoUrl : String,
        donate: Number,
        address: String,
        price: Number,
        token: String
    }],
    myRequest: [{
        title: String,
        photoUrl : String,
        donate: Number,
        address: String,
        price: Number,
        token: String
    }]
})

export const Users = mongoose.model<IUsers>("users", UserSchema);