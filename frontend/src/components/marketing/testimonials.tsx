import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl space-y-16 px-6">
        <SectionHeading
          badge="Testimonials"
          title="Trusted by engineering teams who ship fast"
          description="See how teams use Git-Analyzer to reduce risk and move with confidence."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.author}
              className="border-border/60 bg-background/80"
            >
              <CardContent className="flex h-full flex-col gap-6 pt-6">
                <Quote className="size-8 text-violet-500/40" />
                <blockquote className="flex-1 text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
