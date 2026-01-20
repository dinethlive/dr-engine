import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to workspace by default
  redirect("/workspace");
}
