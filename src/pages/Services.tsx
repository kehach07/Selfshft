import { useState } from "react";
import { 
  BookOpen, 
  Dumbbell, 
  Brush, 
  UtensilsCrossed,
  PartyPopper,
  Heart,
  Music,
  Camera,
  Star,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: BookOpen,
    title: "Tuition & Tutoring",
    description: "Academic support in math, science, languages, and more",
    price: "From ₹200/hr",
    popular: true,
    providers: 1250,
    rating: 4.8,
  },
  {
    icon: Dumbbell,
    title: "Personal Training",
    description: "Customized fitness plans and one-on-one coaching",
    price: "From ₹500/session",
    popular: true,
    providers: 430,
    rating: 4.9,
  },
  {
    icon: Brush,
    title: "Creative Services",
    description: "Graphic design, content writing, video editing",
    price: "From ₹300/task",
    popular: false,
    providers: 890,
    rating: 4.7,
  },
  {
    icon: UtensilsCrossed,
    title: "Tiffin Services",
    description: "Homemade meals delivered fresh daily",
    price: "From ₹2000/month",
    popular: true,
    providers: 670,
    rating: 4.6,
  },
  {
    icon: PartyPopper,
    title: "Event Helpers",
    description: "Party setup, coordination, and cleanup assistance",
    price: "From ₹400/event",
    popular: false,
    providers: 340,
    rating: 4.5,
  },
  {
    icon: Heart,
    title: "Hobby Monetization",
    description: "Turn your passion into income - teach what you love",
    price: "Set your price",
    popular: false,
    providers: 520,
    rating: 4.8,
  },
  {
    icon: Music,
    title: "Music Lessons",
    description: "Guitar, piano, vocals, and instrument training",
    price: "From ₹300/hr",
    popular: false,
    providers: 280,
    rating: 4.9,
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Event, portrait, and product photography services",
    price: "From ₹1000/shoot",
    popular: false,
    providers: 410,
    rating: 4.7,
  },
];

const Services = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredServices = activeFilter === "popular" 
    ? services.filter(s => s.popular) 
    : services;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="blob blob-1 opacity-20" />
          <div className="blob blob-3 opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-4">
              Service Marketplace
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-syne font-bold mb-6">
              Skills That <span className="gradient-text-secondary">Pay The Bills</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse services from verified providers or list your own skills to start earning
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <Button
              variant={activeFilter === "all" ? "gradient" : "outline"}
              onClick={() => setActiveFilter("all")}
            >
              All Services
            </Button>
            <Button
              variant={activeFilter === "popular" ? "gradient" : "outline"}
              onClick={() => setActiveFilter("popular")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Popular
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 px-3 py-1 rounded-full gradient-bg text-xs font-semibold text-primary-foreground">
                    Popular
                  </div>
                )}

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-accent transition-all duration-500">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                </div>

                <h3 className="text-lg font-syne font-bold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {service.providers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow text-yellow" />
                    {service.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-primary font-semibold">{service.price}</span>
                  <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                    Explore
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-syne font-bold mb-4">
              Have a Skill to Offer?
            </h2>
            <p className="text-muted-foreground mb-8">
              List your services and start earning today. Set your own prices and availability.
            </p>
            <Button variant="gradient" size="xl">
              List Your Service
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
