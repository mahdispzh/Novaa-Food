import EventCardSection from "./event-card-section";
import { getLandingHome } from "../../_services/home.server";
import { transformEventToCard } from "./event-card-transformer";

export default async function EventCardMain() {
  const { events } = await getLandingHome();
  const cards = events.map(transformEventToCard);

  return <EventCardSection data={cards} />;
}