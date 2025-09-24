require('dotenv').config();
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { mongoDBInstance } = require('./mongodb');
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

// Define fetchedNews function
async function fetchedNews() {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'newsarticles';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const documents = await collection.find({}).toArray();

        console.log("Fetched news data:", documents);
        return documents;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}
const fetchedNeews = fetchedNews();
console.log(fetchedNeews);
module.exports = { fetchedNews };
