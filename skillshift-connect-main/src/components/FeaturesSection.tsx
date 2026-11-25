import { 
  Shield, 
  Calendar, 
  Wallet, 
  MapPin, 
  Sparkles, 
  Users, 
  Award, 
  Video,
  BookOpen
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Skill Verification Badges",
    description: "Build trust with verified credentials and skill assessments",
    color: "bg-teal",
  },
  {
    icon: Calendar,
    title: "Gig Scheduling Calendar",
    description: "Manage your availability and bookings in one place",
    color: "bg-coral",
  },
  {
    icon: Wallet,
    title: "Wallet & Payouts",
    description: "Track earnings and receive instant payments",
    color: "bg-purple",
  },
  {
    icon: MapPin,
    title: "Location-Based Discovery",
    description: "Find opportunities and talent near you with live maps",
    color: "bg-pink",
  },
  {
    icon: Sparkles,
    title: "AI Resume Builder",
    description: "Create professional profiles with AI assistance",
    color: "bg-teal",
  },
  {
    icon: Users,
    title: "Community Learning Hub",
    description: "Learn from peers and grow together",
    color: "bg-secondary",
  },
  {
    icon: Award,
    title: "Reviews & Ratings",
    description: "Build credibility with authentic feedback",
    color: "bg-accent",
  },
  {
    icon: Video,
    title: "Video Intro Profiles",
    description: "Stand out with personalized video introductions",
    color: "bg-coral",
  },
  {
    icon: BookOpen,
    title: "Internship Section",
    description: "Find internships and kickstart your career",
    color: "bg-purple",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-purple/20 text-purple text-sm font-semibold mb-4">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6">
            Everything You Need to <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful tools designed to help you earn more and manage your time efficiently
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-transparent transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="text-lg font-syne font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>

              {/* Corner Decoration */}
              <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="mt-16 rounded-3xl gradient-bg p-1">
          <div className="bg-card rounded-[calc(1.5rem-4px)] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-syne font-bold mb-4">
                  Join <span className="gradient-text">50,000+</span> Youth Earners
                </h3>
                <p className="text-muted-foreground mb-6">
                  Students across India are already using SelfShft to fund their education, 
                  build skills, and achieve financial independence.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-card bg-gradient-to-br from-teal to-purple"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">+2,500</span> joined this week
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted rounded-2xl p-4 text-center">
                  <p className="text-3xl font-syne font-bold gradient-text">₹5Cr+</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
                <div className="bg-muted rounded-2xl p-4 text-center">
                  <p className="text-3xl font-syne font-bold gradient-text-secondary">25K+</p>
                  <p className="text-sm text-muted-foreground">Gigs Completed</p>
                </div>
                <div className="bg-muted rounded-2xl p-4 text-center">
                  <p className="text-3xl font-syne font-bold gradient-text">500+</p>
                  <p className="text-sm text-muted-foreground">Cities Covered</p>
                </div>
                <div className="bg-muted rounded-2xl p-4 text-center">
                  <p className="text-3xl font-syne font-bold gradient-text-secondary">4.9★</p>
                  <p className="text-sm text-muted-foreground">User Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
