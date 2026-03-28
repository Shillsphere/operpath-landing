import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Capabilities } from "@/components/sections/Capabilities";
import { Results } from "@/components/sections/Results";
import { Differentiator } from "@/components/sections/Differentiator";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Capabilities />
        <Results />
        <Differentiator />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
