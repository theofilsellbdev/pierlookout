import { Metadata } from "next";
import NotFoundClient from "./components/NotFoundClient";

export const metadata: Metadata = {
  title: "Page Not Found | Pier Lookout",
  description: "The page you're looking for could not be found. Return to Pier Lookout's luxury seafront accommodation in Eastbourne.",
};

export default function NotFound() {
  return <NotFoundClient />;
}