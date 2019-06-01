import * as mongoose from 'mongoose'

interface IUsers extends mongoose.Document {
    id: String,
    passwd: String,
    token: String
}
const UserSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    passwd: {type: String, required: true},
    token: {type: String, required: true}
})

export const Users = mongoose.model<IUsers>("users", UserSchema);