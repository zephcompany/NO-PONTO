"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import copy from "@/content/copy.json";
import { SectionTag, RichHeading } from "./ui";
export default function FAQ() {
  const [open, setOpen] = useState("");
  return (
    <section className="faq section light" id="faq" data-fold="12">
      <div className="container faq-layout">
        <div>
          <SectionTag>FAQ</SectionTag>
          <h2>
            <RichHeading text={copy[12][0]} accent="Frequentes" />
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          value={open}
          onValueChange={setOpen}
          className="faq-list"
        >
          {Array.from({ length: 7 }, (_, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>
                <span className="faq-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="faq-question">{copy[12][i * 2 + 1]}</span>
                <i className="faq-toggle" aria-hidden="true">
                  <span />
                  <span />
                </i>
              </AccordionTrigger>
              <AccordionContent
                forceMount
                aria-hidden={open !== `faq-${i}`}
                inert={open !== `faq-${i}`}
              >
                <p>{copy[12][i * 2 + 2]}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
