require('dotenv').config();
//const { ObjectId } = require('mongodb');
//const mongoose = require('mongoose');
// const { client } = require('./mongodb');
const MONGODB_URI = process.env.MONGODB_URI;
const { MongoClient } = require('mongodb');

async function fetchedNews() {
    const client = new MongoClient(MONGODB_URI);
    const dbName = 'test';
    const collectionName = 'news';

    try {
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const documents = await collection.find({}).toArray();

        /*const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(9, 0, 0, 0);
*/
        const filteredData = await collection.find({}).toArray();;
               console.log('Fetched documents:', filteredData);
        return filteredData;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        client.close();
    }
}

module.exports=fetchedNews;