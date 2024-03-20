import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";
import { notFound } from "next/navigation";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function getEvents(city: string) {
  // const rep = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`
  // );
  // const events: EventoEvent[] = await rep.json();



  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalize(city)
    },
    orderBy: {
      date: "asc" // Sort by date
    }
  })

  return events;
}


export async function getEvent(slug: string) {
  // const rep = await fetch(
  //   `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  // );
  // const event: EventoEvent = await rep.json();

  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug
    }
  })

  if (!event) {
    return notFound()
  }

  return event;
}