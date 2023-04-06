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

// const pipeline = [
//   { $match: { balance: { $lt: 10000000 } } },
//   {
//     $group: {
//       _id: "$account_type",
//       total_balance: { $sum: "$balance" },
//       avg_balance: { $avg: "$balance" },
//     },
//   },
// ];

const pipeline = [
  { $match: { account_type: "Manager", balance: { $gte: 15000 } } },
  { $sort: { balance: -1 } },
  {
    $project: {
      _id: 0,
      account_type: 1,
      account_id: 1,
      balance: 1,
      gbp_balance: { $divide: ["$balance", 1.3] },
    },
  },
];

const main = async () => {
  try {
    await connectToDatabase();

    let result = await collection.aggregate(pipeline);
    for await (const doc of result) {
      console.log(doc);
    }
  } catch (err) {
    console.error("Error Agreggating Pipeline: ", err);
  } finally {
    await client.close();
  }
};

main();
