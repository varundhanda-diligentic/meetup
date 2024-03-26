import Head from "next/head"
import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb"
import { Fragment } from "react"

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const client = MongoClient.connect(
    "mongodb+srv://arjun:d79qgjBkh2v3b5gK@cluster0.05donpd.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  )
  const db = (await client).db()

  const meetupCollection = db.collection("meetups")

  const meetups = await meetupCollection.find().toArray()

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  }
}
export default HomePage
