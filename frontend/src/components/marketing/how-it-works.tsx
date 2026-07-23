import { SectionHeading } from "@/components/marketing/section-heading";
import { steps } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-6xl space-y-16 px-6">
        <SectionHeading
          badge="How It Works"
          title="From repo to insights in three steps"
          description="No complex setup. Connect your repository and let Git-Analyzer do the heavy lifting."
        />

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex flex-col gap-4">
              {index < steps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-border md:block" />
              )}
              <div className="flex size-16 items-center justify-center rounded-2xl border bg-gradient-to-br from-violet-500/10 to-cyan-500/10 font-mono text-xl font-semibold text-violet-600 dark:text-violet-400">
                {step.step}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
