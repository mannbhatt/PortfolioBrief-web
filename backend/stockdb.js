require('dotenv').config();
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { mongoDBInstance } = require('./mongodb');
const MONGODB_URI = process.env.MONGODB_URI;
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

const stocklistSchema = new mongoose.Schema({
    selectedStocks: [String],
    userEmail: String,
    newsType: String,
    recieveNews: Boolean,
});

const Stocks = mongoose.model('stocklist', stocklistSchema);

async function fetchStocklist(userEmail) {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'stocklists';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const documents = await collection.find({ userEmail }).toArray();
        return documents;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateStocks(email) {
    try {
        const documents = await fetchStocklist(email);
        if (typeof documents === "undefined") {
            return [];
        }

        const listedStocks = [];

        for (let i = 0; i < documents.length; i++) {
            if (documents[i].userEmail === email) {
                listedStocks.push(documents[i]);
            }
        }

        return listedStocks;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchEmail(userEmail) {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const db = client.db(dbName);
        const collection = db.collection('stocklists');

        const email = userEmail;

        const documents = await collection.find({ userEmail }).toArray();
        
        return documents;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateField(documentId, updatedValue) {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'stocklists';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const filter = { _id: documentId };
        const update = { $set: { selectedStocks: updatedValue } };

        const result = await collection.updateOne(filter, update);

        return { status: true };
    } catch (error) {
        console.error('Error:', error);
    }
}

async function stockSaveToDB(stocksList, email) {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'stocklists';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const record = await fetchEmail(email);

        if (record[0] && record[0].userEmail === email) {
            const response = await updateField(record[0]._id, stocksList);
            return response;
        } else {
            const newStockList = {
                selectedStocks: stocksList,
                userEmail: email,
            };

            const result = await collection.insertOne(newStockList);

            return { status: true, user: result.ops[0] };
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return { status: false, error: err.message };
    }
}

async function fetchedNews() {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'news';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const filteredData = await collection.find({}).toArray();
      
        return filteredData;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function savePreference({ recieveNewsText, newsTypeText, email }) {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'stocklists';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const record = await fetchEmail(email);

        if (record[0] && record[0].userEmail === email) {
            const filter = { _id: record[0]._id };
            const update = { $set: { recieveNews: recieveNewsText, newsType: newsTypeText } };

            const result = await collection.updateOne(filter, update);
        }
        return { status: true, message: 'saved done' };
    } catch (error) {
        return { status: false, message: error };
    }
}

async function adduser(email) {
    const record = await fetchEmail(email)
    if (record[0] && record[0].userEmail == email) {
        const response = true;
        return response;
    } else {
        const client = await mongoDBInstance.getClient();

        try {
            await client.connect();
            console.log('Connected successfully to server');

            const newStockList = new Stocks({
                selectedStocks: [],
                userEmail: email,
                newsType: "Only News",
                recieveNews: true,

            });

            const data = await newStockList.save();

            return { status: true, user: data };
        } catch (err) {
            console.error('An error occurred:', err);
            return { status: false, error: err.message };
        }
    }
}

module.exports = { stockSaveToDB, updateStocks, savePreference, fetchedNews, adduser };
