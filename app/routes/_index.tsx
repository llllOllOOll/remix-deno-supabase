import * as React from "react";
import type { V2_MetaFunction } from "@remix-run/deno";
import { LoaderArgs, json } from "@remix-run/deno";
import { getCats } from "../db.server.ts";
import { useLoaderData } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "RemixJS Brasil Cartoon cats" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const res = await getCats();
  const data = await res.json();

  return json(data);
};

export default function Index() {
  const cats = useLoaderData<typeof loader>();
  return (
    <main>
      <h1>Cartoon Cats</h1>
      <pre>{JSON.stringify(cats, null, 2)}</pre>
    </main>
  );
}
