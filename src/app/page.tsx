import { redirect } from "next/navigation";

export default function Home() {
  // The real site is the handcrafted static page served by the rewrite below;
  // this route only acts as a safety fallback.
  redirect("/index.html");
}
