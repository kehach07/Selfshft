import { Link } from "react-router-dom";
import { 
  Wallet, 
  Brain, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Shield,
  Target,
  Users,
  Trophy,
  Gift,
  Lock,
  FileText,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mainFeatures = [
  {
    icon: Wallet,
    title: "Fee Wallet & Savings",
    description: "Digital savings account to save for education fees with goal tracking",
    href: "/features/fee-wallet",
    color: "from-teal to-teal-light",
  },
  {
    icon: Brain,
    title: "AI Skill-to-Gig Matcher",
    description: "Smart recommendations based on your interests and skills",
    href: "/features/skill-matcher",
    color: "from-purple to-purple-light",
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Set your availability - hourly, daily, or weekend gigs",
    href: "/features/scheduling",
    color: "from-coral to-coral-light",
  },
  {
    icon: MapPin,
    title: "Local Hiring Map",
    description: "Find opportunities and candidates near your location",
    href: "/features/map",
    color: "from-pink to-coral",
  },
  {
    icon: GraduationCap,
    title: "Learn & Earn",
    description: "Micro-certifications with hiring pipeline integration",
    href: "/features/learn-earn",
    color: "from-teal to-purple",
  },
  {
    icon: Shield,
    title: "Trust & Verification",
    description: "Skill badges, background checks, and video introductions",
    href: "/features/verification",
    color: "from-secondary to-pink",
  },
];

const additionalFeatures = [
  {
    icon: Target,
    title: "Smart Fee Reminders",
    description: "AI alerts about gigs to meet your fee goals",
  },
  {
    icon: Trophy,
    title: "Financial Discipline",
    description: "Earning streaks and savings challenges",
  },
  {
    icon: Gift,
    title: "Referral Program",
    description: "Earn bonuses by referring friends and shops",
  },
  {
    icon: Lock,
    title: "Fee Safe Mode",
    description: "Auto-save earnings and protect fee money",
  },
  {
    icon: FileText,
    title: "Youth Gig Kit",
    description: "Templates, invoices, and rate guides",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "Success stories and peer motivation",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="blob blob-1 opacity-20" />
          <div className="blob blob-2 opacity-20" />
          <div className="blob blob-3 opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-purple/20 text-purple text-sm font-semibold mb-4">
              Platform Features
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Powerful tools designed to help you earn more, save smarter, and achieve your educational goals
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <Link
                key={index}
                to={feature.href}
                className="group relative bg-card rounded-3xl p-8 border border-border hover:border-transparent transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5" />
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  <h3 className="text-2xl font-syne font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  
                  <span className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-syne font-bold mb-4">
              And Much More
            </h2>
            <p className="text-muted-foreground">Additional features to boost your earning potential</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl gradient-bg p-1">
            <div className="bg-card rounded-[calc(1.5rem-4px)] p-12 text-center">
              <h2 className="text-3xl font-syne font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of students already earning and saving for their education with SelfShft
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/login/candidate">
                  <Button variant="gradient" size="xl">
                    Sign Up as Candidate
                  </Button>
                </Link>
                <Link to="/login/customer">
                  <Button variant="outline" size="xl">
                    Sign Up as Customer
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
