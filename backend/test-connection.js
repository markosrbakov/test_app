const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://vityanmorello_db_user:T2UWaASx2S5vPoyd@nurture.a1xjotx.mongodb.net/?retryWrites=true&w=majority&appName=nurture";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log("Обид за поврзување со MongoDB...");
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    console.log("УСПЕХ! Успешно се поврза со MongoDB!");
  } catch (err) {
    console.error("ГРЕШКА ПРИ ПОВРЗУВАЊЕ:");
    console.error(err);
  } finally {
    await client.close();
    console.log("Конекцијата е затворена.");
  }
}

run();