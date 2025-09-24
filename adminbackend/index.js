require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { ObjectId } = require('mongodb');
const { fetchedNews } = require('./fetchNews'); 
const { mongoDBInstance } = require('./mongodb');

const app = express();
const port = process.env.PORT || 5000; 

app.use(express.json());
app.use(cors());

app.get('/gm', (req, res) => {
    res.send('GM!');
});

app.get('/api/adminfetchnews', async (req, res) => {
    try {
        const newsData = await fetchedNews();
        res.json(newsData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/api/editnews', async (req, res) => {
    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'newsarticles';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const { _id, title, summary, imageUrl, articleUrl, category, company, tags } = req.body;

        const result = await collection.updateOne(
            { _id: new ObjectId(_id) }, 
            { $set: { title, summary, imageUrl, articleUrl, category, company, tags } }
        );

        if (result.modifiedCount > 0) {
            res.json({ message: 'Record updated successfully' });
        } else {
            res.status(400).json({ message: 'No record found or not modified' });
        }
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.delete('/api/deletenews/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const client = await mongoDBInstance.getClient();

        const dbName = 'test';
        const collectionName = 'newsarticles';

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            const updatedNews = await fetchedNews(); 
            res.json(updatedNews);
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
