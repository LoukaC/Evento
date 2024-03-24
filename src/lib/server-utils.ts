import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import prisma from "./db";
import { capitalize } from "./utils";

// unstale_cache is a function that caches the result of a function
export const getEvents = unstable_cache(async (city: string, page = 1) => {
  // const rep = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
  // );
  // const events: EventoEvent[] = await rep.json();

  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalize(city),
    },
    orderBy: {
      date: "asc", // Sort by date
    },
    take: 6,
    skip: (page - 1) * 6,
  });

  let totalEvents;

  if (city === "all") {
    totalEvents = await prisma.eventoEvent.count();
  } else {
    totalEvents = await prisma.eventoEvent.count({
      where: {
        city: capitalize(city),
      },
    });
  }

  return { events, totalEvents };
});

export const getEvent = unstable_cache(async (slug: string) => {
  // const rep = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  // );
  // const event: EventoEvent = await rep.json();

  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
});
