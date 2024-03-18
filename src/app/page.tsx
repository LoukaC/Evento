"use client"

import Link from "next/link";

export default function Home() {


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = new FormData(e.currentTarget).get("search") as string;
    if (search) {
      window.location.href = `/events/${search}`;
    }
  };

  return (
    <main className="flex flex-col items-center px-3 pt-36">
      <h1 className="text-3xl lg:text-6xl font-bold tracking-tight">
        Find events around you
      </h1>
      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
        Browse more than{" "}
        <span className="font-bold text-accent italic underline">
          10,000 events
        </span>{" "}
        worldwide
      </p>

      <form onSubmit={handleSubmit} className="w-full sm:w-[580px]">
        <input
          className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
          placeholder="Search events in an city..."
          spellCheck={false}
        />
      </form>

      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>popular:</p>
        <div className="space-x-2">
          <Link href="/events/austin">Austin</Link>
          <Link href="/events/seattle">Seattle</Link>
        </div>
      </section>
    </main>
  );
}
