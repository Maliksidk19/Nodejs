import { MongoClient, ObjectId } from "mongodb";

const MONGO_URI =
  "mongodb+srv://maliksidk19:NetHunterio89@clustor1.xmh5k.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(MONGO_URI);

const accounts = client.db("test").collection("accounts");
const transfers = client.db("test").collection("transfers");

let account_id_sender = "MK02348";
let account_id_receiver = "MICROSOFT678";
let transaction_amount = 1000000;

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Conneted to Database !!");
  } catch (err) {
    console.log("Error Connecting to the Database: ", err);
  }
};

const session = client.startSession();

const main = async () => {
  try {
    await connectToDatabase();

    const transactionResults = await session.withTransaction(async () => {
      // Step 1: Update the sender balance
      const UpdateSenderBalance = await accounts.updateOne(
        { account_id: account_id_sender },
        { $inc: { balance: -transaction_amount } },
        { session }
      );

      console.log(
        `${UpdateSenderBalance.matchedCount} document(s) matched the filter, updated ${UpdateSenderBalance.modifiedCount} documnet(s) for the sender account`
      );

      // Step 2: Update the reciever balance
      const UpdateReceiverBalance = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $inc: { balance: transaction_amount } },
        { session }
      );

      console.log(
        `${UpdateReceiverBalance.matchedCount} document(s) matched the filter, updated ${UpdateReceiverBalance.modifiedCount} documnet(s) for the receiver account`
      );

      //   Step 3: Insert the transfer document
      const transfer = {
        transfer_id: "TR320498432",
        amount: transaction_amount,
        from_account: account_id_sender,
        to_account: account_id_receiver,
      };

      const insertTransfer = await transfers.insertOne(transfer, { session });

      console.log(
        `Successfully inserted ${insertTransfer.insertedId} into the transfers collection`
      );

      // Step 4: Update the transfer_complete field for the sender account
      const updateSenderTransfer = await accounts.updateOne(
        { account_id: account_id_sender },
        { $push: { transfer_complete: transfer.transfer_id } },
        { session }
      );

      console.log(
        `${updateSenderTransfer.matchedCount} document(s) matched in the transfer collection, updated ${updateSenderTransfer.modifiedCount} documnet(s) for the sender account`
      );

      // Step 5: Update the transfer_complete field for the receiver account
      const updateReceiverTransfer = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $push: { transfer_complete: transfer.transfer_id } },
        { session }
      );

      console.log(
        `${updateReceiverTransfer.matchedCount} document(s) matched in the transfer collection, updated ${updateReceiverTransfer.modifiedCount} documnet(s) for the receiver account`
      );
    });

    if (transactionResults) {
      console.log("Transaction completed successfully.");
    } else {
      console.log("Transaction failed.");
    }
  } catch (err) {
    console.error(`Transaction aborted: ${err}`);
    process.exit(1);
  } finally {
    await session.endSession();
    await client.close();
  }
};

main();
