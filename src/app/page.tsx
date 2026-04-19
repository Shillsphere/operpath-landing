"use client";

import { SlidePager, Slide } from "@/components/ui/SlidePager";
import { SceneBackdrop } from "@/components/ui/SceneBackdrop";
import { SlideShell, BlueprintLight } from "@/components/ui/SlideChrome";
import { HeroChapter } from "@/components/sections/HeroChapter";
import { Process } from "@/components/sections/Hero";
import { Capabilities } from "@/components/sections/Capabilities";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Differentiator } from "@/components/sections/Differentiator";
import { CTA } from "@/components/sections/CTA";
import { Results } from "@/components/sections/Results";

/*
 * Chapter labels are set in the editorial italic small-caps style from the
 * SigmaAi reference — "THINK DEEPER | 01". No chapter says "enter", no
 * number prefix appears beside the slide content itself.
 */
const CHAPTERS = [
  { id: "intro",        num: "01", name: "overture" },
  { id: "process",      num: "02", name: "the pipeline" },
  { id: "insight",      num: "03", name: "the layer" },
  { id: "capabilities", num: "04", name: "what we build" },
  { id: "method",       num: "05", name: "how we work" },
  { id: "why-us",       num: "06", name: "why us" },
  { id: "book",         num: "07", name: "book a call" },
];

export default function Home() {
  return (
    <>
      <SceneBackdrop />

      <SlidePager chapters={CHAPTERS}>
        <Slide id="intro">
          {/* Full-bleed editorial cover — HeroChapter owns its own layout,
              chrome, and overlays (no SlideShell padding, no BlueprintLight). */}
          <HeroChapter />
        </Slide>

        <Slide id="process">
          <BlueprintLight variant="minimal" />
          <SlideShell chapter={CHAPTERS[1]}>
            <div className="mx-auto w-full max-w-[1280px]">
              <Process />
            </div>
          </SlideShell>
        </Slide>

        <Slide id="insight">
          <BlueprintLight variant="arc-right" />
          <SlideShell chapter={CHAPTERS[2]}>
            <div className="mx-auto w-full max-w-5xl">
              <Results />
            </div>
          </SlideShell>
        </Slide>

        <Slide id="capabilities">
          <BlueprintLight variant="minimal" />
          <SlideShell chapter={CHAPTERS[3]}>
            <div className="mx-auto w-full max-w-6xl">
              <Capabilities />
            </div>
          </SlideShell>
        </Slide>

        <Slide id="method">
          <BlueprintLight variant="arc-left" />
          <SlideShell chapter={CHAPTERS[4]}>
            <div className="mx-auto w-full max-w-5xl">
              <HowItWorks />
            </div>
          </SlideShell>
        </Slide>

        <Slide id="why-us">
          <BlueprintLight variant="minimal" />
          <SlideShell chapter={CHAPTERS[5]}>
            <div className="mx-auto w-full max-w-4xl">
              <Differentiator />
            </div>
          </SlideShell>
        </Slide>

        <Slide id="book">
          <BlueprintLight variant="arc-right" />
          <SlideShell chapter={CHAPTERS[6]}>
            <div className="mx-auto w-full max-w-3xl">
              <CTA />
            </div>
          </SlideShell>
        </Slide>
      </SlidePager>
    </>
  );
}
