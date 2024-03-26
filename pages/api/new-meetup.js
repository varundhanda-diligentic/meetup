import { MongoClient } from "mongodb"

async function Handler(req, res) {
  if (req.method === "POST") {
    const data = req.body
    const client = MongoClient.connect(
      "mongodb+srv://arjun:d79qgjBkh2v3b5gK@cluster0.05donpd.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
    )
    const db = (await client).db()

    const meetupCollection = db.collection("meetups")

    const result = await meetupCollection.insertOne(data)

    res.status(200).json({ message: "inserted" })
  }
}

export default Handler
