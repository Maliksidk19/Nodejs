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

const documentsToDelete = { balance: { $lt: 470000 } };
// const documentToDelete = { _id: new ObjectId("642da4c3df4d668921aa3587") };

const main = async () => {
  try {
    await connectToDatabase();

    // let result = await collection.deleteOne(documentToDelete);
    // result.deletedCount === 1
    //   ? console.log("Deleted one document")
    //   : console.log("No documents deleted");

    let result = await collection.deleteMany(documentsToDelete);
    result.deletedCount > 0
      ? console.log(`Deleted ${result.deletedCount} documents`)
      : console.log("No documents deleted");
  } catch (err) {
    console.error("Error Inserting Document: ", err);
  } finally {
    await client.close();
  }
};

main();
