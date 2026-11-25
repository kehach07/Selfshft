import { UserPlus, Search, Handshake, BadgeCheck } from "lucide-react";

const steps = [
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
    title: "Earn & Grow",
    description: "Complete gigs, receive payments, and build your reputation with reviews. Grow your earnings over time.",
    color: "from-pink to-coral",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6">
            How <span className="gradient-text">SelfShft</span> Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes and begin earning with your skills
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal via-purple to-coral transform -translate-y-1/2 rounded-full opacity-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card */}
                <div className="relative bg-card border border-border rounded-3xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary/30">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-syne font-bold text-primary-foreground text-lg shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <step.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-syne font-bold mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Arrow for connection (except last) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl glass">
            <p className="text-4xl font-syne font-bold gradient-text mb-2">5 min</p>
            <p className="text-muted-foreground">Average signup time</p>
          </div>
          <div className="p-6 rounded-2xl glass">
            <p className="text-4xl font-syne font-bold gradient-text-secondary mb-2">24 hrs</p>
            <p className="text-muted-foreground">To first opportunity</p>
          </div>
          <div className="p-6 rounded-2xl glass">
            <p className="text-4xl font-syne font-bold gradient-text mb-2">₹15K</p>
            <p className="text-muted-foreground">Avg. monthly earnings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
