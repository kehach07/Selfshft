import { UserPlus, Search, Handshake, BadgeCheck, Wallet, Target, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const candidateSteps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and build your profile with skills, experience, and availability. Add verification for more visibility.",
    color: "from-teal to-teal-light",
  },
  {
    icon: Search,
    step: "02",
    title: "Browse or Get Discovered",
    description: "Search for opportunities matching your skills, or let customers find you based on location and expertise.",
    color: "from-coral to-coral-light",
  },
  {
    icon: Handshake,
    step: "03",
    title: "Connect & Agree",
    description: "Message directly, negotiate terms, and agree on schedules. All communication stays secure on the platform.",
    color: "from-purple to-purple-light",
  },
  {
    icon: BadgeCheck,
    step: "04",
    title: "Earn & Save",
    description: "Complete gigs, receive payments to your Fee Wallet, and save towards your education goals.",
    color: "from-pink to-coral",
  },
];

const customerSteps = [
  {
    icon: Target,
    step: "01",
    title: "Post Your Requirement",
    description: "Describe what you need - whether it's a tutor, chef, trainer, or any service provider.",
    color: "from-teal to-purple",
  },
  {
    icon: Search,
    step: "02",
    title: "Browse Verified Candidates",
    description: "Filter by skills, location, ratings, and availability. Watch video introductions.",
    color: "from-coral to-pink",
  },
  {
    icon: Calendar,
    step: "03",
    title: "Schedule & Book",
    description: "Choose hourly, daily, or weekly bookings. Set your preferred timing and location.",
    color: "from-purple to-teal",
  },
  {
    icon: Shield,
    step: "04",
    title: "Secure Payment",
    description: "Pay securely through the platform. Rate and review after service completion.",
    color: "from-pink to-secondary",
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="blob blob-1 opacity-20" />
          <div className="blob blob-2 opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
              Simple Process
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              How <span className="gradient-text">SelfShft</span> Works
            </h1>
            <p className="text-lg text-muted-foreground">
              Get started in minutes and begin your journey to financial freedom
            </p>
          </div>
        </div>
      </section>

      {/* For Candidates */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              For <span className="gradient-text">Candidates</span>
            </h2>
            <p className="text-muted-foreground">Students & youth professionals looking to earn</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal via-purple to-coral transform -translate-y-1/2 rounded-full opacity-20" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {candidateSteps.map((step, index) => (
                <div key={index} className="relative group">
                  <div className="relative bg-card border border-border rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary/30">
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-syne font-bold text-primary-foreground text-lg shadow-lg">
                      {step.step}
                    </div>

                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <step.icon className="w-8 h-8 text-primary-foreground" />
                    </div>

                    <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/login/candidate">
              <Button variant="gradient" size="xl">
                Start Earning Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Customers */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              For <span className="gradient-text-secondary">Customers</span>
            </h2>
            <p className="text-muted-foreground">Businesses & individuals looking to hire</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customerSteps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="relative bg-card border border-border rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-secondary/30">
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full gradient-bg-secondary flex items-center justify-center font-syne font-bold text-secondary-foreground text-lg shadow-lg">
                    {step.step}
                  </div>

                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-secondary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/login/customer">
              <Button variant="gradient-secondary" size="xl">
                Start Hiring Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-2xl glass">
              <p className="text-5xl font-syne font-bold gradient-text mb-2">5 min</p>
              <p className="text-muted-foreground">Average signup time</p>
            </div>
            <div className="p-8 rounded-2xl glass">
              <p className="text-5xl font-syne font-bold gradient-text-secondary mb-2">24 hrs</p>
              <p className="text-muted-foreground">To first opportunity</p>
            </div>
            <div className="p-8 rounded-2xl glass">
              <p className="text-5xl font-syne font-bold gradient-text mb-2">₹15K</p>
              <p className="text-muted-foreground">Avg. monthly earnings</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;
