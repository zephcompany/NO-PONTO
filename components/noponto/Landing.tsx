"use client";
import Header from "./Header";
import { CTAButton, SectionTag, GradientText } from "./ui";
import HeroAssets from "./HeroCarousel";
import EditorialMotion from "./EditorialMotion";
import {
  Pain,
  Positioning,
  Cases,
  Marquee,
  Outcomes,
  Repertoire,
  Food,
  Fit,
  FinalCTA,
} from "./Sections";
import Timeline from "./Timeline";
import Solutions from "./Solutions";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Motion from "./Motion";
import InterfaceMotion from "./InterfaceMotion";
import copy from "@/content/copy.json";
export default function Landing() {
  return (
    <>
      <Header />
      <main id="inicio">
        <section className="hero dark" data-fold="01">
          <div className="container">
            <div className="hero-copy">
              <SectionTag>{copy[1][0]}</SectionTag>
              <h1>
                <GradientText>{copy[1][1]}</GradientText>
                <span className="hero-question">{copy[1][2]}</span>
              </h1>
              <p className="hero-description">{copy[1][3]}</p>
              <p className="hero-manifesto">{copy[1][4]}</p>
              <CTAButton href="#conversa" />
              <p className="microcopy">{copy[1][6]}</p>
            </div>
            <HeroAssets />
          </div>
        </section>
        <Marquee />
        <Pain />
        <Positioning />
        <Cases />
        <Timeline />
        <Marquee />
        <Solutions />
        <Outcomes />
        <Repertoire />
        <Food />
        <Fit />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
      <Motion />
      <InterfaceMotion />
      <EditorialMotion />
    </>
  );
}
