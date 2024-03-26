import { Fragment } from "react"
import Classes from "./meetUpDetails.module.css"
const MeetUpDetailsPage = (props) => {
  return (
    <section className={Classes.details}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description} </p>
    </section>
  )
}

export default MeetUpDetailsPage
