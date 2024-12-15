require("dotenv").config();
const { MongoClient } = require('mongodb')

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let db;

const connectToDatabase = async () => {
    if (!db) {
        try {
            await client.connect();
            db = client.db('trip-haven');
            console.log('Connected to MongoDB database trip-haven.')
        } catch (error) {
            console.log("Failed to connect to MongoDB :", error)
            process.exit(1)
        }
    }
    return db;
}

module.exports = connectToDatabase