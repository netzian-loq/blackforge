import { CoverageArea } from "@/components/coverage-area";
import { DepthLadder } from "@/components/depth-ladder";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { OnTheRoad } from "@/components/on-the-road";
import { QuoteSection } from "@/components/quote-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <>
      <a
        href="#quote"
        className="u-spec sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-stripe focus:px-5 focus:py-3 focus:text-asphalt"
      >
        Skip to the quote form
      </a>

      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <DepthLadder />
        <CoverageArea />
        <OnTheRoad />
        <QuoteSection />
        <Faq />
      </main>

      <SiteFooter />
      <StructuredData />
    </>
  );
}
