import { Button } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { cn } from "@/lib/utils";
import { HyperText } from "@/components/ui/hyper-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building, Code, Terminal, Users } from "lucide-react";

const SPONSORS = [
  { src: "/devsinc.png", alt: "Devsinc", href: "https://devsinc.com" },
  {
    src: "/cogent-labs.png",
    alt: "Cogent Labs",
    href: "https://cogentlabs.com",
  },
  {
    src: "/xeven-solutions.png",
    alt: "Xeven Solutions",
    href: "https://www.xevensolutions.com",
  },
] as const;

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <main>
        <section className="relative overflow-hidden">
          <div className="relative w-full overflow-hidden bg-background">
            <div className="bg-background absolute inset-0 flex w-full flex-col items-center justify-center overflow-hidden">
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

            <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-5 py-16 md:py-28 text-center">
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
                className="mx-auto mt-6 text-5xl md:text-7xl font-extrabold tracking-tight text-foreground"
              >
                Hackathon: The Internship Edition
              </HyperText>

              <TextAnimate
                animation="fadeIn"
                by="word"
                as="p"
                delay={0.4}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
              >
                Connect with industry leaders through real-world problem sets.
                Build solutions, get mentored, and secure your summer
                internship.
              </TextAnimate>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <RainbowButton size="lg" className="rounded-full px-8">
                  Join as Participant
                </RainbowButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8"
                >
                  Partner with Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sponsers Section */}
      <section
        aria-label="Sponsors"
        className="border-y border-border/60 bg-gray-50 py-10"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-16 gap-y-8 px-4">
          {SPONSORS.map((sponsor) => (
            <Link
              key={sponsor.href}
              href={sponsor.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${sponsor.alt}`}
              className="group flex items-center justify-center"
            >
              <div className="relative h-8 w-28">
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  fill
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 160px"
                  className="cursor-pointer object-contain grayscale brightness-0 transition-all duration-300 group-hover:grayscale-0 group-hover:brightness-100"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="px-5 md:px-20 py-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card>
              <CardHeader>
                <Code className="w-8 h-8" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-medium mb-2">
                  Real Problem Set
                </CardTitle>
                <CardDescription>
                  Forget generic prompts. Solve actual challenges provided by
                  partner companies tailored to their tech stacks.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-medium mb-2">
                  Direct Mentorship
                </CardTitle>
                <CardDescription>
                  Get guided by industry experts who will be reviewing your code
                  and providing feedback throughout the event.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building className="w-8 h-8" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-medium mb-2">
                  Internship Rewards
                </CardTitle>
                <CardDescription>
                  The top performers for each problem statement get direct
                  internship offers from the sponsoring companies.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-black">
        <div className="px-5 md:px-20 py-16 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to start your professional journey?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl">
              Join hundreds of students in the most unique hackathon experience.
              Registration closes in 5 days.
            </p>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Register now
            </Button>
          </div>
        </div>
      </section>

      <footer>
        <div className="px-5 md:px-20 py-16 max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50 flex gap-2 items-center"
              href="/"
            >
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Terminal className="w-5 h-5" />
              </div>
              Hack2Hire
            </Link>

            <div>
              <div className="flex flex-col md:flex-row items-center gap-5">
                <span>Follow us</span>
                <div className="flex items-center gap-2">
                  <Image
                    src={"/instagram.png"}
                    alt="Instagram"
                    width={30}
                    height={30}
                  />
                  <Image
                    src={"/linkedin.png"}
                    alt="LinkedIn"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
