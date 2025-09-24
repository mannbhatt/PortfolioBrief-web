  require('dotenv').config();
  const { MongoClient } = require('mongodb');

  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }
 

  const uri = process.env.MONGODB_URI;

  const options = {};

  class MongoDB {
    constructor() {
      this.client = new MongoClient(uri, options);
      this.clientPromise = this.client.connect();
    }
    
    async getClient() {
      await this.clientPromise;
      return this.client;
    }
  }

  const mongoDBInstance = new MongoDB();

  module.exports = { mongoDBInstance };