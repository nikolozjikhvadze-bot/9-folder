import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // მისამართი იდეალურია, ამას ხელი არ ახლო
  const client = await MongoClient.connect(
    'mongodb://nikolozjikhvadze_db_user:nikolozi1.0.1@ac-gzxyozi-shard-00-00.8euf9cj.mongodb.net:27017,ac-gzxyozi-shard-00-01.8euf9cj.mongodb.net:27017,ac-gzxyozi-shard-00-02.8euf9cj.mongodb.net:27017/?ssl=true&replicaSet=atlas-115k98-shard-0&authSource=admin&appName=Cluster0'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  // 🚀 გასწორდა: ახლა ბაზაში ჩაჯდება ის ობიექტი, რომელსაც API-დან გამოატან
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection) {
  const db = client.db();

  // 🚀 გასწორდა: მოგვაქვს ყველა დოკუმენტი და ვალაგებთ ID-ის მიხედვით კლებადობით (_id: -1)
  const documents = await db
    .collection(collection)
    .find()
    .sort({ _id: -1 }) 
    .toArray();

  return documents;
}