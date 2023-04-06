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

// const documentToUpdate = { _id: new ObjectId("642da4c3df4d668921aa3587") };
// const update = { $inc: { balance: 100 } };

const documentsToUpdate = { account_type: "checking" };
const update = { $push: { fav_foods: "SweetDish" } };

const main = async () => {
  try {
    await connectToDatabase();

    // let result = await collection.updateOne(documentToUpdate, update);
    // result.modifiedCount === 1
    //   ? console.log("Updated one documents")
    //   : console.log("No document updated");

    let result = await collection.updateMany(documentsToUpdate, update);
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No document updated");
  } catch (err) {
    console.error("Error Inserting Document: ", err);
  } finally {
    await client.close();
  }
};

main();
