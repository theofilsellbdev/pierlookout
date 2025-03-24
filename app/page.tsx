import { JSX } from "react";
import HomeClient from "./components/HomeClient";
import { generateMetadata } from "./metadata";

// Export metadata generator
export { generateMetadata };

export default function Home(): JSX.Element {
  return (
    <HomeClient />
  );
}