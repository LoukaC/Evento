import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import { Suspense } from "react";
import Loading from "./loading";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  const city = params.city;
  return {
    title: city === "all" ? "All Events" : `Events in ${capitalize(city)}`,
  };
}

// schema for the page number, it should be a positive integer...
const pageNumberSchema = z.coerce.number().int().positive().optional();

export default function EventsPage({ params, searchParams }: EventsPageProps) {
  const city = params.city;

  // parse the page number from the query string  and validate it using the schema above
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);
  if (!parsedPage.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[100vh]">
      <H1 className="mb-28">
        {city === "all" ? "All Events" : `Events in ${capitalize(city)} `}
      </H1>
      <Suspense key={city + parsedPage.data} fallback={<Loading />}>
        {/* key is used to force re-render when city or page changes and see the loadinf indicator when pages change*/}
        <EventsList city={city} page={parsedPage.data} />
        {/* page is a string, convert to number*/}
      </Suspense>
    </main>
  );
}
