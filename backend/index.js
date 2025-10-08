import express from 'express';
import cors from 'cors';
import serverless from 'serverless-http';
import { stockSaveToDB, updateStocks, savePreference, fetchedNews, adduser } from './stockdb';
import { userNews } from './sendResNews';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "https://portfoliobrif-frontend.vercel.app", // your frontend URL
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

// ---- Routes ---- //

// Web3 test
app.get('/gm', (req, res) => {
  res.send('GM!');
});

// Add stocks
app.post('/api/addstocks', async (req, res) => {
  const { stocks, userEmail } = req.body;
  try {
    const result = await stockSaveToDB(stocks, userEmail);
    if (result.status) {
      res.status(200).json({ message: 'Function executed and data saved', user: result.user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update stocks
app.post('/api/updatestocks', async (req, res) => {
  const { email } = req.body;
  try {
    const listedStocks = await updateStocks(email);
    if (listedStocks) {
      if (!listedStocks[0]) {
        res.status(200).json({ status: true, message: 'Stocks listed successfully', stocks: [] });
      } else {
        res.status(200).json({ status: true, message: 'Stocks listed successfully', stocks: listedStocks[0].selectedStocks });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add user
app.post('/api/adduser', async (req, res) => {
  const { email } = req.body;
  try {
    const test = await adduser(email);
    if (test) {
      res.status(200).json({ status: true, message: 'User added successfully', userexist: test });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Save preferences
app.post('/api/savepreference', async (req, res) => {
  try {
    const { recieveNewsText, newsTypeText, email } = req.body;
    const response = await savePreference({ recieveNewsText, newsTypeText, email });
    if (response.status) {
      res.status(200).json({ message: 'Data saved successfully' });
    } else {
      throw response.message;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving data' });
  }
});

// User-specific news
app.post('/api/usernews', async (req, res) => {
  const { email } = req.body;
  try {
    const news = await userNews(email);
    if (news.length > 0) {
      res.status(200).json({ status: true, message: 'Stocks listed successfully', news });
    } else if (news.length === 0) {
      res.status(404).json({ status: false, message: 'Empty news' });
    } else {
      res.status(404).json({ status: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

// Fetch news
app.post('/api/fetchnews', async (req, res) => {
  try {
    const fetchedNewsData = await fetchedNews();
    if (fetchedNewsData) {
      res.status(200).json({ status: true, message: 'News listed successfully', news: fetchedNewsData });
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ---- Export serverless handler for Vercel ---- //
export const handler = serverless(app);
