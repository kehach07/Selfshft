import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Briefcase, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 bg-background">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border animate-slide-up">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-sm font-medium">
                #1 Youth Opportunities Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-syne font-bold leading-[1.05] tracking-tight animate-slide-up stagger-1 text-foreground">
              Earn Your Fees.
              <br />
              <span className="text-primary">Own Your Time.</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg animate-slide-up stagger-2">
              The youth-focused platform where students and candidates can earn,
              learn, and get hired flexibly based on skills and location.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up stagger-3">
              <Button variant="default" size="xl" className="group">
                Find Opportunities
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 animate-slide-up stagger-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-muted-foreground">Jobs Posted</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted border border-border flex items-center justify-center">
                  <Star className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-muted-foreground">User Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative lg:h-[600px] animate-scale-in stagger-2">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg">
              <img
                src={heroImage}
                alt="Young professionals collaborating"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

              {/* Card 1 */}
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur border border-border rounded-xl p-3.5 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">New Opportunity</p>
                    <p className="text-xs text-muted-foreground">Chef needed at Café Bloom</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="absolute top-6 right-6 bg-background/95 backdrop-blur border border-border rounded-xl p-3.5 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Star className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Profile Verified</p>
                    <p className="text-xs text-muted-foreground">+15% visibility boost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
