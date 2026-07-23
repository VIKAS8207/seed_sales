import { redirect } from "next/navigation";

export default function Home() {
  // Automatically send anyone who visits localhost:3000 to the login page
  redirect("/login");
}