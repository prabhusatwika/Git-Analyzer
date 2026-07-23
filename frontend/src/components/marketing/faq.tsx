import { SectionHeading } from "@/components/marketing/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/constants";

export function FAQ() {
  return (
    <section id="faq" className="border-t bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl space-y-16 px-6">
        <SectionHeading
          badge="FAQ"
          title="Frequently asked questions"
          description="Everything you need to know before connecting your first repository."
        />

        <Accordion className="mx-auto max-w-2xl rounded-xl border bg-background/80 px-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-base hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
