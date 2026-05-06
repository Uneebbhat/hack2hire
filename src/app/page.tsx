import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/ui/hyper-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="relative w-full overflow-hidden bg-background">
          <div className="bg-ba ckground absolute inset-0 flex w-full flex-col items-center justify-center overflow-hidden">
            <InteractiveGridPattern
              className={cn(
                "mask-[radial-gradient(400px_circle_at_center,white,transparent)]",
              )}
              width={20}
              height={20}
              squares={[80, 80]}
              squaresClassName="hover:fill-blue-500"
            />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 py-16 md:py-28 text-center">
            <div className="z-10 flex items-center justify-center">
              <div
                className={cn(
                  "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                )}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                  <span>✨ UMT ACM Presents</span>
                </AnimatedShinyText>
              </div>
            </div>

            <HyperText
              as="h1"
              startOnView
              duration={900}
              className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold tracking-tight text-foreground md:text-7xl"
            >
              Hackathon: The Internship Edition
            </HyperText>

            <TextAnimate
              animation="fadeIn"
              by="word"
              as="p"
              delay={0.4}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Connect with industry leaders through real-world problem sets.
              Build solutions, get mentored, and secure your summer internship.
            </TextAnimate>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <RainbowButton size="lg" className="rounded-full px-8">
                Join as Participant
              </RainbowButton>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                Partner with Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
