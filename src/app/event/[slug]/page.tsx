import { EventSection } from "@/components/event-section";
import H1 from "@/components/h1";
import { getEvent } from "@/lib/server-utils";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
  };
};

//pre-generate static params
export async function generateStaticParams() {
  return [
    {
      slug: "comedy-extravaganza",
    },
    {
      slug: "dj-practice-session",
    },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const event = await getEvent(slug);

  return {
    title: `Event: ${event.name}`,
  };
}

export default async function EventPage({ params }: Props) {
  const slug = params.slug;

  const event = await getEvent(slug); // execute only once of the both getEvent

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          src={event.imageUrl}
          alt="Event background Image"
          fill
          sizes="(maw-width: 1280) 100vw, 1280px"
          quality={50}
          priority={true}
          className="object-cover blur-3xl z-0"
        />
        <div className="z-1 relative flex flex-col gap-6 lg:gap-16 lg:flex-row">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col ">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-EU", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75 bg-blur">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize mt-5 lg:mt-auto  sm:w-full rounded-md border-white/10 border-2 py-2 state-effects">
              Get tickets
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-[75vh] text-center px-5 py-16">
        <EventSection title="Description" paragraph={event.description} />
        <EventSection title="Location" paragraph={event.location} />
      </div>
    </main>
  );
}
