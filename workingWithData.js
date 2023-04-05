import { MongoClient } from "mongodb";

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

const sampleAccount = [
  {
    account_holder: "Linux Torvalds",
    account_id: "MDB092348",
    account_type: "Checking",
    balance: 435094,
    last_updated: new Date().toUTCString(),
  },
  {
    account_holder: "Bill Gates",
    account_id: "MICROSOFT678",
    account_type: "Manager",
    balance: 2344329,
    last_updated: new Date().toUTCString(),
  },
  {
    account_holder: "Tom Holand",
    account_id: "TOM2308321",
    account_type: "Worker",
    balance: 3247432,
    last_updated: new Date().toUTCString(),
  },
  {
    account_holder: "Malik",
    account_id: "MK02348",
    account_type: "Boss",
    balance: 3215094432,
    last_updated: new Date().toUTCString(),
  },
];

const main = async () => {
  try {
    await connectToDatabase();

    let result = await collection.insertMany(sampleAccount);
    console.log("Inserting Document: ", result.insertedIds);
  } catch (err) {
    console.error("Error Inserting Document: ", err);
  } finally {
    await client.close();
  }
};

main();
