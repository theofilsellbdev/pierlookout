import { Metadata } from "next";
import GalleryPageClient from "./components/GalleryPageClient";

// Generate metadata for the Gallery page
export const metadata: Metadata = {
  title: "Photo Gallery | Pier Lookout",
  description: "Browse our collection of images showcasing Pier Lookout, our luxury seafront accommodation in Eastbourne with breathtaking pier and seafront views.",
  keywords: ["Eastbourne accommodation photos", "seafront flat gallery", "Eastbourne pier views"],
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}