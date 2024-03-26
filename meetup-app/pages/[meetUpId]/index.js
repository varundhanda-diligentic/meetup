import MeetUpDetailsPage from "@/components/meetups/meetupDetails"
import { MongoClient, ObjectId } from "mongodb"
import Head from "next/head"
import React from "react"

const MeetUpDetails = (props) => {
  return (
    <>
      <Head>
        <title>Detailed Description Of {props.meetup.title}</title>
        <meta name="description" content={props.meetup.description} />
      </Head>
      <MeetUpDetailsPage
        image={props.meetup.image}
        title={props.meetup.title}
        address={props.meetup.address}
        description={props.meetup.description}
      />
    </>
  )
}

export async function getStaticPaths() {
  const client = MongoClient.connect(
    "mongodb+srv://arjun:d79qgjBkh2v3b5gK@cluster0.05donpd.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  )
  const db = (await client).db()

  const meetupCollection = db.collection("meetups")

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray()
  return {
    paths: meetups.map((meetup) => ({
      params: {
        meetUpId: meetup._id.toString(),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetUpId

  const client = MongoClient.connect(
    "mongodb+srv://arjun:d79qgjBkh2v3b5gK@cluster0.05donpd.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  )
  const db = (await client).db()

  const meetupCollection = db.collection("meetups")

  const meetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId) })
  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        description: meetup.description,
        address: meetup.address,
      },
    },
  }
}
export default MeetUpDetails
