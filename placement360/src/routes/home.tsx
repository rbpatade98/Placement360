import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";

import { Container } from "@/components/container";
import { MarqueImg } from "@/components/marquee-img";

const Home = () => {
  // Safe Marquee component
  const MarqueeComponent = (Marquee as any).default || Marquee;

  return (
    <div className="flex-col w-full pb-24">
      <Container>
        <div className="my-8">
          <h2 className="text-3xl text-center md:text-left md:text-6xl">
            <span className=" text-outline font-extrabold md:text-8xl">
              AI Superpower
            </span>
            <span className="text-gray-500 font-extrabold">
              - A better way to
            </span>
            <br />
            improve your interview chances and skills
          </h2>

          <p className="mt-4 text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out in today's competitive job market.
          </p>

          <div className="mt-8">
            <SignedOut>
              <div className="flex gap-4">
                <Link to="/signin">
                  <Button size="lg" className="font-semibold shadow-lg shadow-primary/20">Get Started</Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="font-semibold">Create Account</Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="font-semibold shadow-lg shadow-primary/20">Go to Dashboard</Button>
                </Link>
                <Link to="/generate">
                  <Button size="lg" variant="outline" className="font-semibold flex items-center gap-2">
                    Take an Interview <Sparkles className="size-4 text-primary" />
                  </Button>
                </Link>
              </div>
            </SignedIn>
          </div>
        </div>

        <div className="flex w-full items-center justify-evenly md:px-12 md:py-16 md:items-center md:justify-end gap-12 py-12">
          <p className="text-3xl font-semibold text-gray-900 text-center">
            250k+
            <span className="block text-xl text-muted-foreground font-normal">
              Offers Received
            </span>
          </p>
          <p className="text-3xl font-semibold text-gray-900 text-center">
            1.2M+
            <span className="block text-xl text-muted-foreground font-normal">
              Interviews Aced
            </span>
          </p>
        </div>

        {/* hero image section */}
        <div className="w-full mt-4 rounded-xl bg-gray-100 h-[420px] shadow-2xl overflow-hidden relative border border-border group">
          <img
            src="/assets/img/hero.jpg"
            alt="Hero Image"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-white/40 backdrop-blur-md border border-white/20 text-sm font-medium shadow-sm">
            Interviews Copilot&copy;
          </div>

          <div className="hidden md:block absolute w-80 bottom-4 right-4 px-4 py-2 rounded-md bg-white/80 backdrop-blur-md border border-white/30 shadow-xl transition-all hover:bg-white/90">
            <h2 className="text-neutral-800 font-semibold flex items-center gap-2">
               AI Interviewer <Sparkles className="size-4 text-primary" />
            </h2>
            <p className="text-sm text-neutral-600">
              Personalized mock interviews with real-time feedback to help you land your dream job.
            </p>

            <Link to="/generate">
              <Button className="mt-3 w-full">
                Generate Interview <Sparkles className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* marquee section */}
      <div className="w-full my-12 border-y border-border py-12 bg-muted/20">
        <MarqueeComponent pauseOnHover gradient gradientColor="white" gradientWidth={100} speed={40}>
          <MarqueImg img="/assets/img/logo/firebase.png" />
          <MarqueImg img="/assets/img/logo/meet.png" />
          <MarqueImg img="/assets/img/logo/zoom.png" />
          <MarqueImg img="/assets/img/logo/microsoft.png" />
          <MarqueImg img="/assets/img/logo/tailwindcss.png" />
          <MarqueImg img="/assets/img/logo/firebase.png" />
          <MarqueImg img="/assets/img/logo/meet.png" />
          <MarqueImg img="/assets/img/logo/microsoft.png" />
        </MarqueeComponent>
      </div>

      <Container className="py-12 space-y-12">
        <h2 className="tracking-tight text-3xl text-gray-900 font-bold text-center md:text-left max-w-2xl leading-tight">
          Unleash your potential with personalized AI insights and targeted interview practice.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted">
              <img
                src="/assets/img/office.jpg"
                alt="Office"
                className="w-full max-h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-8 flex flex-col items-center justify-center text-center">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform the way you prepare, gain confidence, and boost your
              chances of landing your dream job. Let AI be your edge in
              today's competitive job market.
            </p>

            <Link to="/generate" className="w-full max-w-xs">
              <Button size="lg" className="w-full font-bold h-16 text-xl shadow-xl shadow-primary/20">
                Generate Mock <Sparkles className="ml-2 size-6" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;