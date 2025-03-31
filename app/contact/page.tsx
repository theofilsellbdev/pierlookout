import { Metadata } from "next";
import ContactPageClient from "./components/ContactClient";

// Generate metadata for the Contact page
export const metadata: Metadata = {
  title: "Contact Us | Pier Lookout",
  description: "Get in touch with us about booking Pier Lookout, our luxury seafront accommodation in Eastbourne with breathtaking views.",
  keywords: ["contact", "book Eastbourne accommodation", "Eastbourne seafront flat"],
};

export default function ContactPage() {
  return <ContactPageClient />;
}