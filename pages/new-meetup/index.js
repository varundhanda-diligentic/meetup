import NewMeetupForm from "@/components/meetups/NewMeetupForm"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

function NewMeetUp() {
  const route = useRouter()
  const onAddMeetupHandler = async (meetupdata) => {
    const res = await fetch("/api/new-meetup/", {
      method: "POST",
      body: JSON.stringify(meetupdata),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
    route.push("/")
  }
  return (
    <div>
      <Head>
        <title>Add A New Meetup</title>
      </Head>
      <meta
        name="description"
        content="Add Your Own Meetups And Create Amazing Networking Opportunities"
      />
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </div>
  )
}

export default NewMeetUp
