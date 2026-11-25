import { 
  BookOpen, 
  Dumbbell, 
  Brush, 
  UtensilsCrossed,
  PartyPopper,
  Heart,
  Music,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: BookOpen,
    title: "Tuition & Tutoring",
    description: "Academic support in math, science, languages, and more",
    price: "From ₹200/hr",
    popular: true,
  },
  {
    icon: Dumbbell,
    title: "Personal Training",
    description: "Customized fitness plans and one-on-one coaching",
    price: "From ₹500/session",
    popular: true,
  },
  {
    icon: Brush,
    title: "Creative Services",
    description: "Graphic design, content writing, video editing",
    price: "From ₹300/task",
    popular: false,
  },
  {
    icon: UtensilsCrossed,
    title: "Tiffin Services",
    description: "Homemade meals delivered fresh daily",
    price: "From ₹2000/month",
    popular: true,
  },
  {
    icon: PartyPopper,
    title: "Event Helpers",
    description: "Party setup, coordination, and cleanup assistance",
    price: "From ₹400/event",
    popular: false,
  },
  {
    icon: Heart,
    title: "Hobby Monetization",
    description: "Turn your passion into income - teach what you love",
    price: "Set your price",
    popular: false,
  },
  {
    icon: Music,
    title: "Music Lessons",
    description: "Guitar, piano, vocals, and instrument training",
    price: "From ₹300/hr",
    popular: false,
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Event, portrait, and product photography services",
    price: "From ₹1000/shoot",
    popular: false,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-teal/10 to-purple/10 blur-3xl animate-pulse-scale" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-coral/10 to-pink/10 blur-3xl animate-pulse-scale" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-4">
            Service Marketplace
          </span>
          <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6">
            Skills That <span className="gradient-text-secondary">Pay The Bills</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Monetize your talents and offer services to customers in your area
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full gradient-bg text-xs font-semibold text-primary-foreground">
                  Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-500">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-syne font-bold mb-2 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {service.description}
              </p>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-primary font-semibold">{service.price}</span>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Hover Gradient Border */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have a unique skill? List your service and start earning today!
          </p>
          <Button variant="gradient" size="xl">
            List Your Service
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
