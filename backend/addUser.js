require("dotenv").config();
const { MongoClient } = require("mongodb");

exports.handler = async function (event) {
    try {
        const { name, age, city } = JSON.parse(event.body);

        if (!name || !age || !city) {
            return { statusCode: 400, body: "All fields are required!" };
        }

        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const db = client.db("myDatabase");
        const collection = db.collection("user");

        await collection.insertOne({ name, age, city });
        client.close();

        return { statusCode: 200, body: "User Added Successfully" };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
