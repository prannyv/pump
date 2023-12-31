const {MongoClient} = require('mongodb');
const { apiKey } = require('../config');


async function addItem(client, newItem){
    const result = await client.db("pump").collection("ingredients").insertOne(newItem);
    console.log(`added new item with the following id: ${result.insertedId}`);
}

async function deleteItem(client, itemName){
    const result = await client.db("pump").collection("ingredients").deleteOne({ingredient:itemName}); 
    console.log(`${result.deletedCount} was deleted`);
}

async function updateItem(client, itemName, updatedQuantity){
    const result = await client.db("pump").collection("ingredients").updateOne({ingredient:itemName}, { $set: { quantity: updatedQuantity } });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

async function main() {
	const uri = apiKey;

    const client = new MongoClient(uri);
    
    try{
        await client.connect();

    } catch (e){
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);
