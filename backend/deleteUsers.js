require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

exports.handler = async function (event) {
    try {
        const { id } = JSON.parse(event.body);
        const client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        const db = client.db("myDatabase");
        const collection = db.collection("user");

        await collection.deleteOne({ _id: new ObjectId(id) });
        client.close();

        return { statusCode: 200, body: "User Deleted" };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};
