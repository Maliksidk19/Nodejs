import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI =
  "mongodb+srv://maliksidk19:NetHunterio89@clustor1.xmh5k.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGO_URI);

const collection = client.db("test").collection("accounts");

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Conneted to Database !!");
  } catch (err) {
    console.log("Error Connecting to the Database: ", err);
  }
};

// const documentsToFind = { balance: { $gt: 470000 } };
const documentToFind = { _id: new ObjectId("642da4c3df4d668921aa3587") };

const main = async () => {
  try {
    await connectToDatabase();

    let result = await collection.findOne(documentToFind);
    // let documents = collection.countDocuments(documentsToFind);
    // await result.forEach((doc) => console.log(doc));
    // console.log(`Found ${await documents} documents`);

    console.log("Found one document");
    console.log(result);
  } catch (err) {
    console.error("Error Inserting Document: ", err);
  } finally {
    await client.close();
  }
};

main();
