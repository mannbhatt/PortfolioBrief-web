// Senior Developer: ChatGPT
// Intern: Satyajit & Mann
require('dotenv').config();
const puppeteer = require("puppeteer");
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const companies = require('../companyList'); 
const { mongoDBInstance } = require('../mongodb');

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

const allNews = [];

async function scrapeData(para) {
    return new Promise(async resolve => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        try {
            await page.goto(`https://www.livemint.com/companies${para}`, { waitUntil: 'networkidle2' });

            const mainSec = await page.$('.mainSec');
            const myListView = await mainSec.$('#mylistView');
            const listToStoryElements = await myListView.$$('.listtostory');

            const extractedData = [];

            const newsHeadline = await myListView.$('.cardHolder > div > .headline');
            const newsLinkElement = await newsHeadline.$('a');
            const newsInnerText = await newsHeadline.evaluate(a => a.innerText);
            const newsHref = await newsLinkElement.evaluate(a => a.getAttribute('href'));

            const newsTimeParent = await myListView.$('.cardHolder > div > article > span > span');
            const newsUpdatedTime = await newsTimeParent.evaluate(span => span.getAttribute('data-updatedtime'));

            extractedData.push({
                innerText: newsInnerText,
                href: "https://www.livemint.com" + newsHref,
                newsTime: newsUpdatedTime
            });

            for (const element of listToStoryElements) {
                const headlineSections = await element.$$('.headlineSec');
                const images=await element.$$('img');
                for (let i = 0; i < headlineSections.length; i++) {
                    const headlineSection = headlineSections[i];
                    const image = images[i]; 
                    const headline = await headlineSection.$('.headline');
                    const linkElement = await headline.$('a');
                    const innerText = await headline.evaluate(el => el.innerText);
                    const href = await linkElement.evaluate(a => a.getAttribute('href'));
            
                    const timeParent = await headlineSection.$('span > span[data-updatedtime]');
                    const timeAttribute = await timeParent.evaluate(span => span.getAttribute('data-updatedtime'));
            
                    let imageUrl = null;
            
                    if (image) {
                        imageUrl = await page.evaluate((img) => img.getAttribute('data-src'), image);
                    }
            
                    extractedData.push({
                        innerText: innerText,
                        href: "https://www.livemint.com" + href,
                        newsTime: timeAttribute,
                        imageUrl:imageUrl
                    });
                }
            }

           // console.log('Extracted Data:', extractedData);
            // console.log('Total News:', extractedData.length);

            allNews.push(...extractedData)
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await browser.close();
        }
        resolve();
    });
}

async function saveToDB(newsArr) {
    try {
        const client = await mongoDBInstance.getClient();
        const database = client.db('test');
        const collection = database.collection('news');

        const newsSchema = new mongoose.Schema({
            innerText: String,
            href: String,
            newsTime: Date,
            tag: String,
            imageUrl:String
        });

        const News = mongoose.model('news', newsSchema);

        for (const element of newsArr) {
            try {
                const existingNews = await collection.findOne({ innerText: element.innerText });

                if (!existingNews) {
                    const newsItem = new News({
                        innerText: element.innerText,
                        href: element.href,
                        newsTime: element.newsTime,
                        tag: element.tag,
                        imageUrl:element.imageUrl
                    });

                    const data = await newsItem.save();
                    console.log('News article added successfully.');
                } else {
                    console.log('News article already exists. Skipping.');
                }
            } catch (err) {
                console.error('An error occurred:', err);
            }
        }
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

scrapeData('/page-2').then(() => {
    scrapeData('/').then(() => {
       scrapeData('/page-3').then(() => {
            // console.log('Extracted Data:', allNews);
            // console.log('Total News:', allNews.length);

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            yesterday.setHours(9, 0, 0, 0);

            const filteredData = allNews.filter(item => new Date(item.newsTime) > yesterday );

            filteredData.forEach(news => {
                const matchingCompany = companies.find(company => news.innerText.includes(company));
                news.tag = matchingCompany ? matchingCompany : '';
            });

            console.log('Extracted Data:', filteredData);
            console.log('Total News:', filteredData.length);
            

            saveToDB(filteredData);
        })
    })
});
