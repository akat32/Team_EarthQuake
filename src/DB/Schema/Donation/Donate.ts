import * as mongoose from 'mongoose'
import { Z_ASCII } from 'zlib';

interface IDonate extends mongoose.Document {
    title : String,
    explanation: String,
    address: String,
    donate: Number, // 현재 기부 금액
    photoUrl: String,
    x: Number,
    y: Number,
    z: Number,
    biddingCompany: String, // company token
    price: Number,
    userEmail: String,
    token: String,
    damage: Number
}
const DonateSchema = new mongoose.Schema({
    title : String,
    explanation: String,
    adress: String,
    donate: {type : Number, default: 0}, // 현재 기부 금액
    photoUrl: String,
    biddingCompany: String,
    x: Number,
    y: Number,
    z: Number,
    price: { type : Number, default: 0},
    userEmail: String,
    token: String,
    damage: {type: Number, default: 0}
})

export const Donate = mongoose.model<IDonate>("donate", DonateSchema);