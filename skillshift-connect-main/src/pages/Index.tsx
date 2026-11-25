import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Users, Briefcase, Star, Sparkles, Wallet, Brain, Calendar, MapPin, GraduationCap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const quickFeatures = [
  { icon: Wallet, title: "Fee Wallet", href: "/features/fee-wallet", color: "from-teal to-teal-light" },
  { icon: Brain, title: "AI Matcher", href: "/features/skill-matcher", color: "from-purple to-purple-light" },
  { icon: Calendar, title: "Scheduling", href: "/features/scheduling", color: "from-coral to-coral-light" },
  { icon: MapPin, title: "Local Map", href: "/features/map", color: "from-pink to-coral" },
  { icon: GraduationCap, title: "Learn & Earn", href: "/features/learn-earn", color: "from-teal to-purple" },
  { icon: Shield, title: "Verification", href: "/features/verification", color: "from-secondary to-pink" },
];

const Index = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      document.documentElement.style.setProperty("--scroll", `${scrolled}px`);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 bg-background border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/40 via-background to-background pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border animate-slide-up">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                <span className="text-sm font-medium">#1 Youth Opportunities Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-syne font-bold leading-[1.05] tracking-tight animate-slide-up stagger-1 text-foreground">
                Earn Your Fees.
                <br />
                <span className="text-primary">Own Your Time.</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg animate-slide-up stagger-2">
                The youth-focused platform where students and candidates can earn, learn, and get hired flexibly based on skills and location.
              </p>

              <div className="flex flex-wrap gap-4 animate-slide-up stagger-3">
                <Link to="/categories">
                  <Button variant="default" size="xl" className="group">
                    Find Opportunities
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="xl" className="group">
                    <Play className="w-5 h-5" />
                    Learn More
                  </Button>
                </Link>
              </div>

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

            <div className="relative lg:h-[600px] animate-scale-in stagger-2">
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg h-full">
                <img src={heroImage} alt="Young professionals collaborating" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

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

      {/* Quick Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Powerful Features for <span className="gradient-text">Your Success</span>
            </h2>
            <p className="text-muted-foreground">Everything you need to earn, save, and grow</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickFeatures.map((feature, index) => (
              <Link
                key={index}
                to={feature.href}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-syne font-bold text-lg group-hover:text-primary transition-colors">{feature.title}</h3>
                  <span className="text-sm text-muted-foreground">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg-hero opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary-foreground/10 floating" />
          <div className="absolute top-32 right-20 w-32 h-32 rounded-full bg-primary-foreground/5 floating-delayed" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-primary-foreground/10 floating-slow" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Start your journey today</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold text-primary-foreground mb-6">
              Ready to Transform Your Future?
            </h2>

            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join thousands of students and youth professionals who are already earning, learning, and building their careers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login/customer">
                <Button size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover:scale-105 transition-all duration-300 px-10 py-7 text-lg font-semibold w-full sm:w-auto">
                  I'm Looking to Hire
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login/candidate">
                <Button size="xl" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300 px-10 py-7 text-lg font-semibold w-full sm:w-auto">
                  I Want to Earn
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
