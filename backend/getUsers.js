require("dotenv").config();
const { MongoClient } = require("mongodb");

exports.handler = async function () {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const db = client.db("myDatabase");
        const collection = db.collection("user");

        const users = await collection.find().toArray();
        client.close();

        return {
            statusCode: 200,
            body: JSON.stringify(users),
        };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
